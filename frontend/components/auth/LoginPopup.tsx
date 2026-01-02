"use client";

import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, Github, Apple, Chrome, ArrowRight, ShieldCheck, User } from 'lucide-react';
import { useSignIn, useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

interface LoginPopupProps {
    isOpen: boolean;
    onClose: () => void;
    isDarkMode: boolean;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ isOpen, onClose, isDarkMode }) => {
    const [focused, setFocused] = useState<string | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [pendingVerification, setPendingVerification] = useState(false);

    const { signIn, setActive: setActiveSignIn } = useSignIn();
    const { signUp, setActive: setActiveSignUp } = useSignUp();
    const router = useRouter();

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            document.body.style.overflow = 'hidden';
            // Reset form when opening
            setEmail('');
            setPassword('');
            setName('');
            setError('');
            setPendingVerification(false);
            setVerificationCode('');
        } else {
            const timer = setTimeout(() => setIsAnimating(false), 700);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (mode === 'login') {
                if (!signIn) {
                    setError('Sign in is not available. Please refresh the page.');
                    return;
                }

                // Sign in with Clerk
                const result = await signIn.create({
                    identifier: email,
                    password,
                });

                if (result.status === 'complete') {
                    if (setActiveSignIn) {
                        await setActiveSignIn({ session: result.createdSessionId });
                    }
                    onClose();
                    router.refresh();
                }
            } else {
                if (!signUp) {
                    setError('Sign up is not available. Please refresh the page.');
                    return;
                }

                // Sign up with Clerk
                const result = await signUp.create({
                    emailAddress: email,
                    password,
                    firstName: name.split(' ')[0],
                    lastName: name.split(' ').slice(1).join(' ') || undefined,
                });

                if (result.status === 'complete') {
                    if (setActiveSignUp) {
                        await setActiveSignUp({ session: result.createdSessionId });
                    }
                    onClose();
                    router.refresh();
                } else if (result.status === 'missing_requirements') {
                    // Handle email verification if required
                    await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
                    setPendingVerification(true);
                    setError('');
                }
            }
        } catch (err: any) {
            setError(err?.errors?.[0]?.message || 'An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!signUp) return;

        setError('');
        setIsLoading(true);

        try {
            const result = await signUp.attemptEmailAddressVerification({
                code: verificationCode,
            });

            if (result.status === 'complete') {
                if (setActiveSignUp) {
                    await setActiveSignUp({ session: result.createdSessionId });
                }
                onClose();
                router.refresh();
            }
        } catch (err: any) {
            setError(err?.errors?.[0]?.message || 'Invalid verification code.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOAuthSignIn = async (strategy: 'oauth_github' | 'oauth_google' | 'oauth_apple') => {
        if (!signIn) {
            setError('Authentication is not available. Please refresh the page.');
            return;
        }

        try {
            await signIn.authenticateWithRedirect({
                strategy,
                redirectUrl: '/sso-callback',
                redirectUrlComplete: '/',
            });
        } catch (err: any) {
            setError(err?.errors?.[0]?.message || 'OAuth sign-in failed.');
        }
    };

    if (!isOpen && !isAnimating) return null;

    return (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 transition-all duration-700 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {/* Neural Backdrop */}
            <div
                className="absolute inset-0 bg-[#030303]/80 backdrop-blur-3xl transition-opacity duration-700"
                onClick={onClose}
            />

            {/* Login Console */}
            <div className={`
                relative w-full max-w-xl rounded-[3rem] border transition-all duration-700 overflow-hidden
                ${isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-12 opacity-0'}
                ${isDarkMode
                    ? 'bg-black/60 border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)]'
                    : 'bg-white border-black/5 shadow-[0_40px_100px_rgba(0,0,0,0.1)]'}
            `}>
                {/* Internal Glow */}
                <div className={`absolute -top-24 -left-24 w-64 h-64 blur-[100px] rounded-full opacity-20 pointer-events-none ${isDarkMode ? 'bg-[#d4ff4a]' : 'bg-[#d4ff4a]/50'}`} />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className={`absolute top-8 right-8 p-3 rounded-full border transition-all duration-500 hover:rotate-90 hover:scale-110 active:scale-95 z-50 ${isDarkMode ? 'bg-white/5 border-white/10 text-white/40 hover:text-[#d4ff4a]' : 'bg-black/5 border-black/5 text-black/40 hover:text-[#4d6106]'}`}
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-10 lg:p-14 relative z-10">
                    {/* Header */}
                    <div className="mb-12">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6 ${isDarkMode ? 'bg-[#d4ff4a]/10 border-[#d4ff4a]/20' : 'bg-[#4d6106]/5 border-[#4d6106]/10'}`}>
                            <ShieldCheck className={`w-3.5 h-3.5 ${isDarkMode ? 'text-[#d4ff4a]' : 'text-[#4d6106]'}`} />
                            <span className={`text-[9px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-[#d4ff4a]' : 'text-[#4d6106]'}`}>Secure Access</span>
                        </div>
                        <h2 className={`text-5xl font-[1000] tracking-tighter leading-none mb-3 ${isDarkMode ? 'text-white' : 'text-gray-950'}`}>
                            {mode === 'login' ? 'ESTABLISH' : 'CREATE'} <br />
                            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isDarkMode ? 'from-[#d4ff4a] via-white to-[#d4ff4a]' : 'from-[#4d6106] via-[#8ab10b] to-[#4d6106]'} bg-[length:200%_auto] animate-shimmer`}>
                                {mode === 'login' ? 'SESSION.' : 'ACCOUNT.'}
                            </span>
                        </h2>
                        <p className={`text-sm font-bold opacity-40 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                            {mode === 'login' ? 'Sign in to access your pivot account.' : 'Create your pivot account and unlock premium features.'}
                        </p>
                    </div>

                    {/* Mode Toggle */}
                    <div className={`flex gap-2 p-1 rounded-2xl mb-8 ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                        <button
                            onClick={() => {
                                setMode('login');
                                setError('');
                            }}
                            type="button"
                            className={`flex-1 py-3 px-6 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] transition-all duration-500 ${mode === 'login'
                                ? (isDarkMode ? 'bg-[#d4ff4a] text-black shadow-lg' : 'bg-[#4d6106] text-white shadow-lg')
                                : (isDarkMode ? 'text-white/40 hover:text-white/60' : 'text-black/40 hover:text-black/60')
                                }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => {
                                setMode('signup');
                                setError('');
                            }}
                            type="button"
                            className={`flex-1 py-3 px-6 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] transition-all duration-500 ${mode === 'signup'
                                ? (isDarkMode ? 'bg-[#d4ff4a] text-black shadow-lg' : 'bg-[#4d6106] text-white shadow-lg')
                                : (isDarkMode ? 'text-white/40 hover:text-white/60' : 'text-black/40 hover:text-black/60')
                                }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className={`mb-6 p-4 rounded-xl border ${isDarkMode ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-red-50 border-red-200 text-red-600'}`}>
                            <p className="text-sm font-bold">{error}</p>
                        </div>
                    )}

                    {/* Verification Code Form */}
                    {pendingVerification ? (
                        <form className="space-y-8" onSubmit={handleVerifyEmail}>
                            <div className="text-center mb-6">
                                <p className={`text-sm font-bold ${isDarkMode ? 'text-[#d4ff4a]' : 'text-[#4d6106]'}`}>
                                    Please check your email for a verification code.
                                </p>
                            </div>

                            <div className="space-y-1">
                                <label className={`text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>Verification Code</label>
                                <div className="relative group">
                                    <ShieldCheck className={`absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-500 ${focused === 'code' ? (isDarkMode ? 'text-[#d4ff4a]' : 'text-[#4d6106]') : (isDarkMode ? 'text-white/20' : 'text-black/20')}`} />
                                    <input
                                        type="text"
                                        value={verificationCode}
                                        onChange={(e) => setVerificationCode(e.target.value)}
                                        onFocus={() => setFocused('code')}
                                        onBlur={() => setFocused(null)}
                                        placeholder="Enter 6-digit code"
                                        required
                                        maxLength={6}
                                        className={`w-full bg-transparent border-b-2 pl-10 py-4 text-xl font-bold outline-none transition-all duration-500 ${focused === 'code' ? (isDarkMode ? 'border-[#d4ff4a] text-white' : 'border-[#4d6106] text-black') : (isDarkMode ? 'border-white/10 text-white/20' : 'border-black/5 text-black/20')}`}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`
                                    group relative w-full flex items-center justify-center gap-4 py-6 rounded-2xl font-[1000] uppercase tracking-[0.3em] text-[11px] transition-all duration-500 overflow-hidden italic
                                    ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                                    ${isDarkMode ? 'bg-[#d4ff4a] text-black shadow-[0_20px_50px_rgba(212,255,74,0.3)] hover:shadow-[0_25px_60px_rgba(212,255,74,0.4)]' : 'bg-[#4d6106] text-white shadow-[0_20px_50px_rgba(77,97,6,0.2)] hover:shadow-[0_25px_60px_rgba(77,97,6,0.3)]'}
                                `}>
                                <span className="relative z-10 flex items-center gap-3">
                                    {isLoading ? 'Verifying...' : 'Verify Email'} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            </button>

                            <button
                                type="button"
                                onClick={() => setPendingVerification(false)}
                                className={`w-full text-center text-sm font-bold opacity-60 hover:opacity-100 transition-opacity ${isDarkMode ? 'text-white' : 'text-black'}`}
                            >
                                ← Back to sign up
                            </button>
                        </form>
                    ) : (
                        /* Form */
                        <form className="space-y-8" onSubmit={handleSubmit}>
                            {mode === 'signup' && (
                                <div className="space-y-1">
                                    <label className={`text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>Full Name</label>
                                    <div className="relative group">
                                        <User className={`absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-500 ${focused === 'name' ? (isDarkMode ? 'text-[#d4ff4a]' : 'text-[#4d6106]') : (isDarkMode ? 'text-white/20' : 'text-black/20')}`} />
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            onFocus={() => setFocused('name')}
                                            onBlur={() => setFocused(null)}
                                            placeholder="John Architect"
                                            required={mode === 'signup'}
                                            className={`w-full bg-transparent border-b-2 pl-10 py-4 text-xl font-bold outline-none transition-all duration-500 ${focused === 'name' ? (isDarkMode ? 'border-[#d4ff4a] text-white' : 'border-[#4d6106] text-black') : (isDarkMode ? 'border-white/10 text-white/20' : 'border-black/5 text-black/20')}`}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-1">
                                <label className={`text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>Email Address</label>
                                <div className="relative group">
                                    <Mail className={`absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-500 ${focused === 'email' ? (isDarkMode ? 'text-[#d4ff4a]' : 'text-[#4d6106]') : (isDarkMode ? 'text-white/20' : 'text-black/20')}`} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onFocus={() => setFocused('email')}
                                        onBlur={() => setFocused(null)}
                                        placeholder="you@example.com"
                                        required
                                        className={`w-full bg-transparent border-b-2 pl-10 py-4 text-xl font-bold outline-none transition-all duration-500 ${focused === 'email' ? (isDarkMode ? 'border-[#d4ff4a] text-white' : 'border-[#4d6106] text-black') : (isDarkMode ? 'border-white/10 text-white/20' : 'border-black/5 text-black/20')}`}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className={`text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>Password</label>
                                <div className="relative group">
                                    <Lock className={`absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-500 ${focused === 'password' ? (isDarkMode ? 'text-[#d4ff4a]' : 'text-[#4d6106]') : (isDarkMode ? 'text-white/20' : 'text-black/20')}`} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onFocus={() => setFocused('password')}
                                        onBlur={() => setFocused(null)}
                                        placeholder="••••••••"
                                        required
                                        minLength={8}
                                        className={`w-full bg-transparent border-b-2 pl-10 py-4 text-xl font-bold outline-none transition-all duration-500 ${focused === 'password' ? (isDarkMode ? 'border-[#d4ff4a] text-white' : 'border-[#4d6106] text-black') : (isDarkMode ? 'border-white/10 text-white/20' : 'border-black/5 text-black/20')}`}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`
                            group relative w-full flex items-center justify-center gap-4 py-6 rounded-2xl font-[1000] uppercase tracking-[0.3em] text-[11px] transition-all duration-500 overflow-hidden italic mb-8
                            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                            ${isDarkMode ? 'bg-[#d4ff4a] text-black shadow-[0_20px_50px_rgba(212,255,74,0.3)] hover:shadow-[0_25px_60px_rgba(212,255,74,0.4)]' : 'bg-[#4d6106] text-white shadow-[0_20px_50px_rgba(77,97,6,0.2)] hover:shadow-[0_25px_60px_rgba(77,97,6,0.3)]'}
                        `}>
                                <span className="relative z-10 flex items-center gap-3">
                                    {isLoading ? 'Processing...' : (mode === 'login' ? 'Sign In' : 'Create Account')} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            </button>

                            {/* Social Login */}
                            <div className="space-y-6 pt-4 border-t border-white/5">
                                <p className={`text-center text-[9px] font-black uppercase tracking-[0.3em] opacity-20 ${isDarkMode ? 'text-white' : 'text-black'}`}>External Nodes</p>
                                <div className="grid grid-cols-3 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => handleOAuthSignIn('oauth_github')}
                                        className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl border transition-all duration-500 font-bold text-[9px] uppercase tracking-[0.2em] ${isDarkMode ? 'bg-white/5 border-white/10 text-white/60 hover:border-[#d4ff4a] hover:text-[#d4ff4a]' : 'bg-black/5 border-black/5 text-black/60 hover:border-[#4d6106] hover:text-[#4d6106]'}`}
                                    >
                                        <Github className="w-4 h-4" /> Github
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleOAuthSignIn('oauth_google')}
                                        className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl border transition-all duration-500 font-bold text-[9px] uppercase tracking-[0.2em] ${isDarkMode ? 'bg-white/5 border-white/10 text-white/60 hover:border-[#d4ff4a] hover:text-[#d4ff4a]' : 'bg-black/5 border-black/5 text-black/60 hover:border-[#4d6106] hover:text-[#4d6106]'}`}
                                    >
                                        <Chrome className="w-4 h-4" /> Google
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleOAuthSignIn('oauth_apple')}
                                        className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl border transition-all duration-500 font-bold text-[9px] uppercase tracking-[0.2em] ${isDarkMode ? 'bg-white/5 border-white/10 text-white/60 hover:border-[#d4ff4a] hover:text-[#d4ff4a]' : 'bg-black/5 border-black/5 text-black/60 hover:border-[#4d6106] hover:text-[#4d6106]'}`}
                                    >
                                        <Apple className="w-4 h-4" /> Apple
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes shimmer {
                    0% { background-position: 100% 50%; }
                    100% { background-position: -100% 50%; }
                }
                .animate-shimmer { animation: shimmer 5s ease-in-out infinite; }
            `}</style>
        </div>
    );
};

export default LoginPopup;
