"use client";

import React from "react";

const Problem: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  return (
    <section
      id="problem"
      className={`relative py-40 px-6 overflow-hidden transition-colors duration-700 ${
        isDarkMode ? "bg-[#030303]" : "bg-[#fafafa]"
      }`}
    >
      {/* Background Glows */}
      <div
        className={`absolute top-1/2 left-1/4 w-[600px] h-[600px] blur-[200px] rounded-full opacity-20 pointer-events-none ${
          isDarkMode ? "bg-[#3b82f6]/40" : "bg-[#3b82f6]/20"
        }`}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-24 space-y-6">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all duration-500 ${
              isDarkMode
                ? "bg-[#3b82f6]/10 border-[#3b82f6]/20"
                : "bg-black/5 border-black/10"
            }`}
          >
            <span
              className={`text-[11px] font-black uppercase tracking-[0.25em] ${
                isDarkMode ? "text-[#3b82f6]" : "text-[#2563eb]"
              }`}
            >
              Problem
            </span>
          </div>
          <h2
            className={`text-5xl md:text-7xl uppercase font-black tracking-tighter leading-[0.9] ${
              isDarkMode ? "text-white" : "text-gray-950"
            }`}
          >
            Manually entering
            <br />
            <span
              className={`text-transparent uppercase bg-clip-text bg-gradient-to-r ${
                isDarkMode
                  ? "from-[#3b82f6] via-white to-[#3b82f6]"
                  : "from-[#2563eb] via-[#3b82f6] to-[#2563eb]"
              } bg-[length:200%_auto] animate-shimmer`}
            >
              your data is a hassle.{" "}
            </span>
          </h2>
          <p
            className={`text-lg font-medium ${
              isDarkMode ? "text-white/40" : "text-black/50"
            } max-w-2xl mx-auto`}
          >
            Manual data entry is slow, error-prone, and expensive. Stop wasting time and start automating.
          </p>
        </div>

        {/* Problems Grid */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              icon: (
                <svg
                  className="w-6 h-6 text-rose-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-7 4h8M5 8h14M7 4h10"
                  />
                </svg>
              ),
              title: "Data Overload",
              desc: "Businesses struggle to make sense of vast amounts of complex data, missing out on valuable insights that could drive growth and innovation.",
            },
            {
              icon: (
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3M12 19a7 7 0 100-14 7 7 0 000 14z"
                  />
                </svg>
              ),
              title: "Slow Decision-Making",
              desc: "Traditional data processing methods are too slow, causing businesses to lag behind market changes and miss crucial opportunities.",
            },
            {
              icon: (
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c1.657 0 3-1.567 3-3.5S13.657 4 12 4 9 5.567 9 7.5 10.343 11 12 11zm0 2c-3.866 0-7 2.239-7 5v2h14v-2c0-2.761-3.134-5-7-5z"
                  />
                </svg>
              ),
              title: "Data Security Concerns",
              desc: "With increasing cyber threats, businesses worry about the safety of their sensitive information when adopting new technologies.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`group relative rounded-2xl border p-6 md:p-8 hover:shadow-xl transition-all ${
                isDarkMode
                  ? "border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-500/30"
                  : "border-gray-200 bg-gray-50/70 hover:bg-white hover:border-blue-500/30"
              }`}
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-blue-600/5 to-violet-600/5" />
              <div
                className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-5 shadow-sm group-hover:border-blue-500/40 ${
                  isDarkMode
                    ? "bg-white/10 border-white/10"
                    : "bg-white border-gray-200"
                }`}
              >
                {item.icon}
              </div>
              <h3
                className={`text-xl font-bold mb-2 group-hover:text-blue-600 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {item.title}
              </h3>
              <p
                className={`leading-relaxed ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
