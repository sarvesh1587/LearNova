import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useClerk, useUser } from "@clerk/react";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets";
import { getYoutubeId } from "../../utils/youtube";
import humanizeDuration from "humanize-duration";
import Footer from "../../components/student/Footer";
import YouTube from "react-youtube";

const Coursedetails = () => {
  const { id } = useParams();
  const [coursedata, setcoursedata] = useState(null);
  const [openSections, setopenSections] = useState({});
  const [isalreadyenrolled, setisalreadyenrolled] = useState(false);
  const [isenrolling, setisenrolling] = useState(false);
  const [playerdata, setplayerdata] = useState(null);

  const { user } = useUser();
  const { openSignIn } = useClerk();

  const {
    allCourses,
    enrolledCourses,
    enrollInCourse,
    calculateRating,
    calculateNoOfLectures,
    calculateCourseDuration,
    calculateChapterTime,
    currency,
  } = useContext(AppContext);

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const findcourse = allCourses.find((course) => course._id === id);
      setcoursedata(findcourse);
    }
  }, [allCourses, id]);

  useEffect(() => {
    setisalreadyenrolled(enrolledCourses.some((course) => course._id === id));
  }, [enrolledCourses, id]);

  const toggleSection = (index) => {
    setopenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleEnroll = async () => {
    if (isalreadyenrolled || isenrolling) return;

    if (!user) {
      openSignIn();
      return;
    }

    setisenrolling(true);
    const success = await enrollInCourse(id);
    setisenrolling(false);

    if (success) {
      setisalreadyenrolled(true);
    }
  };

  return coursedata ? (
    <>
      <div className="relative isolate">
        {/* Background gradient strip */}
        <div className="absolute top-0 left-0 w-full h-section-height -z-10 pointer-events-none bg-gradient-to-b from-cyan-100/70 to-transparent"></div>

        <div className="flex md:flex-row flex-col-reverse gap-10 items-start justify-between md:px-36 px-8 md:pt-30 pt-20 pb-16 text-left">
          {/* ============ LEFT COLUMN ============ */}
          <div className="max-w-xl z-10 text-gray-500 flex-1">
            <h1 className="md:text-course-details-heading-large text-course-details-heading-small font-semibold text-gray-800">
              {coursedata.courseTitle}
            </h1>

            <p
              className="pt-4 md:text-base text-sm leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: coursedata.courseDescription.slice(0, 200),
              }}
            ></p>

            {/* REVIEW AND RATING */}
            <div className="flex items-center flex-wrap gap-2 pt-3 pb-1 text-sm">
              <p className="font-semibold text-amber-500">
                {calculateRating(coursedata).toFixed(1)}
              </p>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <img
                    key={i}
                    src={
                      i < Math.floor(calculateRating(coursedata))
                        ? assets.star
                        : assets.star_blank
                    }
                    alt=""
                    className="w-3.5 h-3.5"
                  />
                ))}
              </div>
              <p className="text-gray-500">
                {coursedata.courseRatings.length}{" "}
                {coursedata.courseRatings.length > 1 ? "ratings" : "rating"}
              </p>
              <p className="text-gray-800 font-medium">
                {coursedata.enrolledStudents.length}{" "}
                {coursedata.enrolledStudents.length > 1
                  ? "students"
                  : "student"}
              </p>
            </div>

            <p className="text-sm pt-1">
              Course by{" "}
              <span className="text-blue-600 font-medium hover:underline cursor-pointer">
                {coursedata.educator || "Unknown Educator"}
              </span>
            </p>

            {/* COURSE STRUCTURE */}
            <div className="pt-8 text-gray-800">
              <h2 className="text-lg md:text-xl font-semibold">
                Course Structure
              </h2>
              <div className="pt-5 space-y-2">
                {coursedata.courseContent.map((chapter, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg bg-white transition-colors duration-200 ${
                      openSections[index]
                        ? "border-blue-300 shadow-sm"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div
                      className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                      onClick={() => toggleSection(index)}
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={assets.down_arrow_icon}
                          alt="arrow-icon"
                          className={`transform transition-transform duration-300 ${
                            openSections[index] ? "rotate-180" : ""
                          }`}
                        />
                        <p className="font-medium md:text-base text-sm">
                          {chapter.chapterTitle}
                        </p>
                      </div>
                      <p className="text-xs md:text-sm text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full">
                        {chapter.chapterContent.length} lectures ·{" "}
                        {calculateChapterTime(chapter)}
                      </p>
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openSections[index] ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      <ul className="md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-200 bg-gray-50/50">
                        {chapter.chapterContent.map((lecture, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 py-2 border-b border-gray-100 last:border-0"
                          >
                            <img
                              src={assets.play_icon}
                              alt="play"
                              className="w-3.5 h-3.5 mt-1"
                            />
                            <div className="flex items-center justify-between w-full text-gray-700 text-xs md:text-sm">
                              <p>{lecture.lectureTitle}</p>
                              <div className="flex gap-3 items-center">
                                {lecture.isPreviewFree && (
                                  <p
                                    onClick={() =>
                                      setplayerdata({
                                        videoId: getYoutubeId(
                                          lecture.lectureUrl,
                                        ),
                                      })
                                    }
                                    className="text-blue-500 font-medium cursor-pointer hover:underline"
                                  >
                                    Preview
                                  </p>
                                )}
                                <p className="text-gray-500">
                                  {humanizeDuration(
                                    lecture.lectureDuration * 60 * 1000,
                                    { units: ["h", "m"] },
                                  )}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ============ RIGHT COLUMN ============ */}
          <div className="w-full md:w-80 lg:w-96 md:max-w-course-card shrink-0 self-start md:sticky md:top-24 z-10">
            {playerdata ? (
              // ---------- VIDEO PLAYER ----------
              <div className="shadow-custom-card rounded-xl overflow-hidden bg-white border border-gray-100">
                <YouTube
                  videoId={playerdata.videoId}
                  opts={{
                    playerVars: {
                      autoplay: 1,
                    },
                  }}
                  iframeClassName="w-full aspect-video"
                />
                <div className="p-4 flex items-center justify-between border-t border-gray-100">
                  <p className="text-sm text-gray-600 font-medium">Preview</p>
                  <button
                    onClick={() => setplayerdata(null)}
                    className="text-sm text-blue-600 font-medium hover:underline"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              // ---------- COURSE CARD ----------
              <div className="shadow-custom-card rounded-xl overflow-hidden bg-white border border-gray-100">
                <img
                  src={coursedata.courseThumbnail}
                  alt={coursedata.courseTitle}
                  className="w-full h-48 object-cover"
                />

                <div className="p-5">
                  {/* TIME LEFT */}
                  <div className="flex items-center gap-2">
                    <p className="text-red-500 text-sm">
                      <span className="font-medium">5 days</span> left at this
                      price!
                    </p>
                  </div>

                  {/* PRICE */}
                  <div className="flex gap-2 items-baseline pt-3 flex-wrap">
                    <p className="text-gray-900 md:text-3xl text-2xl font-bold">
                      {currency}
                      {(
                        coursedata.coursePrice -
                        (coursedata.discount * coursedata.coursePrice) / 100
                      ).toFixed(2)}
                    </p>
                    <p className="md:text-base text-sm text-gray-400 line-through">
                      {currency}
                      {coursedata.coursePrice}
                    </p>
                    <p className="md:text-sm text-xs text-emerald-600 font-medium">
                      {coursedata.discount}% off
                    </p>
                  </div>

                  {/* META — rating / duration / lectures */}
                  <div className="flex items-center flex-wrap text-xs md:text-sm gap-3 pt-4 text-gray-500">
                    <div className="flex items-center gap-1">
                      <img
                        src={assets.star}
                        alt="star"
                        className="w-3.5 h-3.5"
                      />
                      <p className="font-medium text-gray-700">
                        {calculateRating(coursedata).toFixed(1)}
                      </p>
                    </div>
                    <div className="h-4 w-px bg-gray-300"></div>
                    <div className="flex items-center gap-1">
                      <img
                        src={assets.time_clock_icon}
                        alt="clock"
                        className="w-3.5 h-3.5"
                      />
                      <p className="font-medium text-gray-700">
                        {calculateCourseDuration(coursedata)}
                      </p>
                    </div>
                    <div className="h-4 w-px bg-gray-300"></div>
                    <div className="flex items-center gap-1">
                      <img
                        src={assets.time_clock_icon}
                        alt="clock"
                        className="w-3.5 h-3.5"
                      />
                      <p className="font-medium text-gray-700">
                        {calculateNoOfLectures(coursedata)} lessons
                      </p>
                    </div>
                  </div>

                  {/* ENROLL BUTTON */}
                  <button
                    onClick={handleEnroll}
                    disabled={isalreadyenrolled || isenrolling}
                    className={`mt-5 w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 ${
                      isalreadyenrolled
                        ? "bg-emerald-500 cursor-default"
                        : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 active:scale-[0.98] disabled:opacity-60"
                    }`}
                  >
                    {isalreadyenrolled
                      ? "Already Enrolled"
                      : isenrolling
                        ? "Enrolling..."
                        : "Enroll Now"}
                  </button>

                  {/* WHAT'S IN THE COURSE */}
                  <div className="pt-6">
                    <p className="md:text-lg text-base font-semibold text-gray-800">
                      What's in the Course?
                    </p>
                    <ul className="pt-3 space-y-2 text-sm md:text-default text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold mt-0.5">
                          ✓
                        </span>
                        Lifetime access with free updates.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold mt-0.5">
                          ✓
                        </span>
                        Step-by-step, hands-on project guidance.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold mt-0.5">
                          ✓
                        </span>
                        Downloadable resources and source code.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold mt-0.5">
                          ✓
                        </span>
                        Quizzes to test your knowledge.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold mt-0.5">
                          ✓
                        </span>
                        Certificate of Completion.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default Coursedetails;
