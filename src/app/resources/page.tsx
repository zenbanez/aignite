"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

interface Resource {
  id: string;
  title: string;
  description: string;
  link: string;
  isExternal: boolean;
  actionText: string;
  bannerClass: string;
  fileUrl?: string;
}

export default function ResourcesPage() {
  const { user } = useAuth();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const snap = await getDocs(collection(db, "resources"));
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Resource));
        setResources(data);
      } catch (err) {
        console.error("Error fetching resources:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  return (
    <div className="bg-surface min-h-screen py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Premium Ebook Promo Banner */}
        <div className="mb-12 bg-gradient-to-r from-primary to-primary-container text-white rounded-2xl p-8 lg:p-12 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">New Release</span>
            <h2 className="text-3xl lg:text-4xl font-serif font-black mb-4 leading-tight">Master DepEd Order 003.</h2>
            <p className="text-white/90 text-lg font-body leading-relaxed">
              Stop guessing how to implement AI safely. Get the comprehensive, step-by-step guide written specifically for Filipino public school teachers.
            </p>
          </div>
          <Link href="/launch" className="shrink-0 bg-white text-primary px-8 py-4 rounded-xl font-bold tracking-wide uppercase text-sm shadow-md hover:shadow-xl transition-all text-center">
            Get the Ebook
          </Link>
        </div>

        <div className="flex justify-between items-center mb-12">
          <h1 className="text-5xl font-black text-primary">Resources Hub</h1>
          {loading && <div className="text-primary animate-pulse font-bold">Syncing hub...</div>}
        </div>

        {!loading && resources.length === 0 ? (
          <div className="py-24 text-center bg-surface-container-low rounded-3xl border-2 border-dashed border-outline-variant/20">
            <p className="text-on-surface-variant italic">No resources found. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((res) => (
              <div key={res.id} className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-shadow">
                {/* Small Banner Color Block */}
                <div className={`h-32 w-full ${res.bannerClass} relative flex items-center justify-center overflow-hidden`}>
                   <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-primary">{res.title}</h3>
                    {res.fileUrl && (
                      <span className="material-symbols-outlined text-primary/40 text-sm">download_for_offline</span>
                    )}
                  </div>
                  <p className="text-on-surface-variant mb-8 text-sm leading-relaxed flex-grow">{res.description}</p>
                  
                  {res.fileUrl && !user ? (
                    <Link href="/login" className="bg-surface-container-highest text-primary font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-all text-center">
                      Login to Download
                    </Link>
                  ) : (
                    <>
                      {res.isExternal ? (
                        <a href={res.link} target="_blank" rel="noopener noreferrer" className="text-primary font-bold text-sm flex items-center gap-2 hover:underline decoration-2 underline-offset-4">
                          {res.actionText}
                        </a>
                      ) : (
                        <Link href={res.link} className="text-primary font-bold text-sm flex items-center gap-2 hover:underline decoration-2 underline-offset-4">
                          {res.actionText}
                        </Link>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
