import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/react";
import { AppContext } from "../../context/AppContext";

const Navbar = () => {
  const location = useLocation();
  const isCourseListPage = location.pathname.includes("/course-list");
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const { navigate, isEducator } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b border-gray-200/60 backdrop-blur-lg transition-all duration-300 ${
        isCourseListPage
          ? "bg-white/80 shadow-sm"
          : "bg-gradient-to-r from-cyan-50/90 via-white/90 to-blue-50/90 shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 py-3">
        {/* LOGO */}
        <img
          onClick={() => navigate("/")}
          src={assets.logo_dark}
          alt="Learnova"
          className="h-12 sm:h-14 md:h-16 w-auto object-contain cursor-pointer shrink-0 transition-transform duration-300 hover:scale-105"
        />

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
          {user && (
            <div className="flex items-center gap-8">
              <button
                onClick={() => navigate("/educator")}
                className="relative group transition-colors duration-200 hover:text-blue-600"
              >
                {isEducator ? "Educator Dashboard" : "Become Educator"}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>

              <Link
                to="/my-enrollments"
                className="relative group transition-colors duration-200 hover:text-blue-600"
              >
                My Enrollments
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          )}

          {user ? (
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "w-10 h-10 ring-2 ring-blue-500/40 hover:ring-blue-500 transition-all",
                },
              }}
            />
          ) : (
            <button
              onClick={() => openSignIn()}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2.5 rounded-full font-medium shadow-md shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:-translate-y-0.5"
            >
              <span className="relative z-10">Create Account</span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          )}
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-gray-700 rounded transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-700 rounded my-1.5 transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-700 rounded transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-5 pt-2 flex flex-col gap-4 bg-white/95 backdrop-blur-md border-t border-gray-100">
          {user ? (
            <>
              <button
                onClick={() => {
                  navigate("/educator");
                  setMenuOpen(false);
                }}
                className="text-left text-gray-700 font-medium py-2 hover:text-blue-600 transition-colors"
              >
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>
              <Link
                to="/my-enrollments"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 font-medium py-2 hover:text-blue-600 transition-colors"
              >
                My Enrollments
              </Link>
              <div className="pt-2 border-t border-gray-100">
                <UserButton />
              </div>
            </>
          ) : (
            <button
              onClick={() => {
                openSignIn();
                setMenuOpen(false);
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-full font-medium shadow-md shadow-blue-500/30 active:scale-95 transition-transform"
            >
              Create Account
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
