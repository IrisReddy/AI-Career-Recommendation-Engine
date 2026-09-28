import React from 'react';
import { Briefcase, Heart, Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/80 mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 text-slate-400 text-sm">
          <Briefcase className="w-4 h-4 text-indigo-400" />
          <span>AI-Driven Career Resource & Employment Recommendation Engine</span>
        </div>

        <div className="flex items-center space-x-1 text-slate-400 text-sm">
          <span>B.Tech Final Year CS Project</span>
          <span className="text-slate-600">•</span>
          <Code2 className="w-4 h-4 text-pink-400 inline" />
        </div>

        <div className="text-xs text-slate-500">
          React + Vite + Tailwind CSS + Node.js + FastAPI
        </div>
      </div>
    </footer>
  );
}
