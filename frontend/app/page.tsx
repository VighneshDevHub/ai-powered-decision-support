'use client';

import React, { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Problem from "@/components/landing/Problem";
import Workflow from "@/components/landing/Workflow";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleTheme = () => setIsDarkMode((d) => !d);
    return (
        <div className="min-h-screen bg-white text-gray-900 selection:bg-blue-500/30 relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-blue-100 to-violet-100 blur-[100px] opacity-70 animate-float" />
                <div className="absolute top-1/3 right-0 w-[380px] h-[380px] rounded-full bg-gradient-to-br from-violet-100 to-blue-100 blur-[100px] opacity-70 animate-float-delayed" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.06)_0%,_transparent_60%)]" />
            </div>
            <main>
            <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            
                <Hero isDarkMode={isDarkMode} />
                <Problem isDarkMode={isDarkMode}/>
                <Workflow isDarkMode={isDarkMode}/>
                <Features />
                <Pricing isDarkMode={isDarkMode} />
                <FAQ />
                <CTA />
            </main>
            <Footer />
            <style jsx>{`
                @keyframes float {
                    0% { transform: translateY(0px) }
                    50% { transform: translateY(10px) }
                    100% { transform: translateY(0px) }
                }
                .animate-float { animation: float 12s ease-in-out infinite }
                .animate-float-delayed { animation: float 16s ease-in-out infinite 2s }
            `}</style>
        </div>
    );
}
