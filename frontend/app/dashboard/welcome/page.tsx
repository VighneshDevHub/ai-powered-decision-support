'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { 
  Rocket, 
  UploadCloud, 
  BarChart2, 
  Bot, 
  TrendingUp, 
  ShieldCheck,
  ArrowRight,
  PlayCircle
} from 'lucide-react';
import { useUser } from '@clerk/nextjs';

export default function WelcomePage() {
  const { user } = useUser();

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/20 rounded-full -ml-10 -mb-10 blur-2xl"></div>
        
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Welcome back, {user?.firstName || 'User'}! 🚀
          </h1>
          <p className="text-blue-100 text-lg md:text-xl mb-8 leading-relaxed">
            You're now in the command center of your business. Upload your data, let our AI crunch the numbers, and get actionable strategic insights in seconds.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/dashboard/upload">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 border-none px-6 py-6 text-lg shadow-lg font-semibold">
                <UploadCloud className="mr-2 w-5 h-5" /> Start Analysis
              </Button>
            </Link>
            <Link href="/dashboard/ai-assistant">
              <Button variant="outline" className="bg-blue-700/50 text-white border-blue-400 hover:bg-blue-700 hover:border-white px-6 py-6 text-lg backdrop-blur-sm">
                <Bot className="mr-2 w-5 h-5" /> Ask AI Assistant
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Start Guide */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <PlayCircle className="text-blue-600" /> Quick Start Guide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 border-t-4 border-t-blue-500 hover:shadow-lg transition-all">
            <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-blue-600">
              <span className="font-bold text-xl">1</span>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">Upload Data</h3>
            <p className="text-gray-500 mb-4">
              Upload your CSV or Excel files. We support sales data, customer logs, and financial reports.
            </p>
            <Link href="/dashboard/upload" className="text-blue-600 font-medium hover:underline flex items-center gap-1">
              Go to Upload <ArrowRight size={16} />
            </Link>
          </Card>

          <Card className="p-6 border-t-4 border-t-purple-500 hover:shadow-lg transition-all">
            <div className="bg-purple-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-purple-600">
              <span className="font-bold text-xl">2</span>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">Get Insights</h3>
            <p className="text-gray-500 mb-4">
              Our AI analyzes your data instantly to identify trends, risks, and growth opportunities.
            </p>
            <Link href="/dashboard" className="text-purple-600 font-medium hover:underline flex items-center gap-1">
              View Overview <ArrowRight size={16} />
            </Link>
          </Card>

          <Card className="p-6 border-t-4 border-t-green-500 hover:shadow-lg transition-all">
            <div className="bg-green-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-green-600">
              <span className="font-bold text-xl">3</span>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">Ask Questions</h3>
            <p className="text-gray-500 mb-4">
              Chat with your data using our AI Assistant. Ask "What is my churn rate?" or "Predict next month's sales".
            </p>
            <Link href="/dashboard/ai-assistant" className="text-green-600 font-medium hover:underline flex items-center gap-1">
              Start Chatting <ArrowRight size={16} />
            </Link>
          </Card>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Platform Capabilities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <BarChart2 className="text-blue-600 mt-1" size={20} />
                    <div>
                        <h4 className="font-semibold text-gray-900">Visual Analytics</h4>
                        <p className="text-sm text-gray-500">Auto-generated charts and KPIs</p>
                    </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <TrendingUp className="text-green-600 mt-1" size={20} />
                    <div>
                        <h4 className="font-semibold text-gray-900">Predictive Modeling</h4>
                        <p className="text-sm text-gray-500">Future trend forecasting</p>
                    </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Bot className="text-purple-600 mt-1" size={20} />
                    <div>
                        <h4 className="font-semibold text-gray-900">AI Consultant</h4>
                        <p className="text-sm text-gray-500">24/7 intelligent decision support</p>
                    </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <ShieldCheck className="text-orange-600 mt-1" size={20} />
                    <div>
                        <h4 className="font-semibold text-gray-900">Secure & Private</h4>
                        <p className="text-sm text-gray-500">Enterprise-grade data protection</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
                <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600">
                    <Rocket size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Pro Tip</h3>
            </div>
            <p className="text-gray-600 italic">
                "For the best results, upload clean CSV files with headers. The AI works best when it can understand your column names like 'Date', 'Revenue', and 'Customer_ID'."
            </p>
        </div>
      </div>
    </div>
  );
}
