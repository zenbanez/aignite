"use client";

import React from 'react';
import Link from "next/link";
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const { user, logOut } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-[24px] border-b border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-headline text-2xl font-bold text-primary hover:text-primary-container transition-colors">Project AIgnite</Link>
        <div className="flex gap-8 items-center font-label text-sm tracking-widest uppercase font-bold">
          <Link href="/atelier" className="hover:text-secondary transition-colors">Atelier</Link>
          <Link href="/resources" className="hover:text-secondary transition-colors">Resources</Link>
          
          {user ? (
            <div className="flex items-center gap-6">
              <span className="text-[10px] text-on-surface-variant bg-surface-container px-3 py-1 rounded-full border border-outline-variant/10">
                {user.email?.split('@')[0]}
              </span>
              <button 
                onClick={logOut}
                className="hover:text-primary transition-colors text-xs opacity-60"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="hover:text-primary transition-colors">Login</Link>
          )}
          
          <Link href="/launch" className="bg-primary text-white px-6 py-3 rounded-xl shadow-sm hover:shadow-xl hover:translate-y-[-1px] transition-all text-[11px]">
            Get the Ebook
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
