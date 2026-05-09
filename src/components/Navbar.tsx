"use client";

import React from 'react';
import Link from "next/link";
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const isAdmin = user?.email === "zenbanez@gmail.com"; 

  const navLinks = [
    { name: 'Atelier', href: '/atelier' },
    { name: 'Resources', href: '/resources' },
    { name: 'News', href: '/news' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-[24px] border-b border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-headline text-2xl font-bold text-primary hover:text-primary-container transition-colors">
          Project AIgnite
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center font-label text-sm tracking-widest uppercase font-bold">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-secondary transition-colors text-xs">
              {link.name}
            </Link>
          ))}
          
          {isAdmin && (
            <Link href="/admin" className="hover:text-primary transition-colors text-red-600 text-xs">Admin</Link>
          )}
          
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
            <Link href="/login" className="hover:text-primary transition-colors text-xs">Login</Link>
          )}
          
          <Link href="/launch" className="bg-primary text-white px-6 py-3 rounded-xl shadow-sm hover:shadow-xl hover:translate-y-[-1px] transition-all text-[11px]">
            Get the Ebook
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-primary p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="material-symbols-outlined text-3xl">
            {isOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="md:hidden bg-surface-container-low border-b border-outline-variant/10 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col p-6 gap-6 font-label text-sm tracking-widest uppercase font-bold text-on-surface">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="hover:text-secondary transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            {isAdmin && (
              <Link 
                href="/admin" 
                onClick={() => setIsOpen(false)}
                className="hover:text-primary transition-colors text-red-600"
              >
                Admin
              </Link>
            )}

            <div className="pt-4 border-t border-outline-variant/10 flex flex-col gap-6">
              {user ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-on-surface-variant bg-surface-container px-3 py-1 rounded-full border border-outline-variant/10">
                      {user.email}
                    </span>
                    <button 
                      onClick={() => { logOut(); setIsOpen(false); }}
                      className="text-primary text-xs font-bold"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <Link 
                  href="/login" 
                  onClick={() => setIsOpen(false)}
                  className="hover:text-primary transition-colors"
                >
                  Login
                </Link>
              )}
              
              <Link 
                href="/launch" 
                onClick={() => setIsOpen(false)}
                className="bg-primary text-white px-6 py-4 rounded-xl text-center shadow-lg active:scale-95 transition-all"
              >
                Get the Ebook
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
