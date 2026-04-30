"use client";

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';

interface User {
  id: string;
  email: string;
  createdAt: string;
}

interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
}

export default function AdminPanel() {
  const { user } = useAuth();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        setError(null);
        const newsSnap = await getDocs(collection(db, 'news'));
        setNews(newsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsItem)));
        
        const usersSnap = await getDocs(collection(db, 'users'));
        setUsers(usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as User)));
      } catch (err: any) {
        console.error("Error fetching admin data:", err);
        setError(err.message || "Insufficient permissions to view admin data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const filteredUsers = users.filter(u => 
    (u.email || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user) return <div className="p-8">Please login to access the admin panel.</div>;
  if (loading) return <div className="p-8 text-primary animate-pulse font-bold">Checking credentials...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg border border-red-200 text-sm font-medium">
            ⚠️ {error}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-4">News Management</h2>
          <div className="space-y-4">
            {news.map(item => (
              <div key={item.id} className="p-4 border rounded-lg flex justify-between">
                <span>{item.title}</span>
                <button className="text-red-600">Delete</button>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-4">Registered Users</h2>
          <input 
            type="text" 
            placeholder="Search users..." 
            className="mb-4 p-2 border rounded w-full"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <table className="w-full text-left">
            <thead>
              <tr><th className="pb-2">Email</th><th className="pb-2">Created</th></tr>
            </thead>
            <tbody>
              {filteredUsers.map(u => (
                <tr key={u.id} className="border-t">
                  <td className="py-2">{u.email}</td>
                  <td className="py-2">{u.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
