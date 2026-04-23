"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useMastery } from '@/context/MasteryContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Link from 'next/link';

type TransformationType = 'assistive' | 'administrative' | 'creative';

export default function PromptLab() {
  const { user } = useAuth();
  const { refreshLibraryCount } = useMastery();
  const [objective, setObjective] = useState('');
  const [type, setType] = useState<TransformationType>('assistive');
  const [result, setResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  if (!user) {
    return (
      <div className="w-full bg-surface-container-low rounded-[2rem] p-12 shadow-sm border border-stone-100 mt-12 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-4xl text-primary opacity-40">lock</span>
        </div>
        <h2 className="text-3xl font-bold text-primary mb-4 font-headline">Prompt Lab is Locked</h2>
        <p className="text-on-surface-variant font-body max-w-md mb-8">
          To build and curate your unique prompt library, you need to be part of the Atelier.
        </p>
        <Link href="/login" className="bg-primary text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:shadow-lg transition-all">
          LOG IN TO UNLOCK
        </Link>
      </div>
    );
  }

  const handleGenerate = () => {
    if (!objective) return;
    setIsGenerating(true);
    
    // Simulating transformation logic
    setTimeout(() => {
      let prompt = "";
      if (type === 'assistive') {
        prompt = `Act as a teaching assistant. Based on the objective "${objective}", create a scaffolded activity for students that follows DepEd Order 003 s. 2026. Ensure the AI acts as a mentor, not an answer-generator.`;
      } else if (type === 'administrative') {
        prompt = `Create a grading rubric and a feedback template for the following topic: "${objective}". Focus on qualitative growth and human-centered evaluation as per DepEd guidelines.`;
      } else {
        prompt = `Design a creative, AI-enhanced classroom simulation for "${objective}". Incorporate interactive elements where students use AI to brainstorm while the teacher facilitates the critical thinking process.`;
      }
      setResult(prompt);
      setIsGenerating(false);
    }, 1000);
  };

  const handleSave = async () => {
    if (!user || !result || isSaving) return;
    setIsSaving(true);
    try {
      await addDoc(collection(db, 'prompts'), {
        userId: user.uid,
        objective,
        type,
        prompt: result,
        createdAt: serverTimestamp()
      });
      await refreshLibraryCount();
      alert("Prompt saved to your library!");
    } catch (error) {
      console.error("Error saving prompt:", error);
      alert("Failed to save prompt.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full bg-surface-container-lowest rounded-[2rem] p-8 md:p-12 shadow-sm border border-stone-100 mt-12">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex-1 space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-2 font-headline">Prompt Lab</h2>
            <p className="text-on-surface-variant font-body">Refine your intent into a scholarly prompt.</p>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-bold text-primary uppercase tracking-widest font-label">
              Lesson Objective or Topic
            </label>
            <textarea
              className="w-full h-32 p-4 rounded-xl border border-outline-variant/30 bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-body"
              placeholder="e.g., Understanding the causes of the Philippine Revolution..."
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-bold text-primary uppercase tracking-widest font-label">
              Transformation Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['assistive', 'administrative', 'creative'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`py-3 px-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${
                    type === t 
                    ? 'bg-primary text-white border-primary shadow-md' 
                    : 'bg-surface text-on-surface-variant border-outline-variant/30 hover:bg-surface-container'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!objective || isGenerating}
            className="w-full bg-secondary-fixed text-on-secondary-fixed py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:opacity-90 transition-all disabled:opacity-50 active:scale-95 shadow-lg shadow-secondary/10"
          >
            {isGenerating ? 'Refining Intent...' : 'Generate Scholarly Prompt'}
          </button>
        </div>

        <div className="flex-1 flex flex-col bg-surface-container-low rounded-2xl p-8 border border-outline-variant/10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-primary uppercase tracking-widest text-xs font-label">The Refined Output</h3>
            {result && (
               <button className="text-primary text-xs font-bold hover:underline">COPY</button>
            )}
          </div>
          
          <div className="flex-1 flex flex-col">
            {result ? (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl border border-primary/5 text-on-surface leading-relaxed font-body italic shadow-inner whitespace-pre-wrap">
                  {result}
                </div>
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full border-2 border-primary text-primary py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save to My Library'}
                </button>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
                <span className="material-symbols-outlined text-4xl mb-4">auto_awesome</span>
                <p className="text-sm font-body">Input your objective and choose a transformation to see the magic.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
