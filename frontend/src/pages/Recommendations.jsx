import React from 'react';
import { Target } from 'lucide-react';

export default function Recommendations() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
          <Target className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Career & Employment Recommendations</h1>
          <p className="text-sm text-slate-400">Explore career predictions, skill gap recommendations, jobs, and courses</p>
        </div>
      </div>
      <div className="glass-card p-8 rounded-2xl border border-slate-800 text-center">
        <p className="text-slate-400">Recommendation modules will be integrated in Steps 12–16.</p>
      </div>
    </div>
  );
}
