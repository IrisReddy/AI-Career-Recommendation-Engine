import React from 'react';
import { LayoutDashboard } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
          <LayoutDashboard className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Personalized Dashboard</h1>
          <p className="text-sm text-slate-400">Overview of career predictions, employability scores, and activity</p>
        </div>
      </div>
      <div className="glass-card p-8 rounded-2xl border border-slate-800 text-center">
        <p className="text-slate-400">Dashboard features will be integrated in upcoming development steps.</p>
      </div>
    </div>
  );
}
