"use client";

import React from 'react';
import Link from "next/link";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { signInWithGoogle, user } = useAuth();
  const router = useRouter();

  // If user is already logged in, send them to the atelier
  React.useEffect(() => {
    if (user) {
      router.push('/atelier');
    }
  }, [user, router]);

  const handleLogin = async () => {
    await signInWithGoogle();
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-surface overflow-x-hidden">
      <div className="w-full max-w-[1440px] min-h-screen grid grid-cols-1 md:grid-cols-12">
        {/* Left: Editorial Content Panel */}
        <section className="md:col-span-7 relative hidden md:flex flex-col justify-between p-16 bg-surface-container-low overflow-hidden">
          <div className="z-10">
            <span className="text-2xl font-headline font-bold text-primary">Project AIgnite</span>
          </div>
          <div className="relative z-10 flex flex-col gap-12 max-w-xl">
            <h1 className="text-6xl font-headline font-bold text-on-surface leading-tight tracking-tight">
              The sanctuary <br/>for <span className="italic text-primary">modern educators.</span>
            </h1>
            <div className="insight-module-accent bg-surface-container-lowest p-8 rounded-2xl shadow-[0px_20px_40px_rgba(26,28,28,0.06)] border-l-4 border-tertiary-fixed">
              <p className="font-body text-lg text-on-surface-variant leading-relaxed">
                "Education is the kindling of a flame, not the filling of a vessel. We provide the tools to keep that fire AIgnited in your digital studio."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-tertiary-fixed text-sm">psychology</span>
                </div>
                <span className="font-label font-bold text-on-surface text-sm uppercase tracking-wider">The Scholarly Mentor</span>
              </div>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-gradient-to-br from-[#00464a] to-[#006064]"></div>
        </section>

        {/* Right: Login Form Panel */}
        <section className="md:col-span-5 flex flex-col items-center justify-center p-8 md:p-24 bg-surface">
          <div className="w-full max-w-md">
            <div className="md:hidden mb-12 text-center">
              <h2 className="font-headline text-3xl font-bold text-primary">Project AIgnite</h2>
            </div>
            <div className="mb-10 text-left">
              <h2 className="font-headline text-4xl font-bold text-on-surface mb-3">Welcome back</h2>
              <p className="font-body text-on-surface-variant">Step back into your digital atelier.</p>
            </div>
            <div className="flex flex-col gap-6">
              <button 
                onClick={handleLogin}
                className="w-full py-4 bg-primary text-on-primary font-body font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-primary-container uppercase tracking-widest shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                Continue with Google
              </button>
            </div>
            <div className="mt-12 text-center">
              <p className="font-body text-sm text-on-surface-variant">
                New to Project AIgnite? 
                <Link className="text-primary font-bold hover:underline decoration-2 underline-offset-4" href="/atelier">Apply for access</Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
