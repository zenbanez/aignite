import Image from 'next/image';
import Link from 'next/link';

export default function LaunchPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
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

      <main className="pt-20">
        <section className="relative overflow-hidden min-h-[716px] flex items-center px-6 lg:px-12 py-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 z-10">
              <span className="bg-tertiary-fixed text-on-tertiary-fixed px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block">New Release</span>
              <h1 className="text-5xl lg:text-7xl font-serif font-black text-primary leading-tight mb-6">
                AI in the Classroom, <br />
                <span className="text-primary/70 italic font-light">Done Right.</span>
              </h1>
              <p className="text-lg lg:text-xl text-on-surface/80 mb-10 max-w-2xl font-body">
                A Filipino Teacher’s Practical Guide to navigating DepEd Order 003 s. 2026. Empower your pedagogy with assistive intelligence without losing the human touch.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/checkout" className="bg-primary text-white px-8 py-4 rounded-md font-bold tracking-wide uppercase text-sm shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
                  Get the Ebook Now
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-2xl relative z-10 transform lg:-rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image src="/ebook-cover-v2.jpg" alt="AI in the Classroom, Done Right Ebook Cover" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
