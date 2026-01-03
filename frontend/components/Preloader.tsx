"use client";

import React, { useState, useEffect } from 'react';
import { Layers } from 'lucide-react';

interface PreloaderProps {
    isDarkMode: boolean;
}

const Preloader: React.FC<PreloaderProps> = ({ isDarkMode }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    setTimeout(() => setIsLoading(false), 300);
                    return 100;
                }
                return prev + Math.random() * 20;
            });
        }, 100);

        return () => clearInterval(progressInterval);
    }, []);

    if (!isLoading) return null;

    return (
        <div className={`fixed inset-0 z-[200] flex items-center justify-center transition-all duration-500 ${progress >= 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'} ${isDarkMode ? 'bg-[#030303]' : 'bg-[#fafafa]'}`}>
            {/* Minimal Loading Interface */}
            <div className="flex flex-col items-center gap-8">
                {/* Animated Logo */}
                <div className="relative">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-700 ${isDarkMode ? 'bg-[#d4ff4a]' : 'bg-[#4d6106]'}`}
                        style={{
                            transform: `rotate(${progress * 3.6}deg)`,
                            opacity: 0.3 + (progress / 100) * 0.7
                        }}
                    >
                        <Layers className={`w-8 h-8 ${isDarkMode ? 'text-black' : 'text-white'}`} />
                    </div>
                </div>

                {/* Minimal Progress */}
                <div className="w-32 h-0.5 rounded-full overflow-hidden bg-white/5">
                    <div
                        className={`h-full transition-all duration-300 ${isDarkMode ? 'bg-[#d4ff4a]' : 'bg-[#4d6106]'}`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Preloader;
