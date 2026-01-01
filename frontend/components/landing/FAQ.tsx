"use client";

import React, { useState } from "react";

const faqs = [
  {
    q: "Is my data secure with Intellexa?",
    a: "Yes. We use enterprise-grade encryption, strict privacy controls, and continuous monitoring to keep your data safe.",
  },
  {
    q: "Can I integrate with my existing tools?",
    a: "Absolutely. We provide APIs and native integrations for popular CRMs, data warehouses, and workflow tools.",
  },
  {
    q: "Do you offer support for onboarding?",
    a: "Our team provides guided onboarding, best practices, and dedicated support for PRO and ENTERPRISE plans.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes, all plans start with a 7-day free trial. No credit card required.",
  },
];

const FAQ: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className={`relative py-40 px-6 overflow-hidden transition-colors duration-700 ${
        isDarkMode ? "bg-[#030303]" : "bg-[#fafafa]"
      }`}
    >
      {" "}
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
              FAQ
            </span>
          </div>
          <h2
            className={`text-5xl md:text-7xl uppercase font-black tracking-tighter leading-[0.9] ${
              isDarkMode ? "text-white" : "text-gray-950"
            }`}
          >
  Frequently asked 
            <br />
            <span
              className={`text-transparent uppercase bg-clip-text bg-gradient-to-r ${
                isDarkMode
                  ? "from-[#3b82f6] via-white to-[#3b82f6]"
                  : "from-[#2563eb] via-[#3b82f6] to-[#2563eb]"
              } bg-[length:200%_auto] animate-shimmer`}
            >
             questions.{" "}
            </span>
          </h2>
          <p
            className={`text-lg font-medium ${
              isDarkMode ? "text-white/40" : "text-black/50"
            } max-w-2xl mx-auto`}
          >
            Have questions? We're here to help. Find answers to the most common questions about Intellexa.
          </p>
        </div>
        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`rounded-xl border backdrop-blur-sm overflow-hidden shadow-sm transition-colors duration-300 ${
                  isDarkMode
                    ? "border-white/10 bg-white/5"
                    : "border-gray-200 bg-white/80"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className={`font-black ${isDarkMode ? "text-white" : "text-gray-900"}`}>{item.q}</span>
                  <span
                    className={`transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className={`px-5 pb-5 animate-in fade-in duration-200 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
