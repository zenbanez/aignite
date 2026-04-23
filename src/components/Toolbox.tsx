"use client";

import React, { useState } from 'react';
import { useMastery } from '@/context/MasteryContext';

const AI_TOOLS = [
  { id: 'chatgpt', name: 'ChatGPT', description: 'General purpose AI', url: 'https://chatgpt.com', icon: 'chat' },
  { id: 'gemini', name: 'Google Gemini', description: 'Google search integrated AI', url: 'https://gemini.google.com', icon: 'google' },
  { id: 'claude', name: 'Claude', description: 'Anthropic\'s constitutional AI', url: 'https://claude.ai', icon: 'psychology' },
  { id: 'notebooklm', name: 'NotebookLM', description: 'AI research and note-taking', url: 'https://notebooklm.google.com', icon: 'book' },
  { id: 'magicschool', name: 'MagicSchool AI', description: 'Built for teachers', url: 'https://magicschool.ai', icon: 'school' },
  { id: 'canva', name: 'Canva Magic Studio', description: 'AI design tools', url: 'https://canva.com', icon: 'palette' },
  { id: 'quillbot', name: 'Quillbot', description: 'Paraphrasing & grammar', url: 'https://quillbot.com', icon: 'history_edu' },
  { id: 'gamma', name: 'Gamma.app', description: 'AI presentations', url: 'https://gamma.app', icon: 'slideshow' }
];

export default function Toolbox() {
  const { mastery, updateTool, removeTool } = useMastery();
  const [isAdding, setIsAdding] = useState(false);

  if (!mastery) return null;

  const userToolIds = mastery.toolbox.map(t => t.id);

  return (
    <div className="w-full bg-surface-container-lowest rounded-[2rem] p-10 shadow-sm border border-stone-100">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h3 className="text-2xl font-bold text-primary font-headline">AI Toolbox</h3>
          <p className="text-on-surface-variant font-body mt-1">Keep track of your familiar tools and proficiency.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:shadow-lg transition-all"
        >
          {isAdding ? 'Close' : 'Add Tool'}
        </button>
      </div>

      {isAdding && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 animate-in fade-in slide-in-from-top-4 duration-300">
          {AI_TOOLS.filter(t => !userToolIds.includes(t.id)).map(tool => (
            <div key={tool.id} className="p-6 rounded-2xl border border-outline-variant/20 bg-surface-container-low flex flex-col justify-between hover:border-primary/20 transition-colors">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center overflow-hidden">
                    <img src={`/icons/${tool.id}.png`} alt="" className="w-full h-full object-contain p-1" />
                  </div>
                  <h4 className="font-bold text-primary">{tool.name}</h4>
                </div>
                <p className="text-xs text-on-surface-variant mt-1">{tool.description}</p>
              </div>
              <button 
                onClick={() => updateTool({ id: tool.id, name: tool.name, level: 'novice' })}
                className="mt-6 w-full py-2 bg-white text-primary rounded-lg text-[10px] font-bold uppercase border border-primary/10 hover:bg-primary hover:text-white transition-all"
              >
                Add to Toolbox
              </button>
            </div>
          ))}
          {AI_TOOLS.filter(t => !userToolIds.includes(t.id)).length === 0 && (
            <p className="col-span-full text-center text-on-surface-variant italic py-8">You've added all available tools!</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mastery.toolbox.length === 0 && !isAdding && (
          <div className="col-span-full py-12 flex flex-col items-center justify-center opacity-40">
            <span className="material-symbols-outlined text-4xl mb-2">construction</span>
            <p className="font-body italic text-sm">Your toolbox is currently empty.</p>
          </div>
        )}
        
        {mastery.toolbox.map(tool => {
          const toolConfig = AI_TOOLS.find(t => t.id === tool.id);
          return (
            <div key={tool.id} className="bg-surface p-6 rounded-2xl border border-stone-100 flex items-center justify-between group hover:shadow-md transition-all">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center shrink-0 overflow-hidden">
                  <img src={`/icons/${tool.id}.png`} alt="" className="w-full h-full object-contain p-2" />
                </div>
                <div className="flex flex-col">
                  <a 
                    href={toolConfig?.url || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-bold text-primary text-lg hover:underline flex items-center gap-2"
                  >
                    {tool.name}
                    <span className="material-symbols-outlined text-xs opacity-0 group-hover:opacity-100 transition-opacity">open_in_new</span>
                  </a>
                  <div className="flex gap-2 mt-2">
                    {(['novice', 'practitioner', 'expert'] as const).map(lvl => (
                      <button
                        key={lvl}
                        onClick={() => updateTool({ ...tool, level: lvl })}
                        className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter transition-all ${
                            tool.level === lvl 
                            ? 'bg-secondary text-on-secondary-fixed shadow-sm' 
                            : 'bg-surface-container text-on-surface-variant opacity-50 hover:opacity-100'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => removeTool(tool.id)}
                className="text-on-surface-variant opacity-0 group-hover:opacity-40 hover:!opacity-100 transition-opacity p-2"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
