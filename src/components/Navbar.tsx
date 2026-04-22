import React from 'react';
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-[20px] border-b border-outline-variant/15">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl font-bold text-primary hover:text-primary-container transition-colors">Project AIgnite</Link>
        <div className="flex gap-8 items-center font-sans text-sm tracking-wide uppercase">
          <Link href="/atelier" className="hover:text-primary transition-colors">Atelier</Link>
          <Link href="/resources" className="hover:text-primary transition-colors">Resources</Link>
          <Link href="/login" className="hover:text-primary transition-colors font-semibold">Login</Link>
          <Link href="/launch" className="bg-gradient-to-br from-primary to-primary-container text-white px-6 py-3 rounded-md shadow-sm hover:shadow-md transition-all">Get the Ebook</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
