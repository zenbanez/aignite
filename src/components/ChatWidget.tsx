"use client";

import React, { useState } from 'react';
import InquiryForm from './InquiryForm';

/**
 * ChatWidget (Hybrid)
 * A floating widget that toggles the InquiryForm.
 * This is the live version for the Educator Hub.
 */

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {/* Floating Window */}
      <div className={`mb-4 w-[350px] md:w-[450px] transition-all duration-300 transform ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none'}`}>
        <div className="relative">
          {/* Close Button Overlaid on Form */}
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute -top-2 -right-2 w-8 h-8 bg-white text-gray-400 rounded-full shadow-lg border border-gray-100 flex items-center justify-center hover:text-primary z-[110] transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          {/* The Inquiry Form as the Content */}
          <div className="overflow-hidden rounded-3xl shadow-2xl">
              <InquiryForm />
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => {
          setIsOpen(!isOpen);
          setHasNotification(false);
        }}
        className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition active:scale-95 group relative"
      >
        <span className="text-2xl group-hover:hidden">💬</span>
        <span className="text-2xl hidden group-hover:block">🤖</span>
        
        {/* Unread Indicator */}
        {hasNotification && !isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-white animate-pulse"></div>
        )}
      </button>
    </div>
  );
};

export default ChatWidget;
