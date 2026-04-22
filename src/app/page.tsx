import Image from "next/image";
import Link from "next/link";

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

      {/* Featured Guides */}
      <section className="py-24 px-6 lg:px-12 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Featured Guides</h2>
            <p className="text-on-surface-variant">Curated insights for the modern scholarly practice.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <div className="md:col-span-4 lg:col-span-4 bg-surface-container-lowest rounded-xl p-8 shadow-sm hover:translate-y-[-4px] transition-transform duration-300">
              <span className="text-tertiary font-bold text-xs uppercase tracking-widest mb-4 block">Core Framework</span>
              <h3 className="text-3xl font-bold text-primary mb-6 leading-snug">AI Literacy for the Humanist Educator</h3>
              <div className="w-full h-64 bg-slate-200 rounded-xl mb-6"></div>
              <p className="text-on-surface-variant mb-6">Balance automated efficiency with personal pedagogy in this comprehensive masterclass.</p>
              <Link className="text-primary font-bold flex items-center gap-2" href="/resources">
                Learn More
              </Link>
            </div>
            <div className="md:col-span-2 lg:col-span-2 bg-primary text-white rounded-xl p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-4">Prompt Engineering for History</h3>
                <p className="opacity-80 text-sm">Design interactive simulations for the classroom.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
