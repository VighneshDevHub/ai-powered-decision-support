'use client';

import React, { useState } from 'react';

const faqs = [
  {
    q: 'Is my data secure with Intellexa?',
    a: 'Yes. We use enterprise-grade encryption, strict privacy controls, and continuous monitoring to keep your data safe.'
  },
  {
    q: 'Can I integrate with my existing tools?',
    a: 'Absolutely. We provide APIs and native integrations for popular CRMs, data warehouses, and workflow tools.'
  },
  {
    q: 'Do you offer support for onboarding?',
    a: 'Our team provides guided onboarding, best practices, and dedicated support for PRO and ENTERPRISE plans.'
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes, all plans start with a 7-day free trial. No credit card required.'
  }
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-gray-200/60 rounded-full blur-[120px]" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-100/60 rounded-full blur-[120px]" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-700 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-gray-500" />
            FAQ
          </span>
          <h2 className="mt-6 text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
            Frequently asked questions
          </h2>
          <p className="text-gray-600 mt-3">Still have questions? Email us at support@intellexa.ai</p>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm overflow-hidden shadow-sm">
                <button
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="text-gray-900 font-semibold">{item.q}</span>
                  <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-gray-600 animate-in fade-in duration-200">
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
}
