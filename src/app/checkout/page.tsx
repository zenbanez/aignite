'use client';

import Link from 'next/link';
import { useState } from 'react';

type PaymentMethod = 'gotyme' | 'bpi';

export default function CheckoutPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedQr, setSelectedQr] = useState<PaymentMethod>('gotyme');
  const [copied, setCopied] = useState(false);

  const emailAddress = 'zenbanez@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const qrOptions: { id: PaymentMethod; label: string; color: string; logo: string; imagePath: string }[] = [
    {
      id: 'gotyme',
      label: 'GoTyme Bank',
      color: '#00a859',
      logo: 'GT',
      imagePath: '/qr-gotyme.png',
    },
    {
      id: 'bpi',
      label: 'BPI',
      color: '#cc0000',
      logo: 'BPI',
      imagePath: '/qr-bpi.png',
    },
  ];

  return (
    <div className="min-h-screen text-on-surface flex flex-col" style={{ background: '#f9f9f8' }}>
      {/* Header */}
      <header
        className="fixed top-0 w-full z-50 shadow-sm"
        style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(20px)' }}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-16">
          <Link href="/" className="text-2xl font-serif font-black tracking-tight" style={{ color: '#00464a' }}>
            AIgnite
          </Link>
          <div className="flex items-center gap-2 text-sm font-medium" style={{ color: '#607d8b' }}>
            <span>🔒</span>
            <span>Secure Checkout</span>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-28 pb-20 px-6 max-w-7xl mx-auto w-full">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-black leading-tight max-w-2xl" style={{ color: '#00464a' }}>
            Complete your order.
          </h1>
          <p className="mt-4 text-lg font-medium max-w-xl" style={{ color: 'rgba(26,28,28,0.7)' }}>
            Choose how you&apos;d like to purchase your copy of the guide.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left — Order Summary */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl p-8 shadow-sm sticky top-24" style={{ background: '#ffffff' }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: 'rgba(26,28,28,0.4)' }}>
                Order Summary
              </p>
              <div className="flex gap-5 mb-8">
                <div className="w-28 h-40 flex-shrink-0 rounded-xl overflow-hidden shadow-md" style={{ background: '#e0f2f1' }}>
                  <img
                    src="/ebook-cover-v2.jpg"
                    alt="AI in the Classroom, Done Right eBook Cover"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center gap-2">
                  <h2 className="text-base font-bold leading-snug" style={{ color: '#00464a' }}>
                    AI in the Classroom, Done Right
                  </h2>
                  <div className="flex items-baseline gap-2 mt-1">
                    <p className="text-2xl font-black tracking-tight" style={{ color: '#00464a' }}>₱299.00</p>
                    <p className="text-sm line-through" style={{ color: 'rgba(26,28,28,0.35)' }}>₱499.00</p>
                  </div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider inline-block px-2 py-1 rounded-md w-fit"
                    style={{ background: 'rgba(0,70,74,0.08)', color: '#006064' }}
                  >
                    Introductory Offer
                  </span>
                </div>
              </div>

              {/* Delivery note */}
              <div
                className="rounded-xl p-4 text-sm leading-relaxed"
                style={{ background: '#fff8eb', borderLeft: '4px solid #ffb74d' }}
              >
                <p className="font-bold mb-1" style={{ color: '#7c4d0a' }}>📧 Digital Delivery</p>
                <p style={{ color: '#7c4d0a' }}>
                  After payment is verified, I will personally send your eBook to your email address within <strong>24 hours</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Right — Payment Options */}
          <div className="lg:col-span-8 space-y-6">

            {/* === OPTION A: Pay via this website === */}
            <div className="rounded-2xl overflow-hidden shadow-sm" style={{ background: '#ffffff' }}>
              {/* Header bar */}
              <div className="px-8 py-5 flex items-center gap-4" style={{ background: 'linear-gradient(135deg, #00464a, #006064)' }}>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.2)', color: '#ffffff' }}
                >
                  A
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Pay via QR Code</h2>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    Bank transfer · I&apos;ll email your copy manually with a personal thank you
                  </p>
                </div>
              </div>

              <div className="px-8 py-8 space-y-8">
                {/* Step 1 — Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: '#00464a', color: '#ffffff' }}
                    >
                      1
                    </div>
                    <h3 className="font-bold" style={{ color: '#00464a' }}>Your Details</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-10">
                    <input
                      className="w-full rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                      style={{ background: '#f4f4f3', border: 'none', color: '#1a1c1c' }}
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      className="w-full rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                      style={{ background: '#f4f4f3', border: 'none', color: '#1a1c1c' }}
                      placeholder="Email Address (for delivery)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Step 2 — Choose QR */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: '#00464a', color: '#ffffff' }}
                    >
                      2
                    </div>
                    <h3 className="font-bold" style={{ color: '#00464a' }}>Choose Your Payment Channel</h3>
                  </div>
                  <div className="pl-10 grid grid-cols-2 gap-4">
                    {qrOptions.map((opt) => {
                      const isActive = selectedQr === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => setSelectedQr(opt.id)}
                          className="flex items-center gap-3 p-4 rounded-xl font-medium text-sm transition-all"
                          style={{
                            background: isActive ? 'rgba(0,70,74,0.07)' : '#f9f9f8',
                            border: `2px solid ${isActive ? '#00464a' : 'transparent'}`,
                            color: '#1a1c1c',
                          }}
                        >
                          <span
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                            style={{ background: opt.color }}
                          >
                            {opt.logo}
                          </span>
                          <span className="font-bold">{opt.label}</span>
                          {isActive && (
                            <span className="ml-auto" style={{ color: '#00464a' }}>✓</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3 — QR Display */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: '#00464a', color: '#ffffff' }}
                    >
                      3
                    </div>
                    <h3 className="font-bold" style={{ color: '#00464a' }}>Scan & Pay ₱299.00</h3>
                  </div>

                  <div className="pl-10">
                    {qrOptions.map((opt) =>
                      selectedQr === opt.id ? (
                        <div key={opt.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                          {/* QR image — swap src once you have the files */}
                          <div
                            className="w-52 h-52 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden shadow-md"
                            style={{ background: '#f4f4f3', border: '1px solid rgba(190,200,201,0.15)' }}
                          >
                            <img
                              src={opt.imagePath}
                              alt={`${opt.label} QR Code`}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                // Graceful placeholder while QR images are pending
                                (e.target as HTMLImageElement).style.display = 'none';
                                const parent = (e.target as HTMLImageElement).parentElement;
                                if (parent && !parent.querySelector('.qr-placeholder')) {
                                  const ph = document.createElement('div');
                                  ph.className = 'qr-placeholder flex flex-col items-center justify-center gap-2 text-center p-4';
                                  ph.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#bec8c9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM17 17h3v3h-3zM14 20h3"/></svg><span style="font-size:11px;color:#bec8c9;font-weight:600">QR Coming Soon</span>`;
                                  parent.appendChild(ph);
                                }
                              }}
                            />
                          </div>

                          <div className="space-y-3">
                            <div>
                              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(26,28,28,0.45)' }}>
                                Account Name
                              </p>
                              <p className="font-bold text-base" style={{ color: '#1a1c1c' }}>Zen Banez</p>
                            </div>
                            <div>
                              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(26,28,28,0.45)' }}>
                                Amount
                              </p>
                              <p className="font-black text-2xl" style={{ color: '#00464a' }}>₱299.00</p>
                            </div>
                            <p className="text-xs leading-relaxed" style={{ color: 'rgba(26,28,28,0.55)' }}>
                              After paying, send your proof of payment and the email address where you&apos;d like to receive the eBook to or send us a Pulse Message:
                            </p>
                            <button
                              onClick={copyEmail}
                              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all"
                              style={{
                                background: copied ? 'rgba(0,70,74,0.1)' : '#f4f4f3',
                                color: '#00464a',
                                border: 'none',
                              }}
                            >
                              <span>📋</span>
                              <span>{copied ? 'Copied!' : emailAddress}</span>
                            </button>
                          </div>
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 px-2">
              <div className="flex-1 h-px" style={{ background: 'rgba(190,200,201,0.15)' }}></div>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(26,28,28,0.35)' }}>
                or
              </span>
              <div className="flex-1 h-px" style={{ background: 'rgba(190,200,201,0.15)' }}></div>
            </div>

            {/* === OPTION B: Buy via Gumroad === */}
            <div className="rounded-2xl overflow-hidden shadow-sm" style={{ background: '#ffffff' }}>
              <div className="px-8 py-5 flex items-center gap-4" style={{ background: '#1a1c1c' }}>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff' }}
                >
                  B
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Buy on Gumroad (₱ 499)</h2>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    Instant download · Secured by Gumroad
                  </p>
                </div>
              </div>

              <div className="px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="flex-1 space-y-2">
                  <h3 className="font-bold text-base" style={{ color: '#1a1c1c' }}>
                    Prefer a seamless, self-service checkout?
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(26,28,28,0.6)' }}>
                    Purchase directly on Gumroad using your credit/debit card or PayPal. You&apos;ll receive an <strong>instant download link</strong> upon payment — no waiting required.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    {['💳 Credit / Debit Card', '🌐 International Cards', '⚡ Instant Delivery'].map((badge) => (
                      <span
                        key={badge}
                        className="text-xs font-semibold px-3 py-1 rounded-full"
                        style={{ background: '#f4f4f3', color: '#607d8b' }}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href="https://zenbanez3.gumroad.com/l/olxtbb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all hover:opacity-90 hover:scale-105 active:scale-100"
                  style={{
                    background: 'linear-gradient(135deg, #00464a, #006064)',
                    color: '#ffffff',
                    textDecoration: 'none',
                    boxShadow: '0 8px 24px rgba(0,70,74,0.25)',
                  }}
                >
                  <span>Buy on Gumroad</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* Trust footer */}
            <p className="text-center text-xs pb-2" style={{ color: 'rgba(26,28,28,0.4)' }}>
              Questions? Reach me at{' '}
              <a href="mailto:zenbanez3@gmail.com" className="underline" style={{ color: '#00464a' }}>
                zenbanez@gmail.com
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
