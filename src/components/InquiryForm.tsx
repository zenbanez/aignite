"use client";

import { useState, useEffect, useRef } from 'react';
import { collection, addDoc, serverTimestamp, doc, onSnapshot, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '../context/AuthContext';

/**
 * ThreadHistory Component
 * Renders the sequence of messages in an inquiry.
 */
const ThreadHistory: React.FC<{ inquiryId: string }> = ({ inquiryId }) => {
  const [replies, setReplies] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query(collection(db, 'inquiries', inquiryId, 'replies'), orderBy('timestamp', 'asc'));
    const unsub = onSnapshot(q, (snap) => {
      setReplies(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [inquiryId]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [replies]);

  return (
    <div ref={scrollRef} className="space-y-4">
      {replies.map((reply) => (
        <div key={reply.id} className={`flex ${reply.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`p-4 rounded-2xl text-sm max-w-[85%] shadow-sm ${
            reply.sender === 'user' 
              ? 'bg-primary text-white rounded-tr-none' 
              : reply.sender === 'admin'
                ? 'bg-primary/10 border border-primary/20 text-on-surface rounded-tl-none ring-2 ring-primary/5 shadow-md'
                : 'bg-secondary/10 border border-secondary/20 text-on-surface rounded-tl-none'
          }`}>
            <p className="font-bold text-[10px] uppercase mb-1 opacity-70">
              {reply.sender === 'user' ? 'You' : reply.sender === 'admin' ? '👤 Zen (Admin)' : '🤖 AI Assistant'}
            </p>
            <p className="leading-relaxed">{reply.text}</p>
            <p className="text-[9px] opacity-40 mt-1 text-right">
              {reply.timestamp?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

/**
 * InquiryForm
 * A "Live-Drop" intermediary messaging system.
 */
export default function InquiryForm({ onSuccess }: { onSuccess?: () => void }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'General Inquiry',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'waiting' | 'reviewing' | 'responded' | 'error'>('idle');
  const [inquiryId, setInquiryId] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes in seconds

  // Persistence: Restore session for guests
  useEffect(() => {
    if (!user) {
      const savedId = localStorage.getItem('active-pulse-id');
      if (savedId) {
        setInquiryId(savedId);
        setStatus('waiting');
      }
    }
  }, [user]);

  // Handle Countdown Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === 'waiting' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [status, timeLeft]);

  // Handle Firestore Listener for Status Updates
  useEffect(() => {
    if (!inquiryId) return;

    const unsubDoc = onSnapshot(doc(db, 'inquiries', inquiryId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        
        // Hydrate form data if missing (e.g. on refresh)
        if (!formData.name && data.name) {
          setFormData(prev => ({ ...prev, name: data.name, email: data.email, topic: data.topic }));
        }

        if (data.processed && data.zen3_draft) {
           setStatus('reviewing');
        }
        else if (data.processed && !data.zen3_draft) {
           setStatus('responded');
        }
      } else {
        localStorage.removeItem('active-pulse-id');
        setInquiryId(null);
        setStatus('idle');
      }
    });

    const unsubReplies = onSnapshot(
      query(collection(db, 'inquiries', inquiryId, 'replies'), orderBy('timestamp', 'asc')),
      (snap) => {
        if (!snap.empty) {
            setStatus('responded');
        }
      }
    );

    return () => {
        unsubDoc();
        unsubReplies();
    };
  }, [inquiryId]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const inquiryData = {
        ...formData,
        userId: user?.uid || null,
        timestamp: serverTimestamp(),
        processed: false,
        source: 'educator-hub-v2'
      };
      
      const docRef = await addDoc(collection(db, 'inquiries'), inquiryData);
      setInquiryId(docRef.id);
      
      if (!user) {
        localStorage.setItem('active-pulse-id', docRef.id);
      }

      setStatus('waiting');
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Inquiry error:', error);
      setStatus('error');
    }
  };

  // --- THREADED VIEW ---
  if (status === 'waiting' || status === 'responded' || status === 'reviewing') {
    return (
      <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-2xl max-w-xl mx-auto flex flex-col h-[500px] animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between border-b border-gray-50 pb-4 mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">AI</div>
            <div>
              <h4 className="font-bold text-sm text-on-surface leading-none">AI Learning Assistant</h4>
              <span className="text-[10px] text-gray-400 uppercase tracking-tighter">Live Pulse • {formData.topic}</span>
            </div>
          </div>
          <div className="bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
            <span className="text-xs font-mono font-bold text-primary">
              {status === 'reviewing' ? 'Expert Review' : timeLeft > 0 ? formatTime(timeLeft) : 'Syncing'}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-gray-200 flex flex-col">
          {!user && (
            <div className="bg-orange-50 border border-orange-100 p-3 rounded-xl text-[10px] text-orange-700 flex items-start gap-2 mb-2">
              <span className="material-symbols-outlined text-[14px] mt-0.5">info</span>
              <p>You're chatting as a guest. Your conversation is active for this session only. <strong>Sign in to save your thread.</strong></p>
            </div>
          )}
          <div className="flex justify-end">
            <div className="bg-primary text-white p-4 rounded-2xl rounded-tr-none text-sm max-w-[85%] shadow-sm">
              <p className="font-bold text-[10px] uppercase text-white/70 mb-1">You</p>
              {formData.message}
            </div>
          </div>

          <ThreadHistory inquiryId={inquiryId!} />

          {status === 'waiting' && (
            <div className="flex justify-start">
              <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl rounded-tl-none text-sm max-w-[85%] shadow-sm">
                <p className="font-bold text-[10px] uppercase text-gray-400 mb-2">AI Processing</p>
                <div className="flex items-center space-x-2 text-gray-500 italic text-xs">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-gray-300 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                  <span>{timeLeft > 0 ? 'Checking DepEd 003 guidelines...' : 'Finalizing response...'}</span>
                </div>
              </div>
            </div>
          )}

          {status === 'reviewing' && (
            <div className="flex justify-start">
              <div className="bg-primary/5 border border-primary/20 p-4 rounded-2xl rounded-tl-none text-sm max-w-[85%] shadow-sm">
                <p className="font-bold text-[10px] uppercase text-primary mb-2">Status: High Priority</p>
                <div className="flex items-center space-x-2 text-primary/70 italic text-xs">
                  <span className="material-symbols-outlined text-[14px]">verified_user</span>
                  <span>Flagged for Zen's review. Estimated wait: 24h.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
            <input 
              type="text" 
              placeholder="Type to sync..."
              className="flex-1 bg-surface-container-highest border-none rounded-xl px-4 py-2 text-sm text-on-surface focus:ring-2 focus:ring-primary/20 outline-none"
              onKeyDown={async (e) => {
                if (e.key === 'Enter') {
                  const target = e.target as HTMLInputElement;
                  const val = target.value.trim();
                  if (val && inquiryId) {
                    await updateDoc(doc(db, 'inquiries', inquiryId), { processed: false, zen3_draft: null });
                    await addDoc(collection(db, 'inquiries', inquiryId, 'replies'), {
                        text: val,
                        sender: 'user',
                        timestamp: serverTimestamp()
                    });
                    setTimeLeft(300);
                    setStatus('waiting');
                    target.value = '';
                  }
                }
              }}
            />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-low p-8 rounded-3xl shadow-sm border border-outline-variant/10 max-w-xl mx-auto">
      <h3 className="text-2xl font-bold mb-2 text-on-surface">Leave a Note</h3>
      <p className="text-on-surface-variant mb-8 text-sm">No bot, no waiting—just a direct line to our next sync cycle.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            required placeholder="Name"
            className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 outline-none"
            value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
          />
          <input 
            type="email" required placeholder="Email"
            className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 outline-none"
            value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <select 
          className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 outline-none appearance-none"
          value={formData.topic} onChange={e => setFormData({...formData, topic: e.target.value})}
        >
          <option>General Inquiry</option>
          <option>eBook Purchase Support</option>
          <option>Workshop Booking</option>
          <option>Partnership Proposal</option>
        </select>
        <textarea 
          required rows={4} placeholder="How can we help?"
          className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 outline-none resize-none"
          value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
        />
        <button 
          type="submit" disabled={status === 'submitting'}
          className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-primary/90 transition disabled:opacity-50"
        >
          {status === 'submitting' ? 'Syncing...' : 'Send to AI'}
        </button>
      </form>
    </div>
  );
}
