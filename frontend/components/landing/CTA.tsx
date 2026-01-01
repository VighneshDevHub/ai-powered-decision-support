'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const CTA: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const router = useRouter();

  return (
<section
      id="cta"
      className={`relative py-40 px-6 overflow-hidden transition-colors duration-700 ${
        isDarkMode ? "bg-[#030303]" : "bg-[#fafafa]"
      }`}
    >      

    <div
        className={`absolute top-1/2 left-1/4 w-[600px] h-[600px] blur-[200px] rounded-full opacity-20 pointer-events-none ${
          isDarkMode ? "bg-[#3b82f6]/40" : "bg-[#3b82f6]/20"
        }`}
      />
    <div className="max-w-6xl mx-auto relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 to-violet-600 p-12 md:p-24 text-center shadow-2xl shadow-blue-500/20">
        {/* Glow effects */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-20 mix-blend-overlay" />
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-[80px]" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-[80px]" />

        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-white">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-10">
            Join thousands of forward-thinking companies using Intellexa to make smarter, data-driven decisions today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
                onClick={() => router.push('/auth')}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-blue-600 font-black hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Started Now
            </button>
            <button 
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent border border-white/30 text-white font-black hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
export default CTA;