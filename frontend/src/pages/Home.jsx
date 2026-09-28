import React from 'react';
import { 
  FileSearch, 
  BrainCircuit, 
  TrendingUp, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Bot, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

export default function Home() {
  const featureCards = [
    {
      title: 'NLP Resume Parsing',
      description: 'Extract skills, experience, and education automatically from PDF & DOCX resumes using PyMuPDF and spaCy.',
      icon: FileSearch,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      title: 'Career Path Prediction',
      description: 'Machine learning algorithms evaluate your technical profile to predict optimal industry career trajectories.',
      icon: BrainCircuit,
      color: 'from-indigo-500 to-purple-500',
    },
    {
      title: 'Skill-Gap Analysis',
      description: 'Identify exact skill gaps comparing your profile against real-time market demands & job requirements.',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Smart Recommendations',
      description: 'Get tailored course recommendations, job listings, and internship opportunities prioritized for you.',
      icon: GraduationCap,
      color: 'from-pink-500 to-rose-500',
    },
    {
      title: 'Employability Score',
      description: 'Dynamic scoring index measuring your market readiness with actionable insights to boost your score.',
      icon: Award,
      color: 'from-amber-500 to-orange-500',
    },
    {
      title: 'Gemini AI Assistant',
      description: 'Interact with an intelligent career assistant powered by Google Gemini API for personalized guidance.',
      icon: Bot,
      color: 'from-emerald-500 to-teal-500',
    },
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 text-center">
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-[600px] h-[350px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-[120px] rounded-full pointer-events-none" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full glass-panel text-xs font-semibold text-indigo-300 mb-6">
            <Bot className="w-4 h-4 text-indigo-400" />
            <span>AI-Powered Career Intelligence Engine</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Accelerate Your Tech Career With <span className="gradient-text">Precision Recommendations</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Upload your resume, discover your career alignment score, uncover technical skill gaps, and get personalized course and employment recommendations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-white gradient-bg shadow-xl shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2">
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-slate-200 glass-card hover:bg-slate-800 transition-all flex items-center justify-center space-x-2">
              <span>Explore Features</span>
            </button>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Core Recommendation Engine Modules
          </h2>
          <p className="text-slate-400 mt-2 text-sm">
            Powered by NLP, Machine Learning, and Google Gemini API
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="glass-card p-6 rounded-2xl flex flex-col justify-between group">
                <div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg mb-5 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center text-xs text-indigo-400 font-semibold space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Module Configured</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
