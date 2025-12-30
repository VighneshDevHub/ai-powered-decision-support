'use client';

import React from 'react';

export default function Problem() {
  return (
    <section id="problem" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-rose-100/50 rounded-full blur-[120px]" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-100/50 rounded-full blur-[120px]" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            Problem
          </span>
          <h2 className="mt-6 text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
            Manually entering your data is a hassle.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              icon: (
                <svg className="w-6 h-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-7 4h8M5 8h14M7 4h10" />
                </svg>
              ),
              title: 'Data Overload',
              desc: 'Businesses struggle to make sense of vast amounts of complex data, missing out on valuable insights that could drive growth and innovation.'
            },
            {
              icon: (
                <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3M12 19a7 7 0 100-14 7 7 0 000 14z" />
                </svg>
              ),
              title: 'Slow Decision-Making',
              desc: 'Traditional data processing methods are too slow, causing businesses to lag behind market changes and miss crucial opportunities.'
            },
            {
              icon: (
                <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.567 3-3.5S13.657 4 12 4 9 5.567 9 7.5 10.343 11 12 11zm0 2c-3.866 0-7 2.239-7 5v2h14v-2c0-2.761-3.134-5-7-5z" />
                </svg>
              ),
              title: 'Data Security Concerns',
              desc: 'With increasing cyber threats, businesses worry about the safety of their sensitive information when adopting new technologies.'
            }
          ].map((item, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border border-gray-200 bg-gray-50/70 p-6 md:p-8 hover:bg-white hover:border-blue-500/30 hover:shadow-xl transition-all"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-blue-600/5 to-violet-600/5" />
              <div className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-5 shadow-sm group-hover:border-blue-500/40">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
