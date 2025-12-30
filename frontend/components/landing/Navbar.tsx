"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Layers } from 'lucide-react';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from '@clerk/nextjs';

interface NavbarProps {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleTheme }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [hoverStyle, setHoverStyle] = useState<React.CSSProperties>({});
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

    const navItems = ['Features', 'Pricing', 'FAQ', 'About', 'Contact'];

    useEffect(() => {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: "-80px 0px -50% 0px"
        };

        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    const item = navItems.find(i => i.toLowerCase() === id);
                    if (item) setActiveTab(item);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);

        navItems.forEach(item => {
            const el = document.getElementById(item.toLowerCase());
            if (el) observer.observe(el);
        });

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
            if (window.scrollY < 100) setActiveTab(null);
        };
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsMobileMenuOpen(false);
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('keydown', handleKeyDown);
            observer.disconnect();
        };
    }, [navItems]);

    const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, item: string) => {
        e.preventDefault();
        const element = document.getElementById(item.toLowerCase());
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveTab(item);
            setIsMobileMenuOpen(false);
        }
    };

    useEffect(() => {
        if (hoveredIndex !== null && navItemsRef.current[hoveredIndex]) {
            const el = navItemsRef.current[hoveredIndex];
            if (el) {
                setHoverStyle({
                    width: `${el.offsetWidth}px`,
                    height: `${el.offsetHeight}px`,
                    transform: `translateX(${el.offsetLeft}px)`,
                    opacity: 1,
                });
            }
        } else {
            setHoverStyle(h => ({ ...h, opacity: 0 }));
        }
    }, [hoveredIndex]);

    return (
        <>
            <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] transition-all duration-500 ${isScrolled ? 'max-w-4xl' : 'max-w-5xl'}`}>
                <nav className={`
                    relative flex items-center justify-between px-6 lg:px-8 py-3 rounded-[2rem] border transition-all duration-700 
                    backdrop-blur-3xl backdrop-saturate-200 
                    ${isDarkMode
                        ? `bg-black/30 border-white/10 ${isScrolled ? 'shadow-[0_20px_40px_rgba(0,0,0,0.5)]' : 'shadow-[0_20px_50px_rgba(0,0,0,0.3)]'}`
                        : `bg-white/70 border-black/[0.04] ${isScrolled ? 'shadow-[0_20px_40px_rgba(0,0,0,0.1)]' : 'shadow-[0_20px_50px_rgba(0,0,0,0.05)]'}`
                    }
                `}>
                    <div className={`absolute inset-[1px] rounded-[2rem] border pointer-events-none ${isDarkMode ? 'border-white/5' : 'border-black/[0.02]'}`} />

                    {/* Logo Section */}
                    <div
                        onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            setActiveTab(null);
                        }}
                        className="flex items-center gap-4 group cursor-pointer relative z-50"
                    >
                        <div className="relative">
                            <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-violet-600 rounded-[0.75rem] flex items-center justify-center shadow-[0_8px_20px_rgba(212,255,74,0.3)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 overflow-hidden">
                                <Layers className="w-5 h-5 text-black relative z-10" />
                            </div>
                            <div className="absolute -inset-2 bg-[#d4ff4a]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                        <span className={`text-xl font-black tracking-tighter uppercase transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-950'}`}>
                            Intellexa
                        </span>
                    </div>

                    {/* Navigation Items - Desktop */}
                    <div className="hidden lg:flex items-center gap-2 relative">
                        <div
                            className={`absolute z-0 rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`}
                            style={hoverStyle}
                        />
                        {navItems.map((item, index) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                ref={(el) => { navItemsRef.current[index] = el; }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={(e) => handleNavLinkClick(e, item)}
                                className={`relative z-10 px-4 py-2 text-[12px] font-black uppercase tracking-[0.12em] transition-all duration-500 ${isDarkMode
                                    ? (activeTab === item ? 'text-[#113097]' : 'text-gray-400 hover:text-white')
                                    : (activeTab === item ? 'text-black' : 'text-gray-500 hover:text-black')
                                    } ${hoveredIndex === index ? 'scale-105' : 'scale-100'}`}
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Action Buttons & Mobile Toggle */}
                    <div className="flex items-center gap-3 lg:gap-6 relative z-50">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={toggleTheme}
                                className={`p-2.5 rounded-xl border transition-all duration-500 hover:scale-110 active:scale-90 ${isDarkMode ? 'bg-white/5 border-white/10 text-[#4a4aff]' : 'bg-black/[0.03] border-black/[0.08] text-gray-950'}`}
                            >
                                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>

                            <SignedOut>
                                <SignInButton mode="modal">
                                    <button className="hidden sm:block relative px-4 py-2.5 text-xs font-[950] uppercase tracking-[0.2em] rounded-xl transition-all duration-500 overflow-hidden bg-transparent border border-black/[0.08] text-gray-900 hover:bg-black/5">
                                        Sign In
                                    </button>
                                </SignInButton>
                                <SignUpButton mode="modal">
                                    <button className="hidden sm:block relative px-4 py-2.5 text-xs font-[950] uppercase tracking-[0.2em] rounded-xl transition-all duration-500 overflow-hidden bg-transparent border border-black/[0.08] text-gray-900 hover:bg-black/5">
                                        Sign Up
                                    </button>
                                </SignUpButton>
                                <Link
                                    href="/dashboard"
                                    className="hidden sm:block relative px-6 py-2.5 text-xs font-[950] uppercase tracking-[0.2em] rounded-xl transition-all duration-500 overflow-hidden bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-[0_8px_30px_rgba(212,255,74,0.3)] hover:scale-[1.05]"
                                >
                                    Get Started
                                </Link>
                            </SignedOut>
                            <SignedIn>
                                <Link
                                    href="/dashboard"
                                    className="hidden sm:block relative px-6 py-2.5 text-xs font-[950] uppercase tracking-[0.2em] rounded-xl transition-all duration-500 overflow-hidden bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-[0_8px_30px_rgba(212,255,74,0.3)] hover:scale-[1.05]"
                                >
                                    Open Dashboard
                                </Link>
                                <div className="ml-2">
                                    <UserButton
                                        appearance={{
                                            elements: {
                                                userButtonAvatarBox: "w-8 h-8",
                                            },
                                        }}
                                    />
                                </div>
                            </SignedIn>
                        </div>

                        {/* Mobile Hamburger */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`lg:hidden flex flex-col items-center justify-center w-10 h-10 rounded-xl transition-all duration-500 ${isDarkMode ? 'bg-white/5 text-[#684aff]' : 'bg-black/5 text-gray-950'}`}
                        >
                            <div className={`w-5 h-0.5 bg-current transition-all duration-500 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
                            <div className={`w-5 h-0.5 bg-current mt-1 transition-all duration-500 ${isMobileMenuOpen ? '-rotate-45 -translate-y-0.5' : ''}`} />
                        </button>
                    </div>

                    {/* Mobile Menu Overlay */}
                    <div className={`
                        absolute top-full left-0 right-0 mt-4 p-4 lg:hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                        ${isMobileMenuOpen ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 -translate-y-10 scale-95 pointer-events-none'}
                    `}>
                        <div className={`
                            rounded-[2rem] border p-6 backdrop-blur-3xl 
                            ${isDarkMode ? 'bg-black/80 border-white/10' : 'bg-white/90 border-black/5 shadow-2xl'}
                        `}>
                            <div className="flex flex-col gap-4">
                                {navItems.map((item, i) => (
                                    <a
                                        key={item}
                                        href={`#${item.toLowerCase()}`}
                                        style={{ transitionDelay: `${i * 50}ms` }}
                                        onClick={(e) => handleNavLinkClick(e, item)}
                                        className={`text-2xl font-black uppercase tracking-tighter transition-all duration-500 ${isDarkMode
                                            ? (activeTab === item ? 'text-[#4a74ff]' : 'text-white/60 hover:text-[#4a80ff]')
                                            : (activeTab === item ? 'text-black' : 'text-black/60 hover:text-black')
                                            } ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
                                    >
                                        {item}
                                    </a>
                                ))}
                                <div className="h-px bg-white/10 my-4" />
                                <SignedOut>
                                    <SignInButton mode="modal">
                                        <button
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="w-full py-4 rounded-2xl bg-transparent border border-white/20 text-white font-black uppercase tracking-widest italic text-center"
                                        >
                                            Sign In
                                        </button>
                                    </SignInButton>
                                    <SignUpButton mode="modal">
                                        <button
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="w-full py-4 rounded-2xl bg-transparent border border-white/20 text-white font-black uppercase tracking-widest italic text-center mt-3"
                                        >
                                            Sign Up
                                        </button>
                                    </SignUpButton>
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-black uppercase tracking-widest italic text-center shadow-[0_15px_40px_rgba(212,255,74,0.3)] mt-3"
                                    >
                                        Get Started
                                    </Link>
                                </SignedOut>
                                <SignedIn>
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-black uppercase tracking-widest italic text-center shadow-[0_15px_40px_rgba(212,255,74,0.3)]"
                                    >
                                        Open Dashboard
                                    </Link>
                                    <div className="mt-4 flex justify-center">
                                        <UserButton />
                                    </div>
                                </SignedIn>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

           
        </>
    );
};

export default Navbar;
