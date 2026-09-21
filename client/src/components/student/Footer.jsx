import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-left w-full mt-10">
      <div className="md:px-36 px-8">
        <div className="flex flex-col md:flex-row items-start justify-center gap-10 md:gap-32 py-10 border-b border-white/30">
          <div className="flex flex-col md:items-start items-center w-full">
            <img
              src={assets.logo_dark}
              alt="logo"
              className="w-32 md:w-40 h-auto object-contain"
            />
            <p className="text-white/80 mt-4 max-w-md text-center md:text-left">
              Learnova is dedicated to making quality education accessible to
              everyone, everywhere.
            </p>
          </div>
          <div className="flex flex-col md:items-start items-center w-full">
            <h2 className="font-semibold text-white mb-5">Company</h2>
            <ul className="flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div className="hidden md:flex flex-col items-start w-full">
            <h2 className="font-semibold text-white mb-5">
              Subscribe to our newsletter
            </h2>
            <p className="text-sm text-white/80">
              The latest news,articles,and resources,sent to your inbox weekly.
            </p>
            <div className="flex items-center gap-2 pt-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="border border-gray-500/30 bg-gray-800 text-gray-500 placeholder-gray-500 outline-none w-64 h-9 rounded px-2 text-sm"
              />
              <button className="bg-blue-600 w-24 h-9 text-white rounded">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <p className="text-white/60 text-center md:text-left py-5 text-sm">
          © 2025 Learnova. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
