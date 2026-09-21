import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { getYoutubeId } from "../../utils/youtube";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Footer from "../../components/student/Footer";

const Player = () => {
  const {
    enrolledCourses,
    enrollmentMeta,
    updateLectureProgress,
    calculateChapterTime,
    calculateRating,
    calculateCourseDuration,
    calculateNoOfLectures,
    currency,
  } = useContext(AppContext);

  const { courseId } = useParams();
  const [coursedata, setcoursedata] = useState(null);
  const [openSections, setopensections] = useState({});
  const [playerdata, setplayerdata] = useState(null);

  const getcoursedata = () => {
    enrolledCourses.map((course) => {
      if (course._id === courseId) {
        setcoursedata(course);
      }
    });
  };

  const toggleSection = (index) => {
    setopensections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    getcoursedata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enrolledCourses, courseId]);

  const meta = enrollmentMeta[courseId];
  const completedLectures = meta?.completedLectures || [];
  const lectureKey = (chapterIndex, lectureIndex) =>
    `${chapterIndex}-${lectureIndex}`;
  const isLectureComplete = (chapterIndex, lectureIndex) =>
    completedLectures.includes(lectureKey(chapterIndex, lectureIndex));

  const toggleLectureComplete = (chapterIndex, lectureIndex) => {
    const key = lectureKey(chapterIndex, lectureIndex);
    const next = isLectureComplete(chapterIndex, lectureIndex)
      ? completedLectures.filter((k) => k !== key)
      : [...completedLectures, key];
    updateLectureProgress(courseId, next);
  };

  const totalLectures = coursedata ? calculateNoOfLectures(coursedata) : 0;
  const progressPercent =
    totalLectures > 0
      ? Math.round((completedLectures.length / totalLectures) * 100)
      : 0;

  return (
    <>
      <div className="p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36">
        {/* LEFT COLUMN — COURSE STRUCTURE */}
        <div className="text-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Course Structure</h2>
            {coursedata && (
              <p className="text-sm text-gray-500">
                {completedLectures.length}/{totalLectures} lectures ·{" "}
                {progressPercent}%
              </p>
            )}
          </div>
          <div className="pt-5 space-y-2">
            {coursedata &&
              coursedata.courseContent.map((chapter, index) => (
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
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLectureComplete(index, i);
                            }}
                            src={
                              isLectureComplete(index, i)
                                ? assets.blue_tick_icon
                                : assets.play_icon
                            }
                            alt={isLectureComplete(index, i) ? "completed" : "play"}
                            className="w-3.5 h-3.5 mt-1 cursor-pointer"
                            title={
                              isLectureComplete(index, i)
                                ? "Mark as incomplete"
                                : "Mark as complete"
                            }
                          />
                          <div className="flex items-center justify-between w-full text-gray-700 text-xs md:text-sm">
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-3 items-center">
                              {lecture.lectureUrl && (
                                <p
                                  onClick={() =>
                                    setplayerdata({
                                      ...lecture,
                                      chapter: index + 1,
                                      lecture: i + 1,
                                    })
                                  }
                                  className="text-blue-500 font-medium cursor-pointer hover:underline"
                                >
                                  Watch
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

        {/* RIGHT COLUMN — PLAYER or COURSE CARD */}
        <div className="w-full md:w-80 lg:w-96 shrink-0 self-start md:sticky md:top-24">
          {playerdata ? (
            // ---------- VIDEO PLAYER ----------
            <div className="shadow-custom-card rounded-xl overflow-hidden bg-white border border-gray-100">
              <YouTube
                videoId={getYoutubeId(playerdata.lectureUrl)}
                opts={{ playerVars: { autoplay: 1 } }}
                iframeClassName="w-full aspect-video"
              />
              <div className="p-4 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-800">
                  {playerdata.lectureTitle}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Chapter {playerdata.chapter} · Lecture {playerdata.lecture}
                </p>
              </div>
            </div>
          ) : (
            // ---------- COURSE CARD ----------
            coursedata && (
              <div className="shadow-custom-card rounded-xl overflow-hidden bg-white border border-gray-100">
                <img
                  src={coursedata.courseThumbnail}
                  alt={coursedata.courseTitle}
                  className="w-full h-48 object-cover"
                />

                <div className="p-5">
                  <h3 className="text-base font-semibold text-gray-800">
                    {coursedata.courseTitle}
                  </h3>

                  {/* PRICE */}
                  <div className="flex gap-2 items-baseline pt-3 flex-wrap">
                    <p className="text-gray-900 md:text-2xl text-xl font-bold">
                      {currency}
                      {(
                        coursedata.coursePrice -
                        (coursedata.discount * coursedata.coursePrice) / 100
                      ).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-400 line-through">
                      {currency}
                      {coursedata.coursePrice}
                    </p>
                    <p className="text-xs text-emerald-600 font-medium">
                      {coursedata.discount}% off
                    </p>
                  </div>

                  {/* META */}
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

                  {/* ENROLLED BADGE */}
                  <button className="mt-5 w-full py-3 rounded-lg font-semibold text-white bg-emerald-500 cursor-default">
                    Already Enrolled
                  </button>

                  {/* WHAT'S IN THE COURSE */}
                  <div className="pt-6">
                    <p className="md:text-lg text-base font-semibold text-gray-800">
                      What's in the Course?
                    </p>
                    <ul className="pt-3 space-y-2 text-sm text-gray-600">
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
            )
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Player;
