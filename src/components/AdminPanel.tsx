import { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc, addDoc, query, orderBy, serverTimestamp, updateDoc, limit, startAfter } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  zen3_category?: string;
  zen3_draft?: string;
  zen3_rank?: number;
  processed: boolean;
  timestamp: any;
  replies?: Reply[];
}

interface Reply {
  id: string;
  text: string;
  sender: 'admin' | 'ai' | 'user';
  timestamp: any;
}

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
  
  // Dashboard State
  const [news, setNews] = useState<NewsItem[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  // Pagination State
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Policy');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [draftReply, setDraftReply] = useState<{ [key: string]: string }>({});

  const fetchData = async (isNextPage = false) => {
    try {
      if (!isNextPage) setLoading(true);
      setError(null);
      
      const newsSnap = await getDocs(collection(db, 'news'));
      setNews(newsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsItem)));
      
      const usersSnap = await getDocs(collection(db, 'users'));
      setUsers(usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as User)));

      // Combined Query: Order by Rank (1-5) then by Timestamp (desc), limited to 5
      let inqQuery = query(
        collection(db, 'inquiries'), 
        orderBy('zen3_rank', 'asc'), 
        orderBy('timestamp', 'desc'), 
        limit(5)
      );

      if (isNextPage && lastVisible) {
        inqQuery = query(
          collection(db, 'inquiries'),
          orderBy('zen3_rank', 'asc'),
          orderBy('timestamp', 'desc'),
          startAfter(lastVisible),
          limit(5)
        );
      }

      const inqSnap = await getDocs(inqQuery);
      
      const inqsWithReplies = await Promise.all(inqSnap.docs.map(async (inqDoc) => {
        const data = inqDoc.data() as Inquiry;
        let replies: Reply[] = [];
        try {
          const repliesSnap = await getDocs(query(collection(db, 'inquiries', inqDoc.id, 'replies'), orderBy('timestamp', 'asc')));
          replies = repliesSnap.docs.map(rd => ({ id: rd.id, ...rd.data() } as Reply));
        } catch (repErr) {
          console.error(`Error fetching replies for ${inqDoc.id}:`, repErr);
        }
        return { id: inqDoc.id, ...data, replies };
      }));

      if (isNextPage) {
        setInquiries(prev => [...prev, ...inqsWithReplies]);
      } else {
        setInquiries(inqsWithReplies);
      }

      setLastVisible(inqSnap.docs[inqSnap.docs.length - 1]);
      setHasMore(inqSnap.docs.length === 5);

    } catch (err: any) {
      console.error("Error fetching admin data:", err);
      setError(err.message || "Insufficient permissions or index required.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const apiKey = db.app.options.apiKey;
    if (!user || typeof window === "undefined" || !apiKey || apiKey.includes("BUILD-TIME")) {
      return;
    }
    fetchData();
  }, [user]);

  const handleAdminReply = async (inquiryId: string) => {
    const text = draftReply[inquiryId];
    if (!text) return;
    try {
      const inquiryRef = doc(db, 'inquiries', inquiryId);
      const repliesRef = collection(inquiryRef, 'replies');
      
      await addDoc(repliesRef, {
        text,
        sender: 'admin',
        timestamp: serverTimestamp()
      });

      await updateDoc(inquiryRef, {
        processed: true,
        zen3_draft: null
      });

      setDraftReply(prev => ({ ...prev, [inquiryId]: '' }));
      fetchData();
    } catch (err) {
      console.error("Error sending admin reply:", err);
      alert("Failed to send reply.");
    }
  };

  const handleApproveAIDraft = async (inquiry: Inquiry) => {
    if (!inquiry.zen3_draft) return;
    try {
      const inquiryRef = doc(db, 'inquiries', inquiry.id);
      const repliesRef = collection(inquiryRef, 'replies');
      
      await addDoc(repliesRef, {
        text: inquiry.zen3_draft,
        sender: 'ai',
        timestamp: serverTimestamp()
      });

      await updateDoc(inquiryRef, {
        processed: true,
        zen3_draft: null
      });

      fetchData();
    } catch (err) {
      console.error("Error approving AI draft:", err);
    }
  };

  const handleDeleteNews = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      await deleteDoc(doc(db, 'news', id));
      setNews(news.filter(item => item.id !== id));
    } catch (err) {
      console.error("Error deleting article:", err);
      alert("Failed to delete article.");
    }
  };

  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'news'), {
        title: newTitle,
        category: newCategory,
        excerpt: newExcerpt,
        date: new Date().toISOString().split('T')[0]
      });
      setNews([{ id: docRef.id, title: newTitle, category: newCategory, excerpt: newExcerpt, date: new Date().toISOString().split('T')[0] }, ...news]);
      setNewTitle('');
      setNewExcerpt('');
    } catch (err) {
      console.error("Error adding news:", err);
      alert("Failed to add news.");
    }
  };

  const filteredUsers = users.filter(u => 
    (u.email || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user) return <div className="p-8 pt-32 max-w-7xl mx-auto text-on-surface">Please login to access the admin panel.</div>;
  if (loading) return <div className="p-8 text-primary animate-pulse font-bold pt-32 max-w-7xl mx-auto">Initializing Admin Dashboard...</div>;

  return (
    <div className="p-8 bg-surface min-h-screen pt-32">
      <div className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-on-surface">Admin Dashboard</h1>
        {error && (
          <div className="bg-error-container text-error px-4 py-2 rounded-lg border border-error/20 text-sm font-medium">
            ⚠️ {error}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Inquiries Management */}
        <section className="bg-surface-container-low p-6 rounded-3xl shadow-sm border border-outline-variant/10 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-primary flex items-center gap-2">
              <span>📩</span> Teacher Inquiries
            </h2>
            <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest bg-surface-container-highest px-3 py-1 rounded-full">
              Sorted by Priority
            </span>
          </div>
          
          <div className="space-y-6">
            {inquiries.length === 0 ? (
              <p className="text-on-surface-variant italic text-sm">No inquiries yet.</p>
            ) : (
              inquiries.map(inq => (
                <div key={inq.id} className="p-6 border border-outline-variant/10 rounded-2xl bg-surface-container">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="font-bold text-primary mr-2">{inq.name}</span>
                        <span className="text-xs text-on-surface-variant mr-3">{inq.email}</span>
                      </div>
                      {inq.zen3_rank && (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          inq.zen3_rank === 1 ? 'bg-error-container text-error ring-1 ring-error/20' :
                          inq.zen3_rank === 2 ? 'bg-warning-container text-warning' :
                          inq.zen3_rank === 3 ? 'bg-success-container text-success' :
                          'bg-surface-container-highest text-on-surface-variant/60'
                        }`}>
                          Rank {inq.zen3_rank}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-on-surface-variant/60">{inq.timestamp?.toDate().toLocaleString() || 'Just now'}</span>
                  </div>
                  <div className="bg-surface-container-highest p-4 rounded-xl text-sm text-on-surface mb-4">
                    <p className="font-bold text-[10px] uppercase text-on-surface-variant/40 mb-1">Inquiry</p>
                    {inq.message}
                  </div>
                  
                  {/* Threaded Replies */}
                  {inq.replies && inq.replies.length > 0 && (
                    <div className="space-y-3 mb-4 pl-4 border-l-2 border-outline-variant/20">
                      {inq.replies.map(reply => (
                        <div key={reply.id} className={`p-4 rounded-xl text-xs ${
                          reply.sender === 'admin' 
                            ? 'bg-primary/10 border border-primary/20 ring-2 ring-primary/5 shadow-sm' 
                            : reply.sender === 'user'
                              ? 'bg-surface-container-highest border border-outline-variant/10'
                              : 'bg-secondary/10 border border-secondary/20'
                        }`}>
                          <div className="flex justify-between items-center mb-1">
                            <span className={`font-bold uppercase ${reply.sender === 'admin' ? 'text-primary' : reply.sender === 'user' ? 'text-on-surface-variant' : 'text-secondary'}`}>
                              {reply.sender === 'admin' ? '👤 Zen (Admin)' : reply.sender === 'user' ? '👤 Teacher' : '🤖 AI Assistant'}
                            </span>
                            <span className="text-[9px] text-on-surface-variant/40">
                              {reply.timestamp?.toDate().toLocaleString()}
                            </span>
                          </div>
                          <p className="text-on-surface">{reply.text}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* AI Draft Review */}
                  {inq.zen3_draft && (
                    <div className="mt-4 p-4 bg-secondary/5 border border-secondary/20 rounded-2xl">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">🤖 AI Suggested Draft ({inq.zen3_category})</span>
                      </div>
                      <p className="text-xs text-on-surface-variant italic leading-relaxed mb-4">"{inq.zen3_draft}"</p>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleApproveAIDraft(inq)}
                          className="text-[10px] bg-secondary text-white px-3 py-1.5 rounded-lg hover:bg-secondary/90 transition shadow-sm font-bold uppercase"
                        >
                          Approve & Send
                        </button>
                        <button 
                          onClick={() => setDraftReply(prev => ({ ...prev, [inq.id]: inq.zen3_draft || '' }))}
                          className="text-[10px] border border-outline-variant/30 px-3 py-1.5 rounded-lg hover:bg-surface-container-highest transition font-bold uppercase"
                        >
                          Edit Draft
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Admin Direct Reply Input */}
                  <div className="mt-6 flex gap-2">
                    <input 
                      type="text"
                      placeholder="Type a manual response..."
                      className="flex-1 bg-surface-container-highest border-none rounded-xl px-4 py-2 text-xs text-on-surface focus:ring-2 focus:ring-primary/20 outline-none"
                      value={draftReply[inq.id] || ''}
                      onChange={e => setDraftReply(prev => ({ ...prev, [inq.id]: e.target.value }))}
                      onKeyDown={e => e.key === 'Enter' && handleAdminReply(inq.id)}
                    />
                    <button 
                      onClick={() => handleAdminReply(inq.id)}
                      className="bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-primary/90 transition shadow-sm"
                    >
                      Send Reply
                    </button>
                  </div>
                </div>
              ))
            )}
            
            {hasMore && (
              <div className="pt-4 flex justify-center">
                <button 
                  onClick={() => fetchData(true)}
                  className="px-6 py-2 bg-surface-container-highest text-primary font-bold text-xs rounded-xl hover:bg-outline-variant/20 transition uppercase tracking-widest"
                >
                  Load More Inquiries
                </button>
              </div>
            )}
          </div>
        </section>

        {/* News Management */}
        <section className="space-y-8">
          <div className="bg-surface-container-low p-6 rounded-3xl shadow-sm border border-outline-variant/10">
            <h2 className="text-xl font-bold mb-6 text-primary">Post New Briefing</h2>
            <form onSubmit={handleAddNews} className="space-y-4">
              <input 
                value={newTitle} 
                onChange={e => setNewTitle(e.target.value)} 
                placeholder="Title" 
                className="w-full p-3 bg-surface-container-highest border-none rounded-xl text-on-surface" 
                required 
              />
              <select 
                value={newCategory} 
                onChange={e => setNewCategory(e.target.value)} 
                className="w-full p-3 bg-surface-container-highest border-none rounded-xl text-on-surface"
              >
                <option>Policy</option>
                <option>Training</option>
                <option>Resources</option>
                <option>Event</option>
              </select>
              <textarea 
                value={newExcerpt} 
                onChange={e => setNewExcerpt(e.target.value)} 
                placeholder="Excerpt" 
                className="w-full p-3 bg-surface-container-highest border-none rounded-xl h-32 text-on-surface" 
                required 
              />
              <button type="submit" className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors">
                Publish to Hub
              </button>
            </form>
          </div>

          <div className="bg-surface-container-low p-6 rounded-3xl shadow-sm border border-outline-variant/10">
            <h2 className="text-xl font-bold mb-6 text-primary">Manage Feed</h2>
            <div className="space-y-3">
              {news.map(item => (
                <div key={item.id} className="p-4 border border-outline-variant/10 rounded-xl flex justify-between items-center bg-surface-container-highest text-on-surface">
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-primary">{item.title}</span>
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-tighter">{item.category} • {item.date}</span>
                  </div>
                  <button 
                    onClick={() => handleDeleteNews(item.id)}
                    className="text-error hover:bg-error/10 p-2 rounded-lg transition-colors text-xs font-bold"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* User Management */}
        <section className="bg-surface-container-low p-6 rounded-3xl shadow-sm border border-outline-variant/10 h-fit">
          <h2 className="text-xl font-bold mb-6 text-primary">Registered Teachers</h2>
          <input 
            type="text" 
            placeholder="Search by email..." 
            className="mb-6 p-3 bg-surface-container-highest border-none rounded-xl w-full text-on-surface"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="overflow-x-auto">
            <table className="w-full text-left text-on-surface">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-on-surface-variant/40 border-b border-outline-variant/10">
                  <th className="pb-4 font-bold">Email</th>
                  <th className="pb-4 font-bold text-right">Joined</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredUsers.map(u => (
                  <tr key={u.id} className="border-b border-outline-variant/10 last:border-0">
                    <td className="py-4 font-medium">{u.email}</td>
                    <td className="py-4 text-right text-on-surface-variant text-xs">{u.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
