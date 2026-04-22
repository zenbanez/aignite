import React from 'react';
import Link from "next/link";

export default function LoginPage() {
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
              <div className="flex flex-col gap-2">
                <label className="font-body text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1" htmlFor="email">Email Address</label>
                <div className="relative">
                  <input className="w-full bg-surface-container-highest border-none rounded-sm p-4 text-on-surface focus:ring-2 focus:ring-primary/40 transition-all duration-200 outline-none" id="email" placeholder="educator@atelier.edu" type="email"/>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="font-body text-xs font-bold uppercase tracking-widest text-on-surface-variant" htmlFor="password">Password</label>
                  <Link className="font-body text-xs font-semibold text-primary hover:text-primary-container transition-colors" href="/forgot-password">Forgot Password?</Link>
                </div>
                <div className="relative">
                  <input className="w-full bg-surface-container-highest border-none rounded-sm p-4 text-on-surface focus:ring-2 focus:ring-primary/40 transition-all duration-200 outline-none" id="password" placeholder="••••••••" type="password"/>
                </div>
              </div>
              <Link href="/" className="bg-gradient-to-br from-[#00464a] to-[#006064] mt-4 py-4 rounded-xl text-white font-bold font-body uppercase tracking-widest shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-center inline-block" type="button">
                Enter Workspace
              </Link>
              <div className="my-6 flex items-center gap-4">
                <div className="flex-1 h-[1px] bg-outline-variant/20"></div>
                <span className="font-body text-xs font-medium text-outline uppercase tracking-widest">or</span>
                <div className="flex-1 h-[1px] bg-outline-variant/20"></div>
              </div>
              <Link href="/" className="w-full py-3 bg-surface-container-low text-on-surface font-body font-semibold rounded-xl flex items-center justify-center gap-3 hover:bg-surface-container-high transition-colors text-center inline-block">
                Continue with Institution Account
              </Link>
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
