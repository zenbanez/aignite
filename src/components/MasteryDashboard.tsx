"use client";

import React from 'react';
import { useMastery } from '@/context/MasteryContext';

export default function MasteryDashboard() {
  const { mastery, loading } = useMastery();

  if (loading || !mastery) return null;

  const getRank = (lvl: number) => {
    if (lvl < 25) return "Novice";
    if (lvl < 50) return "Apprentice";
    if (lvl < 75) return "Practitioner";
    return "Master";
  };

  return (
    <div className="w-full bg-primary text-white rounded-[2rem] p-8 md:p-12 shadow-xl relative overflow-hidden">
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <span className="text-xs font-bold uppercase tracking-widest opacity-60">Professional Standing</span>
          <h2 className="text-4xl font-headline font-bold mt-2">AI Mastery: {getRank(mastery.level)}</h2>
          <div className="mt-6 h-3 w-full bg-white/10 rounded-full overflow-hidden border border-white/5">
            <div 
                className="h-full bg-secondary shadow-[0_0_15px_rgba(255,222,172,0.5)] transition-all duration-1000" 
                style={{ width: `${Math.min(mastery.level, 100)}%` }}
            ></div>
          </div>
          <p className="mt-4 text-sm opacity-80 font-body">
            Level {mastery.level} — You're {100 - (mastery.level % 100)} points away from your next milestone.
          </p>
        </div>

        <div className="grid grid-cols-3 md:col-span-2 gap-4">
          <div className="bg-white/5 rounded-2xl p-6 border border-white/5 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-headline font-bold text-secondary">{mastery.toolbox.length}</span>
            <span className="text-[10px] uppercase tracking-tighter opacity-60 mt-1 font-label">Tools</span>
          </div>
          <div className="bg-white/5 rounded-2xl p-6 border border-white/5 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-headline font-bold text-secondary">{mastery.quizScore}/12</span>
            <span className="text-[10px] uppercase tracking-tighter opacity-60 mt-1 font-label">Quiz</span>
          </div>
          <div className="bg-white/5 rounded-2xl p-6 border border-white/5 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-headline font-bold text-secondary">{mastery.libraryCount}</span>
            <span className="text-[10px] uppercase tracking-tighter opacity-60 mt-1 font-label">Library</span>
          </div>
        </div>
      </div>
      
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
    </div>
  );
}
