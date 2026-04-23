"use client";

import React, { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    message: '',
    interest: 'workshop'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        timestamp: serverTimestamp()
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface px-6">
        <div className="max-w-md w-full bg-surface-container-lowest p-12 rounded-[2rem] shadow-sm text-center border border-outline-variant/10">
          <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-6 mx-auto">
            <span className="material-symbols-outlined text-4xl text-primary">mark_email_read</span>
          </div>
          <h1 className="text-3xl font-bold text-primary mb-4 font-headline">Proposal Requested</h1>
          <p className="text-on-surface-variant font-body mb-8">
            Thank you for your interest in Project AIgnite. We've received your request and will get back to you with a formal proposal soon.
          </p>
          <a href="/" className="inline-block bg-primary text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs">
            Return Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-surface px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-primary mb-4 font-headline">Request a Proposal</h1>
          <p className="text-on-surface-variant text-lg font-body">
            Interested in bringing AI mastery to your school or department? Fill out the form below and we'll craft a custom training plan for your faculty.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-surface-container-lowest p-8 md:p-12 rounded-[2rem] shadow-sm border border-outline-variant/10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-primary font-label">Full Name</label>
              <input 
                required
                type="text" 
                className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-body"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-primary font-label">Work Email</label>
              <input 
                required
                type="email" 
                className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-body"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-primary font-label">Institution / School</label>
            <input 
              required
              type="text" 
              className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-body"
              value={formData.institution}
              onChange={(e) => setFormData({...formData, institution: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-primary font-label">How can we help?</label>
            <textarea 
              required
              rows={4}
              className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-body"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="Tell us about your department's needs..."
            />
          </div>

          <button 
            disabled={isSubmitting}
            type="submit" 
            className="w-full bg-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-lg shadow-primary/10 hover:opacity-90 transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'Sending...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  );
}
