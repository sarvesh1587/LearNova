import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/react";
import humanizeDuration from "humanize-duration";
import axios from "axios";

export const AppContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

// Backend field names -> the shape every existing component was built
// against (courseTitle, _id, coursePrice, etc.). Mapping here means the
// rest of the app doesn't need to change field names everywhere.
const mapCourse = (course) => ({
  _id: String(course.id),
  courseTitle: course.title,
  courseDescription: course.description || "",
  courseThumbnail: course.thumbnail,
  coursePrice: course.price,
  discount: course.discount,
  educator: course.educatorName,
  courseContent: course.courseContent || [],
  courseRatings: course.courseRatings || [],
  enrolledStudents: course.enrolledStudents || [],
  createdAt: course.createdAt,
});

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setisEducator] = useState(false);
  const [enrolledCourses, setenrolledCourses] = useState([]);
  // courseId (string) -> { enrollmentId, completedLectures: [] }
  const [enrollmentMeta, setenrollmentMeta] = useState({});

  // FETCH ALL COURSES
  const fetchAllCourses = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/courses`);
      setAllCourses(data.map(mapCourse));
    } catch (err) {
      console.error("Failed to fetch courses:", err);
      setAllCourses([]);
    }
  };

  // FUNCTION TO CALCULATE AVERAGE RATING OF THE COURSE
  const calculateRating = (course) => {
    if (!course.courseRatings || course.courseRatings.length === 0) return 0;
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return totalRating / course.courseRatings.length;
  };

  // FUNCTION TO CALCULATE COURSE CHAPTER TIME
  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // FUNCTION TO CALCULATE COURSE DURATION
  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.map((chapter) =>
      chapter.chapterContent.map(
        (lecture) => (time += lecture.lectureDuration),
      ),
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // FUNCTION TO CALCULATE NUMBER OF LECTURES IN THE COURSE
  const calculateNoOfLectures = (course) => {
    let totalLectures = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  };

  // FETCH THIS USER'S ENROLLMENTS + PROGRESS, REBUILD enrolledCourses / enrollmentMeta
  const fetchUserEnrolledCourses = async () => {
    if (!user) {
      setenrolledCourses([]);
      setenrollmentMeta({});
      return;
    }
    try {
      const { data } = await axios.get(`${backendUrl}/api/enrollments/${user.id}`);
      // data: [{ id, courseId, completedLectures, enrolledAt }]
      const meta = {};
      data.forEach((e) => {
        meta[String(e.courseId)] = {
          enrollmentId: e.id,
          completedLectures: e.completedLectures || [],
        };
      });
      setenrollmentMeta(meta);
      setenrolledCourses(allCourses.filter((c) => meta[c._id]));
    } catch (err) {
      console.error("Failed to fetch enrollments:", err);
      setenrolledCourses([]);
      setenrollmentMeta({});
    }
  };

  // ENROLL THE CURRENT USER IN A COURSE
  const enrollInCourse = async (courseId) => {
    if (!user) return false;
    try {
      await axios.post(`${backendUrl}/api/enrollments`, {
        userId: user.id,
        courseId: Number(courseId),
      });
      await fetchUserEnrolledCourses();
      return true;
    } catch (err) {
      console.error("Failed to enroll:", err);
      return false;
    }
  };

  // UPDATE COMPLETED LECTURES FOR A COURSE THE USER IS ENROLLED IN
  const updateLectureProgress = async (courseId, completedLectures) => {
    const meta = enrollmentMeta[String(courseId)];
    if (!meta) return false;
    try {
      await axios.put(
        `${backendUrl}/api/enrollments/${meta.enrollmentId}/progress`,
        { completedLectures },
      );
      await fetchUserEnrolledCourses();
      return true;
    } catch (err) {
      console.error("Failed to update progress:", err);
      return false;
    }
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    if (allCourses.length > 0) {
      fetchUserEnrolledCourses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCourses, isLoaded, user]);

  const value = {
    calculateChapterTime,
    calculateNoOfLectures,
    calculateCourseDuration,
    currency,
    allCourses,
    setAllCourses,
    fetchAllCourses,
    navigate,
    calculateRating,
    isEducator,
    setisEducator,
    enrolledCourses,
    setenrolledCourses,
    fetchUserEnrolledCourses,
    enrollmentMeta,
    enrollInCourse,
    updateLectureProgress,
    backendUrl,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
