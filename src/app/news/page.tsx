"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  url?: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only attempt fetch in the browser
    if (typeof window === "undefined") return;

    const fetchNews = async () => {
      try {
        const q = query(collection(db, "news"), orderBy("date", "desc"));
        const snap = await getDocs(q);
        setNews(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsItem)));
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 min-h-screen pt-32">
      <h1 className="text-4xl font-bold text-primary mb-12">All Briefings</h1>
      {loading ? (
        <div className="text-center py-20 animate-pulse text-primary font-bold">Loading archive...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.length === 0 ? (
            <div className="md:col-span-2 lg:col-span-3 text-center py-20 bg-surface-container-low rounded-3xl border-2 border-dashed border-outline-variant/20 text-on-surface-variant italic">
              The archive is currently empty.
            </div>
          ) : (
            news.map((item) => (
              <div key={item.id} className="bg-surface-container-low rounded-2xl p-8 border border-surface-variant/20 shadow-sm flex flex-col">
                <div className="text-xs text-secondary font-bold uppercase tracking-widest mb-4">{item.category} • {item.date}</div>
                <h2 className="text-2xl font-bold text-primary mb-4 leading-tight">{item.title}</h2>
                <p className="text-on-surface-variant mb-8 flex-grow">{item.excerpt}</p>
                <div className="flex justify-between items-center">
                  <Link href="/" className="text-primary font-bold text-sm hover:underline">← Back Home</Link>
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-secondary font-bold text-sm hover:underline">Read More →</a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
