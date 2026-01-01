"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";

interface PricingTier {
  name: string;
  price: { monthly: number; annual: number };
  description: string;
  features: string[];
  buttonText: string;
  highlighted?: boolean;
}

const tiers: PricingTier[] = [
  {
    name: "Starter",
    price: { monthly: 0, annual: 0 },
    description: "Perfect for individuals exploring neural data insights.",
    features: [
      "5 Neural Queries/month",
      "Standard Data Ingestion",
      "Community Support",
      "Basic Dashboard",
    ],
    buttonText: "Start for Free",
  },
  {
    name: "Pro",
    price: { monthly: 49, annual: 39 },
    description: "Designed for high-growth teams needing real-time scale.",
    features: [
      "Unlimited Queries",
      "Predictive Scaling API",
      "Priority Neural Support",
      "Advanced Anomaly Detection",
      "Custom Visual Modules",
    ],
    buttonText: "Get Pro Access",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: { monthly: 199, annual: 169 },
    description: "Maximum power for massive-scale organizations.",
    features: [
      "Dedicated Infrastructure",
      "White-glove Deployment",
      "Unlimited Data Flow",
      "Recursive Learning Node",
      "24/7 Executive Support",
    ],
    buttonText: "Contact Sales",
  },
];

const PricingCard: React.FC<{
  tier: PricingTier;
  isAnnual: boolean;
  isDarkMode: boolean;
  delay: string;
}> = ({ tier, isAnnual, isDarkMode, delay }) => (
  <div
    className={`relative flex flex-col p-10 rounded-[2.5rem] border transition-all duration-700 animate-reveal hover:scale-[1.03] ${
      tier.highlighted
        ? isDarkMode
          ? "bg-white/5 border-[#3b82f6]/50 shadow-[0_30px_60px_rgba(59,130,246,0.1)]"
          : "bg-white border-[#2563eb]/30 shadow-[0_30px_60px_rgba(37,99,235,0.1)]"
        : isDarkMode
        ? "bg-black/40 border-white/10"
        : "bg-white border-black/[0.08] shadow-xl shadow-black/5"
    }`}
    style={{ animationDelay: delay }}
  >
    {tier.highlighted && (
      <div
        className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] italic ${
          isDarkMode
            ? "bg-[#3b82f6] text-white"
            : "bg-[#2563eb] text-white animate-pulse"
        }`}
      >
        Most Popular
      </div>
    )}

    <div className="mb-10">
      <h3
        className={`text-xl font-black uppercase tracking-widest mb-4 ${
          isDarkMode ? "text-white/60" : "text-black/40"
        }`}
      >
        {tier.name}
      </h3>
      <div className="flex items-baseline gap-2">
        <span
          className={`text-6xl font-black tracking-tighter ${
            isDarkMode ? "text-white" : "text-gray-950"
          }`}
        >
          ${isAnnual ? tier.price.annual : tier.price.monthly}
        </span>
        <span
          className={`text-lg font-bold ${
            isDarkMode ? "text-white/40" : "text-black/30"
          }`}
        >
          /mo
        </span>
      </div>
      {isAnnual && tier.price.annual > 0 && (
        <div
          className={`text-[10px] font-black uppercase tracking-widest mt-2 ${
            isDarkMode ? "text-[#3b82f6]" : "text-[#2563eb]"
          }`}
        >
          Billed annually
        </div>
      )}
    </div>

    <p
      className={`text-sm font-medium leading-relaxed mb-8 ${
        isDarkMode ? "text-white/40" : "text-black/50"
      }`}
    >
      {tier.description}
    </p>

    <div className="flex-1 space-y-4 mb-10">
      {tier.features.map((feature, i) => (
        <div key={i} className="flex items-center gap-3">
          <Check
            className={`w-4 h-4 ${
              isDarkMode ? "text-[#3b82f6]" : "text-[#2563eb]"
            }`}
            strokeWidth={3}
          />
          <span
            className={`text-xs font-bold ${
              isDarkMode ? "text-white/70" : "text-gray-700"
            }`}
          >
            {feature}
          </span>
        </div>
      ))}
    </div>

    <button
      className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-500 hover:scale-[1.02] active:scale-95 ${
        tier.highlighted
          ? isDarkMode
            ? "bg-[#3b82f6] text-white shadow-[0_15px_40px_rgba(59,130,246,0.3)]"
            : "bg-[#2563eb] text-white shadow-[0_15px_40px_rgba(37,99,235,0.2)]"
          : isDarkMode
          ? "bg-white/10 text-white border border-white/10"
          : "bg-black/5 text-gray-950 border border-black/5 hover:bg-black/10"
      }`}
    >
      {tier.buttonText}
    </button>
  </div>
);

const Pricing: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section
      id="pricing"
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
              Investment Plans
            </span>
          </div>
          <h2
            className={`text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] ${
              isDarkMode ? "text-white" : "text-gray-950"
            }`}
          >
            PREDICTABLE PRICING. <br />
            <span
              className={`text-transparent bg-clip-text bg-gradient-to-r ${
                isDarkMode
                  ? "from-[#3b82f6] via-white to-[#3b82f6]"
                  : "from-[#2563eb] via-[#3b82f6] to-[#2563eb]"
              } bg-[length:200%_auto] animate-shimmer`}
            >
              UNLIMITED POTENTIAL.
            </span>
          </h2>

          {/* Pricing Toggle */}
          <div className="flex items-center justify-center gap-6 pt-10">
            <span
              className={`text-xs font-black uppercase tracking-widest ${
                !isAnnual
                  ? isDarkMode
                    ? "text-white"
                    : "text-black"
                  : "opacity-30"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-16 h-8 rounded-full border transition-all duration-500 overflow-hidden ${
                isDarkMode
                  ? "bg-white/5 border-white/10"
                  : "bg-black/5 border-black/5"
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 rounded-full transition-transform duration-500 shadow-xl ${
                  isDarkMode ? "bg-[#3b82f6]" : "bg-[#2563eb]"
                } ${isAnnual ? "translate-x-8" : "translate-x-0"}`}
              />
            </button>
            <span
              className={`text-xs font-black uppercase tracking-widest ${
                isAnnual
                  ? isDarkMode
                    ? "text-white"
                    : "text-black"
                  : "opacity-30"
              }`}
            >
              Annual
              <span
                className={`ml-2 px-2 py-0.5 rounded-full text-[8px] bg-[#3b82f6] text-white italic`}
              >
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <PricingCard
              key={i}
              tier={tier}
              isAnnual={isAnnual}
              isDarkMode={isDarkMode}
              delay={`${i * 0.1}s`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes reveal {
          0% {
            transform: translateY(50px);
            opacity: 0;
            filter: blur(10px);
          }
          100% {
            transform: translateY(0);
            opacity: 1;
            filter: blur(0);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: 100% 50%;
          }
          100% {
            background-position: -100% 50%;
          }
        }
        .animate-reveal {
          animation: reveal 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
        .animate-shimmer {
          animation: shimmer 5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Pricing;
