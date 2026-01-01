"use client";

import React, { useState, useEffect } from "react";
import { Bot } from "lucide-react";
import Image from "next/image";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  delay: string;
  isDarkMode: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  delay,
  isDarkMode,
}) => (
  <div
    className={`p-3 rounded-xl border backdrop-blur-xl animate-float-slow transition-colors duration-500 ${
      isDarkMode
        ? "bg-white/5 border-white/10 shadow-2xl"
        : "bg-white/80 border-blue-100 shadow-lg shadow-blue-500/5"
    }`}
    style={{ animationDelay: delay }}
  >
    <div
      className={`text-[9px] font-black uppercase tracking-widest mb-1 ${
        isDarkMode ? "opacity-50 text-white" : "text-gray-500"
      }`}
    >
      {title}
    </div>
    <div className="flex items-end gap-2">
      <div
        className={`text-xl font-black ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {value}
      </div>
      <div
        className={`text-[9px] font-black pb-1 ${
          isDarkMode ? "text-blue-400" : "text-blue-600"
        }`}
      >
        {change}
      </div>
    </div>
  </div>
);

const Hero: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  return (
    <section
      id="hero"
      className={`relative  overflow-hidden transition-colors duration-700 ${
        isDarkMode ? "bg-[#030303]" : "bg-[#fafafa]"
      }`}
    >
      <div
        className={`absolute top-1/2 left-1/4 w-[600px] h-[600px] blur-[200px] rounded-full opacity-20 pointer-events-none ${
          isDarkMode ? "bg-[#3b82f6]/40" : "bg-[#3b82f6]/20"
        }`}
      />

      <div
        id="hero"
        className="relative min-h-screen flex items-center pt-28 pb-20 px-6 overflow-hidden"
      >
        {/* Ambient Background Glows */}
        <div
          className={`absolute top-0 left-1/4 w-[500px] h-[500px] blur-[120px] rounded-full animate-pulse-slow pointer-events-none ${
            isDarkMode ? "bg-blue-500/10" : "bg-blue-100/60"
          }`}
        />
        <div
          className={`absolute bottom-0 right-1/4 w-[400px] h-[400px] blur-[100px] rounded-full animate-pulse-slow pointer-events-none ${
            isDarkMode ? "bg-blue-600/5" : "bg-indigo-100/50"
          }`}
          style={{ animationDelay: "2s" }}
        />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-1 lg:gap-0 items-center">
            {/* Left Column: Content */}
            <div className="space-y-5 text-left">
              {/* Status Badge */}
              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border animate-slide-right ${
                  isDarkMode
                    ? "bg-blue-500/10 border-blue-500/20"
                    : "bg-blue-50 border-blue-100"
                }`}
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      isDarkMode ? "bg-blue-400" : "bg-blue-500"
                    }`}
                  ></span>
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      isDarkMode ? "bg-blue-400" : "bg-blue-500"
                    }`}
                  ></span>
                </span>
                <span
                  className={`text-[10px] font-black uppercase tracking-widest ${
                    isDarkMode ? "text-blue-300" : "text-blue-700"
                  }`}
                >
                  AI Decision Intelligence v2.0
                </span>
              </div>

              {/* Main Title */}
              {/* Main Title */}
              <h1
                className={`text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-black -tracking-wide leading-[0.9] lg:leading-[0.85] animate-reveal transition-colors duration-500 ${
                  isDarkMode ? "text-white" : "text-gray-950"
                }`}
              >
                UNLEASH
                <br />
                THE <br />
                <span
                  className={`text-transparent bg-clip-text bg-gradient-to-r ${
                    isDarkMode
                      ? "bg-gradient-to-r from-blue-600 to-violet-600"
                      : "bg-gradient-to-r from-blue-600 to-violet-600"
                  } bg-[length:200%_auto] animate-shimmer`}
                >
                  HIDDEN
                  <br />
                  VALUE
                </span>{" "}
                <br />
                IN YOUR <br />
                DATA.
              </h1>

              <p
                className={`max-w-lg text-lg font-medium leading-relaxed animate-fade-in animation-delay-500 transition-colors duration-500 ${
                  isDarkMode ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Our AI does not just process numbers; it reasons through your
                messy datasets to deliver strategic insights, predictive models,
                and growth paths.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in animation-delay-700">
                <button
                  className={`w-full sm:w-auto px-8 py-4 font-black uppercase tracking-tightest rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg group overflow-hidden relative ${
                    isDarkMode
                      ? "bg-blue-600 text-white shadow-blue-900/20"
                      : "bg-blue-600 text-white shadow-blue-500/30"
                  }`}
                >
                  <span className="relative z-10 block transition-transform duration-500 group-hover:translate-x-1">
                    Analyze Now
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
                <button
                  className={`w-full sm:w-auto px-8 py-4 font-black uppercase tracking-tightest rounded-xl border transition-all hover:bg-white/5 active:scale-95 ${
                    isDarkMode
                      ? "border-white/10 text-white"
                      : "border-gray-200 text-gray-700 bg-white hover:bg-gray-50"
                  }`}
                >
                  Watch Intro
                </button>
              </div>

              <div
                className={`text-[10px] font-black uppercase tracking-[0.2em] opacity-40 animate-fade-in animation-delay-700 ${
                  isDarkMode ? "text-white" : "text-slate-900"
                }`}
              >
                No Credit Card Required • Enterprise Ready
              </div>
            </div>

            {/* Right Column: Visual Dashboard */}
            <div className="relative lg:h-[440px] animate-fade-in animation-delay-1000 mt-10 lg:mt-0 flex items-center justify-center">
              {/* Main Dashboard Preview */}
              <div>
                {/* Inner Data Visualization Mock */}
                <div className="relative  max-w-8xl group">
                  <div className="absolute -inset-2 rounded-3xl blur bg-gradient-to-r from-blue-500 to-violet-600 opacity-15 group-hover:opacity-25 transition-opacity duration-500" />
                  <div className={`relative rounded-3xl overflow-hidden border shadow-2xl ${isDarkMode ? "bg-[#0a0a0a] border-white/10" : "bg-white border-gray-200"}`}>
                    <div className={`h-12 border-b flex items-center px-4 gap-4 ${isDarkMode ? "bg-white/5 border-white/5" : "bg-gray-50/60 border-gray-100"}`}>
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-slate-300" />
                        <div className="w-3 h-3 rounded-full bg-slate-300" />
                        <div className="w-3 h-3 rounded-full bg-slate-300" />
                      </div>
                      <div className={`flex-1 max-w-[240px] h-6 rounded ${isDarkMode ? "bg-white/10" : "bg-gray-200/60"}`} />
                    </div>
                    <div className="relative">
                      <Image
                        src="/images/dashboardPreview.png"
                        alt="Intellexa dashboard preview"
                        width={1920}
                        height={1080}
                        priority
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
                <div className={`mt-15 flex items-center justify-center gap-6 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  <div className="inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    No setup required
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-600" />
                    Free trial, cancel anytime
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    SOC2 ready
                  </div>
                </div>
              </div>

              {/* Floating Metric Cards for 3D Depth - Responsive Positions */}
              <div className="absolute -top-6 -right-4 z-20 scale-90 md:scale-100">
                <MetricCard
                  title="Revenue Predict"
                  value="$2.4M"
                  change="+18.4%"
                  delay="0s"
                  isDarkMode={isDarkMode}
                />
              </div>
              <div className="absolute top-[70%] -left-8 z-20 scale-90 md:scale-100">
                <MetricCard
                  title="Data Velocity"
                  value="84 GB/s"
                  change="Optimal"
                  delay="1.5s"
                  isDarkMode={isDarkMode}
                />
              </div>
              <div className="absolute -bottom-0.5 right-8 z-20 scale-90 md:scale-100">
                <div
                  className={`backdrop-blur-xl p-3 rounded-xl border ${
                    isDarkMode
                      ? "bg-blue-500/10 border-blue-500/20"
                      : "bg-white/80 border-blue-100 shadow-lg"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center animate-pulse">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-[8px] font-black uppercase tracking-widest text-blue-500">
                        AI Agent Active
                      </div>
                      <div
                        className={`text-[10px] font-black ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Reasoning Flow Ingested
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Decorative Rings */}
              <div className="absolute inset-0 scale-110 md:scale-125 -z-10 opacity-40 pointer-events-none">
                <div
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border rounded-full animate-spin-slow ${
                    isDarkMode ? "border-blue-500/20" : "border-blue-300"
                  }`}
                />
                <div
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 border rounded-full animate-spin-slow-reverse ${
                    isDarkMode ? "border-blue-500/10" : "border-blue-100"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes reveal {
            0% {
              transform: translateY(30px);
              opacity: 0;
              filter: blur(10px);
            }
            100% {
              transform: translateY(0);
              opacity: 1;
              filter: blur(0);
            }
          }
          @keyframes slide-right {
            0% {
              transform: translateX(-20px);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }
          @keyframes fade-in {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
          @keyframes shimmer {
            0% {
              bg-position: 100% 50%;
            }
            100% {
              bg-position: -100% 50%;
            }
          }
          @keyframes float-slow {
            0%,
            100% {
              transform: translateY(0) scale(1);
            }
            50% {
              transform: translateY(-10px) scale(1.02);
            }
          }
          @keyframes spin-slow {
            to {
              transform: rotate(360deg);
            }
          }
          @keyframes spin-slow-reverse {
            to {
              transform: rotate(-360deg);
            }
          }
          @keyframes bar-grow {
            0% {
              transform: scaleY(0);
            }
            100% {
              transform: scaleY(1);
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Hero;
