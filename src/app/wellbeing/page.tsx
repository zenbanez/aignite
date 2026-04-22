import React from 'react';
import Head from 'next/head';
import Link from "next/link";

export default function WellbeingPage() {
  return (
    <div className="bg-[#f9f9f8] text-[#1a1c1c] min-h-screen">
      <Head>
        <title>Teacher Wellbeing | AIgnite</title>
      </Head>
      
      <main className="pt-24 pb-20 max-w-7xl mx-auto px-6">
        <header className="mb-16">
          <span className="text-[#744f00] font-semibold tracking-widest text-xs uppercase mb-4 block">Teacher Sanctuary</span>
          <h1 className="text-5xl font-black text-[#00464a] leading-tight mb-6">Nurturing the <br/> <span className="italic font-light">Nurturers.</span></h1>
          <p className="text-lg text-[#3f4949] max-w-md leading-relaxed">
            Your wellbeing is the foundation of your classroom. Take a moment to breathe, reflect, and recharge in our dedicated educator's atelier.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-20">
          <div className="md:col-span-8 bg-white rounded-[24px] p-10 relative overflow-hidden flex flex-col justify-center border-l-4 border-[#563a00] shadow-sm">
            <h3 className="text-2xl font-bold text-[#00464a] mb-4">The Insight Module</h3>
            <p className="text-3xl text-[#1a1c1c] italic font-light mb-8 max-w-2xl">
              "The most important work you will ever do will be within the walls of your own home, and the sanctuary of your own mind."
            </p>
          </div>

          <div className="md:col-span-4 bg-[#00464a] text-white rounded-[24px] p-10 flex flex-col justify-between">
            <h3 className="text-2xl font-bold mb-4">Educator Forum</h3>
            <p className="text-white/80 mb-6">Connect with a community that understands the unique rhythms of the school year.</p>
            <Link href="/" className="bg-white/20 px-6 py-3 rounded-xl font-bold inline-block">Join the Circle</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
