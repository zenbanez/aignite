// src/components/CuratedNews.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
}

export default function CuratedNews() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only attempt fetch in the browser to avoid SSR/Build invalid-api-key errors
    if (typeof window === "undefined") return;

    const fetchNews = async () => {
// ...
      try {
        const q = query(collection(db, "news"), orderBy("date", "desc"), limit(3));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as NewsItem[];
        setNewsItems(data);
      } catch (error) {
        console.error("Error fetching curated news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);
  return (
    <section className="py-24 px-6 lg:px-12 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-bold text-primary mb-4">Curated Intelligence</h2>
            <p className="text-on-surface-variant text-lg">Daily briefings on AI in Philippine education.</p>
          </div>
          <Link href="/news" className="text-primary font-bold border-b-2 border-primary pb-1 hover:opacity-70 transition-all">
            View All Updates
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <article key={item.id} className="group cursor-pointer">
              <div className="bg-surface-container-low rounded-2xl p-8 h-full border border-surface-variant/20 group-hover:border-primary/30 group-hover:shadow-xl group-hover:shadow-primary/5 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-secondary font-bold text-xs uppercase tracking-widest">{item.category}</span>
                  <span className="w-1 h-1 bg-on-surface-variant/30 rounded-full"></span>
                  <span className="text-on-surface-variant text-xs font-medium">{item.date}</span>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors leading-tight">
                  {item.title}
                </h3>
                <p className="text-on-surface-variant leading-relaxed mb-8 line-clamp-3">
                  {item.excerpt}
                </p>
                <div className="mt-auto">
                  <span className="text-primary font-bold text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    Read Briefing
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </div>
            </article>
          ))}
          
          {/* Managed by Zen3 Badge */}
          <div className="bg-primary/5 border-2 border-dashed border-primary/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🌱</span>
            </div>
            <h4 className="text-primary font-bold mb-2">Automated Curation Active</h4>
            <p className="text-on-surface-variant text-sm">
              I scan for relevant updates every 24 hours. Current focus: DepEd compliance & training opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
