import React from 'react';
import Link from "next/link";
import Image from "next/image";

export default function AtelierPage() {
  return (
    <main className="pt-24 pb-16 px-6 max-w-6xl mx-auto min-h-screen flex flex-col items-center bg-surface">
      <section className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20 items-center w-full">
        <div className="md:col-span-7 space-y-6">
          <h1 className="text-5xl md:text-6xl font-headline font-black text-primary leading-tight">
            Welcome to your <br/><span className="italic text-secondary">Digital Atelier.</span>
          </h1>
          <p className="text-xl text-on-surface-variant font-light max-w-xl leading-relaxed font-body">
            AIgnite isn't just a tool; it's a sanctuary for your professional growth. Let's configure your workspace to support your unique teaching style.
          </p>
          <div className="flex items-center gap-4 pt-4">
            <Link href="/" className="bg-gradient-to-r from-primary to-primary-container text-white px-8 py-4 rounded-xl font-bold tracking-wider text-sm font-label hover:shadow-lg transition-all active:scale-95 text-center inline-block">
              CONTINUE JOURNEY
            </Link>
            <button className="text-primary font-bold text-sm tracking-widest px-6 py-4 hover:bg-surface-container-low rounded-xl transition-colors font-label">
              SKIP FOR NOW
            </button>
          </div>
        </div>
        <div className="md:col-span-5 relative">
          <div className="rounded-3xl overflow-hidden shadow-xl transform rotate-2 relative w-full h-[450px]">
            <Image src="/serene desk.png" alt="A serene desk setup" fill className="object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-tertiary-fixed p-6 rounded-2xl shadow-lg max-w-[240px]">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-on-tertiary-fixed text-sm">Quick Insight</span>
            </div>
            <p className="text-sm text-on-tertiary-fixed leading-relaxed font-body">Most educators start by digitizing their favorite lesson plan first.</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <div className="md:col-span-2 bg-surface-container-lowest p-10 rounded-[2rem] shadow-sm flex flex-col md:flex-row gap-8 items-center border border-stone-100">
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl font-bold text-primary font-headline">Define Your Voice</h3>
            <p className="text-on-surface-variant leading-relaxed font-body">AIgnite learns how you speak. Upload a sample of your writing or select a persona style so your AI-generated materials feel authentically yours.</p>
            <button className="mt-4 bg-surface-container-low text-primary px-6 py-3 rounded-lg font-bold text-xs tracking-widest border border-outline-variant/20 hover:bg-surface-container-high transition-colors font-label">
              SET VOICE PROFILE
            </button>
          </div>
          <div className="w-full md:w-64 aspect-square bg-surface-container rounded-2xl"></div>
        </div>

        <div className="bg-surface-container-lowest p-10 rounded-[2rem] shadow-sm border border-stone-100 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-primary font-headline">Wellness Check-in</h3>
            <p className="text-on-surface-variant leading-relaxed mt-4 font-body">Set boundaries for your digital classroom. We'll help you schedule 'Quiet Hours' where AI assists with grading while you disconnect.</p>
          </div>
          <Link className="mt-8 flex items-center gap-2 font-bold text-secondary font-label group" href="/login">
            Schedule boundaries
          </Link>
        </div>

        <div className="md:col-span-3 bg-surface-container-low p-8 rounded-[2rem] border-l-4 border-tertiary flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h4 className="font-bold text-lg text-primary mb-1 font-headline">AIgnite Pro-Tip</h4>
            <p className="text-on-surface-variant max-w-3xl italic font-light font-body">The fastest way to master your new workspace? Grab our comprehensive guide, "AI in the Classroom, Done Right." It covers everything from safe prompt-crafting to DepEd Order 003 compliance.</p>
          </div>
          <Link href="/launch" className="shrink-0 bg-primary text-white px-6 py-3 rounded-xl font-bold tracking-wider text-sm font-label hover:shadow-lg transition-all text-center">
            GET THE EBOOK
          </Link>
        </div>

        <div className="bg-primary p-10 rounded-[2rem] text-white flex flex-col justify-between relative overflow-hidden">
          <div className="z-10">
            <h3 className="text-2xl font-headline font-bold mb-4">Join the Atelier</h3>
            <p className="text-primary-fixed leading-relaxed opacity-90 font-body">Connect with 5,000+ educators sharing curated AI workflows and prompt templates.</p>
          </div>
          <button className="z-10 mt-8 bg-white text-primary px-6 py-3 rounded-xl font-bold text-xs tracking-widest self-start font-label">
            ENTER FORUM
          </button>
        </div>

        <div className="md:col-span-2 bg-surface-container-lowest p-10 rounded-[2rem] shadow-sm border border-stone-100 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl bg-surface-container h-48 md:h-full"></div>
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-primary mb-4 font-headline">Lesson Hub Sync</h3>
            <p className="text-on-surface-variant leading-relaxed font-body">Connect your Google Classroom or Canvas. AIgnite will analyze your existing syllabus to suggest AI-enhanced activities automatically.</p>
            <button className="mt-6 flex items-center gap-2 font-bold text-primary px-1 py-1 rounded-lg hover:underline decoration-tertiary decoration-2 underline-offset-4 font-label">
              Connect LMS
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
