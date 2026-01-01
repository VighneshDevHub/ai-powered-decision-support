"use client";

import React from "react";

const Workflow: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  return (
    <section
      id="workflow"
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
              Workflow
            </span>
          </div>
          <h2
            className={`text-5xl md:text-7xl uppercase font-black tracking-tighter leading-[0.9] ${
              isDarkMode ? "text-white" : "text-gray-950"
            }`}
          >
            Just 3 steps
            <br />
            <span
              className={`text-transparent uppercase bg-clip-text bg-gradient-to-r ${
                isDarkMode
                  ? "from-[#3b82f6] via-white to-[#3b82f6]"
                  : "from-[#2563eb] via-[#3b82f6] to-[#2563eb]"
              } bg-[length:200%_auto] animate-shimmer`}
            >
              to get started{" "}
            </span>
          </h2>
          <p
            className={`text-lg font-medium ${
              isDarkMode ? "text-white/40" : "text-black/50"
            } max-w-2xl mx-auto`}
          >
            Choose the plan that fits your needs. All plans include our core
            AI-powered document intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-8">
            {[
              {
                title: "1. Upload Your Data",
                desc: "Simply upload your data to our secure platform. We support various file formats to ensure seamless integration.",
              },
              {
                title: "2. Click Start",
                desc: "Our AI processes and analyzes your data, extracting valuable insights and patterns automatically.",
              },
              {
                title: "3. Get Actionable Insights",
                desc: "Receive clear recommendations based on the analysis. Make data-driven decisions and improve business outcomes.",
              },
            ].map((step, i) => (
              <div key={i} className="relative pl-10">
                <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-white font-black flex items-center justify-center shadow-sm">
                  {i + 1}
                </div>
                <h3 className={`text-xl font-black mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {step.title}
                </h3>
                <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-r from-blue-500 to-violet-600 rounded-3xl blur opacity-15" />
            <div className={`relative rounded-3xl overflow-hidden border shadow-2xl ${isDarkMode ? "bg-[#0a0a0a] border-white/10" : "bg-white border-gray-200"}`}>
              <div className="aspect-[16/9]">
                <div className={`h-12 border-b flex items-center px-4 gap-2 ${isDarkMode ? "bg-white/5 border-white/5" : "bg-gray-50 border-gray-100"}`}>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-300" />
                    <div className="w-3 h-3 rounded-full bg-slate-300" />
                    <div className="w-3 h-3 rounded-full bg-slate-300" />
                  </div>
                  <div className="ml-4 h-6 w-48 bg-gray-200 rounded-md" />
                </div>
                <div className="grid grid-cols-12 gap-6 p-6">
                  <div className="col-span-3 space-y-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="h-3 w-24 bg-gray-100 rounded" />
                    ))}
                  </div>
                  <div className="col-span-9">
                    <div className="h-40 bg-gray-100 rounded-xl mb-6" />
                    <div className="grid grid-cols-3 gap-4">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-24 bg-gray-100 rounded-lg" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workflow;
