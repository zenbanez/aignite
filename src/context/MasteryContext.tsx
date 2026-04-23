"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from './AuthContext';

interface Tool {
  id: string;
  name: string;
  level: 'novice' | 'practitioner' | 'expert';
}

interface MasteryData {
  level: number;
  toolbox: Tool[];
  quizScore: number;
  libraryCount: number;
  lastUpdated: any;
}

interface MasteryContextType {
  mastery: MasteryData | null;
  loading: boolean;
  updateTool: (tool: Tool) => Promise<void>;
  removeTool: (toolId: string) => Promise<void>;
  updateQuizScore: (score: number) => Promise<void>;
  refreshLibraryCount: () => Promise<void>;
}

const MasteryContext = createContext<MasteryContextType>({
  mastery: null,
  loading: true,
  updateTool: async () => {},
  removeTool: async () => {},
  updateQuizScore: async () => {},
  refreshLibraryCount: async () => {},
});

export const MasteryProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [mastery, setMastery] = useState<MasteryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setMastery(null);
      setLoading(false);
      return;
    }

    const docRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setMastery(docSnap.data() as MasteryData);
      } else {
        // Initialize default mastery data
        const defaultData: MasteryData = {
          level: 10,
          toolbox: [],
          quizScore: 0,
          libraryCount: 0,
          lastUpdated: new Date()
        };
        setDoc(docRef, defaultData);
        setMastery(defaultData);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const updateTool = async (tool: Tool) => {
    if (!user || !mastery) return;
    const newToolbox = [...mastery.toolbox];
    const index = newToolbox.findIndex(t => t.id === tool.id);
    
    if (index > -1) {
      newToolbox[index] = tool;
    } else {
      newToolbox.push(tool);
    }

    // Basic mastery calculation logic: each tool adds 5 points
    const newLevel = 10 + (newToolbox.length * 5) + (mastery.quizScore * 2) + (mastery.libraryCount * 1);

    await updateDoc(doc(db, 'users', user.uid), {
      toolbox: newToolbox,
      level: newLevel,
      lastUpdated: new Date()
    });
  };

  const removeTool = async (toolId: string) => {
    if (!user || !mastery) return;
    const newToolbox = mastery.toolbox.filter(t => t.id !== toolId);
    const newLevel = 10 + (newToolbox.length * 5) + (mastery.quizScore * 2) + (mastery.libraryCount * 1);

    await updateDoc(doc(db, 'users', user.uid), {
      toolbox: newToolbox,
      level: newLevel,
      lastUpdated: new Date()
    });
  };

  const updateQuizScore = async (score: number) => {
    if (!user || !mastery) return;
    
    // Only update if the new score is higher
    if (score <= mastery.quizScore) return;

    const newLevel = 10 + (mastery.toolbox.length * 5) + (score * 2) + (mastery.libraryCount * 1);

    await updateDoc(doc(db, 'users', user.uid), {
      quizScore: score,
      level: newLevel,
      lastUpdated: new Date()
    });
  };

  const refreshLibraryCount = async () => {
    if (!user || !mastery) return;
    const q = query(collection(db, 'prompts'), where('userId', '==', user.uid));
    const snapshot = await getDocs(q);
    const count = snapshot.size;
    
    const newLevel = 10 + (mastery.toolbox.length * 5) + (mastery.quizScore * 2) + (count * 1);
    
    await updateDoc(doc(db, 'users', user.uid), {
      libraryCount: count,
      level: newLevel
    });
  };

  return (
    <MasteryContext.Provider value={{ mastery, loading, updateTool, removeTool, updateQuizScore, refreshLibraryCount }}>
      {children}
    </MasteryContext.Provider>
  );
};

export const useMastery = () => useContext(MasteryContext);
