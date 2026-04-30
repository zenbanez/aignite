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
            Unlock the full guide for Filipino K-12 educators, fully aligned with DepEd Order 003 s. 2026.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm">
              <div className="flex gap-6 mb-8">
                <div className="w-32 h-44 flex-shrink-0 bg-primary-container rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="/ebook-cover-v2.jpg" 
                    alt="AI in the Classroom, Done Right eBook Cover" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-primary mb-2">AI in the Classroom, Done Right</h2>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-black text-primary tracking-tight">₱299.00</p>
                    <p className="text-sm text-on-surface/40 line-through">₱499.00</p>
                  </div>
                  <p className="mt-2 text-xs font-bold text-secondary uppercase tracking-wider bg-secondary/10 inline-block px-2 py-1 rounded">Introductory Offer</p>
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
                  <input className="w-full bg-surface-container-highest border-none rounded-sm px-4 py-3 text-on-surface" placeholder="Full Name" />
                  <input className="w-full bg-surface-container-highest border-none rounded-sm px-4 py-3 text-on-surface" placeholder="Email Address" />
                </div>
              </section>

              <section className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">2</div>
                  <h2 className="text-xl font-bold text-primary font-serif">Payment Method</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white border-2 border-primary rounded-xl cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">GCash</div>
                      <span className="font-bold text-primary">GCash</span>
                    </div>
                    <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white border border-outline-variant/20 rounded-xl opacity-50 cursor-not-allowed">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 font-bold text-xs">Card</div>
                      <span className="font-bold text-primary">Credit / Debit Card</span>
                    </div>
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Coming Soon</span>
                  </div>
                </div>
                <p className="text-xs text-on-surface/60 italic leading-relaxed">
                  Note: Upon clicking "Confirm", you will be redirected to complete your GCash payment. Once verified, your download link and login credentials for the Educator Hub will be sent to your email.
                </p>
              </section>

              <button className="w-full py-4 bg-primary text-white rounded-md font-bold uppercase tracking-widest text-sm hover:bg-primary-container transition-all">
                Proceed to GCash Payment
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
