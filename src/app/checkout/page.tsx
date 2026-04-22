import Link from 'next/link';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col">
      <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-sm border-b border-outline-variant/10">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-16">
          <Link href="/" className="text-2xl font-serif font-black tracking-tight text-primary">
            AIgnite
          </Link>
          <div className="flex items-center gap-2 text-stone-500 font-medium text-sm">
            <span>🔒 Secure Checkout</span>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-24 pb-16 px-6 max-w-7xl mx-auto w-full">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-black text-primary leading-tight max-w-2xl">
            Complete your order.
          </h1>
          <p className="mt-4 text-on-surface/80 text-lg font-medium max-w-xl">
            Unlock the definitive guide for integrating artificial intelligence into your pedagogical practice with confidence and ethics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm">
              <div className="flex gap-6 mb-8">
                <div className="w-32 h-44 flex-shrink-0 bg-primary-container rounded-lg" />
                <div>
                  <h2 className="text-xl font-bold text-primary mb-2">AI in the Classroom, Done Right</h2>
                  <p className="text-3xl font-black text-primary tracking-tight">$34.00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-surface-container-low rounded-xl p-8 md:p-12">
            <div className="space-y-12">
              <section className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">1</div>
                  <h2 className="text-xl font-bold text-primary font-serif">Your Information</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input className="w-full bg-surface-container-highest border-none rounded-sm px-4 py-3" placeholder="Full Name" />
                  <input className="w-full bg-surface-container-highest border-none rounded-sm px-4 py-3" placeholder="Email Address" />
                </div>
              </section>

              <button className="w-full py-4 bg-primary text-white rounded-md font-bold uppercase tracking-widest text-sm hover:bg-primary-container transition-all">
                Confirm & Download Now
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
