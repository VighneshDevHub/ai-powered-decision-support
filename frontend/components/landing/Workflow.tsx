'use client';

import React from 'react';

export default function Workflow() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            How it works
          </span>
          <h2 className="mt-6 text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
            Just 3 steps to get started
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-8">
            {[
              {
                title: '1. Upload Your Data',
                desc: 'Simply upload your data to our secure platform. We support various file formats to ensure seamless integration.'
              },
              {
                title: '2. Click Start',
                desc: 'Our AI processes and analyzes your data, extracting valuable insights and patterns automatically.'
              },
              {
                title: '3. Get Actionable Insights',
                desc: 'Receive clear recommendations based on the analysis. Make data-driven decisions and improve business outcomes.'
              }
            ].map((step, i) => (
              <div key={i} className="relative pl-10">
                <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-white font-bold flex items-center justify-center shadow-sm">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-r from-blue-500 to-violet-600 rounded-3xl blur opacity-15" />
            <div className="relative rounded-3xl overflow-hidden border border-gray-200 shadow-2xl bg-white">
              <div className="aspect-[16/9]">
                <div className="h-12 border-b border-gray-100 flex items-center px-4 gap-2 bg-gray-50">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
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
}

