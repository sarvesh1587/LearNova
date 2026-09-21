import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import SearchBar from "../../components/student/SearchBar";
import { useParams } from "react-router-dom";
import CourseCard from "../../components/student/CourseCard";
import { assets } from "../../assets/assets";
import Footer from "../../components/student/Footer";

const CoursesList = () => {
  const { navigate, allCourses } = useContext(AppContext);
  const { input } = useParams();
  const [filteredcourse, setfilteredcourse] = useState([]);

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempcourses = allCourses.slice(); //CREATES A COPY OF allCourses ARRAY
      input
        ? setfilteredcourse(
            tempcourses.filter((item) =>
              item.courseTitle
                ?.toLowerCase()
                .includes(input.trim().toLowerCase()),
            ),
          )
        : setfilteredcourse(tempcourses);
    }
  }, [allCourses, input]);

  return (
    <>
      <div className="relative md:px-36 px-8 pt-20 text-left">
        <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
          <div>
            <h1 className="text-4xl font-semibold text-gray-800">
              Course List
            </h1>
            <p className="text-gray-500">
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
              </span>
              /<span>Course List</span>
            </p>
          </div>
          <SearchBar data={input} />
        </div>

        {input && (
          <div className="inline-flex items-center gap-3 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow mt-8 -mb-8">
            <span className="text-sm font-medium">{input}</span>
            <button
              onClick={() => navigate("/course-list")}
              className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <img src={assets.cross_icon} alt="clear" className="w-3 h-3" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0">
          {filteredcourse.map((course, index) => (
            <CourseCard key={course._id || index} course={course} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CoursesList;
