"use client";

import React from 'react';
import Link from 'next/link';


const Footer: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  return (
    <footer
      className={`border-t pt-20 pb-10 transition-colors duration-700
    ${
      isDarkMode
        ? "bg-[#030303] border-white/10"
        : "bg-[#fafafa] border-gray-200"
    }`}
    >
      <div
        className={`absolute top-1/2 left-1/4 w-[600px] h-[600px] blur-[200px] rounded-full opacity-20 pointer-events-none ${
          isDarkMode ? "bg-[#3b82f6]/40" : "bg-[#3b82f6]/20"
        }`}
      />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">I</span>
              </div>
              <span
                className={`text-2xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Intellexa
              </span>
            </div>
            <p
              className={`leading-relaxed mb-6 ${
                isDarkMode ? "text-white/60" : "text-gray-600"
              }`}
            >
              Empowering businesses with AI-driven insights for smarter decision
              making and sustainable growth.
            </p>
            <div className="flex gap-4">
              {/* Social Icons (Placeholders) */}
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer transition-colors ${
                    isDarkMode
                      ? "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-blue-400"
                      : "bg-white border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-blue-600"
                  }`}
                >
                  <span className="text-xs">SOC</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4
              className={`font-bold mb-6 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Product
            </h4>
            <ul
              className={`space-y-4 ${
                isDarkMode ? "text-white/60" : "text-gray-600"
              }`}
            >
              <li>
                <Link
                  href="#"
                  className={`transition-colors ${
                    isDarkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                  }`}
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className={`transition-colors ${
                    isDarkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                  }`}
                >
                  Integrations
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className={`transition-colors ${
                    isDarkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                  }`}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className={`transition-colors ${
                    isDarkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                  }`}
                >
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4
              className={`font-bold mb-6 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Company
            </h4>
            <ul
              className={`space-y-4 ${
                isDarkMode ? "text-white/60" : "text-gray-600"
              }`}
            >
              <li>
                <Link
                  href="#"
                  className={`transition-colors ${
                    isDarkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                  }`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className={`transition-colors ${
                    isDarkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                  }`}
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className={`transition-colors ${
                    isDarkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                  }`}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className={`transition-colors ${
                    isDarkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4
              className={`font-bold mb-6 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Legal
            </h4>
            <ul
              className={`space-y-4 ${
                isDarkMode ? "text-white/60" : "text-gray-600"
              }`}
            >
              <li>
                <Link
                  href="#"
                  className={`transition-colors ${
                    isDarkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                  }`}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className={`transition-colors ${
                    isDarkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                  }`}
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className={`transition-colors ${
                    isDarkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                  }`}
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className={`transition-colors ${
                    isDarkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                  }`}
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 ${
            isDarkMode ? "border-white/10" : "border-gray-200"
          }`}
        >
          <p
            className={`text-sm ${
              isDarkMode ? "text-white/40" : "text-gray-500"
            }`}
          >
            &copy; {new Date().getFullYear()} Intellexa Inc. All rights
            reserved.
          </p>
          <div
            className={`flex gap-8 text-sm ${
              isDarkMode ? "text-white/40" : "text-gray-500"
            }`}
          >
            <Link
              href="#"
              className={`transition-colors ${
                isDarkMode ? "hover:text-white" : "hover:text-gray-900"
              }`}
            >
              Privacy
            </Link>
            <Link
              href="#"
              className={`transition-colors ${
                isDarkMode ? "hover:text-white" : "hover:text-gray-900"
              }`}
            >
              Terms
            </Link>
            <Link
              href="#"
              className={`transition-colors ${
                isDarkMode ? "hover:text-white" : "hover:text-gray-900"
              }`}
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
