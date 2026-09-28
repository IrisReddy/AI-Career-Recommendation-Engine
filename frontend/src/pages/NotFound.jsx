import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Home as HomeIcon } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-extrabold text-white mb-2">404 - Page Not Found</h1>
      <p className="text-slate-400 max-w-md mb-8 text-sm">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-2.5 rounded-xl font-semibold text-white gradient-bg shadow-lg flex items-center space-x-2 text-sm hover:scale-105 transition-transform"
      >
        <HomeIcon className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>
    </div>
  );
}
