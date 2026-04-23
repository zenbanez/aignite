import Image from "next/image";
import Link from "next/link";
import CuratedNews from "@/components/CuratedNews";

export default function Home() {
  return (
    <div className="bg-surface">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[716px] flex items-center px-6 lg:px-12 py-20 bg-surface">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 z-10">
            <h1 className="text-5xl lg:text-7xl font-black text-primary leading-tight mb-6">
              Master AI in<br/>
              <span className="text-secondary italic font-light">the Classroom.</span>
            </h1>
            <p className="text-lg lg:text-xl text-on-surface-variant mb-10 max-w-2xl font-sans">
              The definitive Filipino teacher's guide to navigating DepEd Order 003 s. 2026. Empower your pedagogy with assistive intelligence without losing the human touch.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/launch" className="bg-gradient-to-r from-primary to-primary-container text-white px-8 py-4 rounded-xl font-bold tracking-wide uppercase text-sm shadow-lg hover:shadow-primary/20 transition-all inline-flex items-center justify-center">
                Explore the Ebook
              </Link>
              <Link href="/atelier" className="bg-tertiary-fixed text-on-tertiary-fixed px-8 py-4 rounded-xl font-bold tracking-wide uppercase text-sm flex items-center gap-2 hover:opacity-90 transition-all">
                Enter the Atelier
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl relative z-10 transform lg:rotate-3">
              <Image src="/ebook-cover-v2.jpg" alt="AI in the Classroom, Done Right Ebook Cover" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-secondary-container/30 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </section>

      {/* Blog/News Section */}
      <CuratedNews />

      {/* Featured Offerings Section */}
      <section className="py-24 px-6 lg:px-12 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Elevate Your Practice</h2>
            <p className="text-on-surface-variant">The definitive resources for DO 003 s. 2026 compliance.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Ebook Card */}
            <div className="bg-surface-container-lowest rounded-[2rem] p-10 shadow-sm hover:translate-y-[-4px] transition-transform duration-300 border border-outline-variant/10 flex flex-col justify-between">
              <div>
                <span className="text-secondary font-bold text-xs uppercase tracking-widest mb-4 block">The Guide</span>
                <h3 className="text-3xl font-bold text-primary mb-4 leading-snug font-headline">AI in the Classroom, Done Right</h3>
                <p className="text-on-surface-variant mb-8 font-body">Master the practical, ethical, and legal frameworks of AI in Philippine education. Includes 30+ teacher-vetted prompts.</p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-2xl font-black text-primary">₱499</span>
                <Link className="bg-primary text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-primary/10" href="/launch">
                  Get the Ebook
                </Link>
              </div>
            </div>

            {/* The Mastery Workshop Card */}
            <div className="bg-primary text-white rounded-[2rem] p-10 shadow-xl flex flex-col justify-between relative overflow-hidden group">
              <div className="z-10">
                <span className="text-secondary-fixed font-bold text-xs uppercase tracking-widest mb-4 block">Institutional Training</span>
                <h3 className="text-3xl font-bold mb-4 leading-snug font-headline">3-Day AI Mastery Workshop</h3>
                <p className="opacity-80 mb-8 font-body">Bring Project AIgnite to your school. A deep-dive simulation for departments to master administrative and creative AI workflows.</p>
              </div>
              <div className="z-10 flex items-center justify-between mt-auto">
                <span className="text-lg font-medium opacity-60">F2F / Hybrid</span>
                <Link className="bg-white text-primary px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-secondary-container transition-colors" href="/contact">
                  Request Proposal
                </Link>
              </div>
              {/* Abstract decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 transition-transform group-hover:scale-110"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
