import { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, getDocs, doc, deleteDoc, addDoc, query, orderBy, serverTimestamp, updateDoc, limit, startAfter } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
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
  archived?: boolean;
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
  url?: string;
}

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

export default function AdminPanel() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  
  // Dashboard State
  const [news, setNews] = useState<NewsItem[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  // Pagination State
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);
  const [viewMode, setViewMode] = useState<'active' | 'archived'>('active');

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Policy');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newUrl, setNewUrl] = useState('');
  
  // Resource Form State
  const [resTitle, setResTitle] = useState('');
  const [resDesc, setResDesc] = useState('');
  const [resLink, setResLink] = useState('');
  const [resAction, setResAction] = useState('Explore →');
  const [resExternal, setResExternal] = useState(false);
  const [resBanner, setResBanner] = useState('bg-primary');
  const [resFile, setResFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [draftReply, setDraftReply] = useState<{ [key: string]: string }>({});

  const fetchData = async (isNextPage = false) => {
    try {
      if (!isNextPage) setLoading(true);
      setError(null);
      
      const newsSnap = await getDocs(collection(db, 'news'));
      setNews(newsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id } as NewsItem)));
      
      const resSnap = await getDocs(collection(db, 'resources'));
      setResources(resSnap.docs.map(doc => ({ ...doc.data(), id: doc.id } as Resource)));

      const usersSnap = await getDocs(collection(db, 'users'));
      setUsers(usersSnap.docs.map(doc => ({ ...doc.data(), id: doc.id } as User)));

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
          replies = repliesSnap.docs.map(rd => ({ ...rd.data(), id: rd.id } as Reply));
        } catch (repErr) {
          console.error(`Error fetching replies for ${inqDoc.id}:`, repErr);
        }
        return { ...data, id: inqDoc.id, replies };
      }));

      // Filter based on viewMode (Active vs Archived)
      const filteredInqs = inqsWithReplies.filter(inq => 
        viewMode === 'archived' ? inq.archived === true : !inq.archived
      );

      if (isNextPage) {
        setInquiries(prev => [...prev, ...filteredInqs]);
      } else {
        setInquiries(filteredInqs);
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
    if (!user || typeof window === "undefined") return;
    fetchData();
  }, [user, viewMode]);

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

  const handleArchiveInquiry = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'inquiries', id), { archived: !currentStatus });
      setInquiries(prev => prev.filter(inq => inq.id !== id));
    } catch (err) {
      console.error("Error archiving inquiry:", err);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm('Permanently delete this inquiry and all its history?')) return;
    try {
      await deleteDoc(doc(db, 'inquiries', id));
      setInquiries(prev => prev.filter(inq => inq.id !== id));
    } catch (err) {
      console.error("Error deleting inquiry:", err);
      alert("Failed to delete inquiry.");
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
        url: newUrl,
        date: new Date().toISOString().split('T')[0]
      });
      setNews([{ ...{ title: newTitle, category: newCategory, excerpt: newExcerpt, url: newUrl, date: new Date().toISOString().split('T')[0] }, id: docRef.id }, ...news]);
      setNewTitle('');
      setNewExcerpt('');
      setNewUrl('');
    } catch (err) {
      console.error("Error adding news:", err);
      alert("Failed to add news.");
    }
  };

  const handleAddResource = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsUploading(true);
      let fileUrl = '';
      
      if (resFile) {
        const fileRef = ref(storage, `resources/${Date.now()}_${resFile.name}`);
        const uploadResult = await uploadBytes(fileRef, resFile);
        fileUrl = await getDownloadURL(uploadResult.ref);
      }

      const resData = {
        title: resTitle,
        description: resDesc,
        link: fileUrl || resLink,
        actionText: resAction,
        isExternal: !fileUrl && resExternal,
        bannerClass: resBanner,
        fileUrl: fileUrl || undefined
      };
      
      const docRef = await addDoc(collection(db, 'resources'), resData);
      setResources([{ ...resData, id: docRef.id }, ...resources]);
      
      // Reset
      setResTitle('');
      setResDesc('');
      setResLink('');
      setResFile(null);
    } catch (err) {
      console.error("Error adding resource:", err);
      alert("Failed to add resource.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteResource = async (id: string) => {
    if (!confirm('Delete this resource?')) return;
    try {
      await deleteDoc(doc(db, 'resources', id));
      setResources(resources.filter(r => r.id !== id));
    } catch (err) {
      console.error("Error deleting resource:", err);
    }
  };

  const filteredUsers = users.filter((u) => {
    const email = u.email || "";
    return email.toLowerCase().includes(searchQuery.toLowerCase());
  });


  if (authLoading || (user && loading)) {
    return (
      <div className="p-8 text-primary animate-pulse font-bold pt-32 max-w-7xl mx-auto">
        Initializing Admin Dashboard...
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="p-8 pt-32 max-w-7xl mx-auto text-on-surface font-sans text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">Access Denied</h2>
        <p className="text-on-surface-variant mb-8">You do not have administrative privileges to access this area.</p>
        <Link href="/" className="bg-primary text-white px-6 py-3 rounded-xl shadow-sm hover:shadow-lg transition-all">
          Return to Home
        </Link>
      </div>
    );
  }

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
            <div className="flex gap-2 p-1 bg-surface-container-highest rounded-xl">
              <button 
                onClick={() => setViewMode('active')}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition ${viewMode === 'active' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:bg-surface-container'}`}
              >
                Active
              </button>
              <button 
                onClick={() => setViewMode('archived')}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition ${viewMode === 'archived' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:bg-surface-container'}`}
              >
                Archived
              </button>
            </div>
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
                      <span className="text-[10px] text-on-surface-variant/60">{inq.timestamp?.toDate().toLocaleString() || 'Just now'}</span>
                    </div>
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
                  
                  <div className="flex gap-2 mt-4 pt-4 border-t border-outline-variant/5">
                    <button 
                      onClick={() => handleArchiveInquiry(inq.id, inq.archived || false)}
                      className="text-[10px] font-bold text-primary hover:underline uppercase tracking-tighter"
                    >
                      {inq.archived ? 'Unarchive' : 'Archive'}
                    </button>
                    <button 
                      onClick={() => handleDeleteInquiry(inq.id)}
                      className="text-[10px] font-bold text-error hover:underline uppercase tracking-tighter"
                    >
                      Delete
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
              <input 
                value={newUrl} 
                onChange={e => setNewUrl(e.target.value)} 
                placeholder="Source URL (Optional)" 
                className="w-full p-3 bg-surface-container-highest border-none rounded-xl text-on-surface" 
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
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-bold text-sm text-primary truncate">{item.title}</span>
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-tighter">{item.category} • {item.date}</span>
                    {item.url && <span className="text-[9px] text-secondary truncate">{item.url}</span>}
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

        {/* Resources Management */}
        <section className="bg-surface-container-low p-6 rounded-3xl shadow-sm border border-outline-variant/10 lg:col-span-2">
          <h2 className="text-xl font-bold mb-6 text-primary">Resources Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <form onSubmit={handleAddResource} className="space-y-4">
              <input value={resTitle} onChange={e => setResTitle(e.target.value)} placeholder="Resource Title" className="w-full p-3 bg-surface-container-highest rounded-xl" required />
              <textarea value={resDesc} onChange={e => setResDesc(e.target.value)} placeholder="Description" className="w-full p-3 bg-surface-container-highest rounded-xl h-24" required />
              <div className="grid grid-cols-2 gap-4">
                <input value={resLink} onChange={e => setResLink(e.target.value)} placeholder="Link / Path" className="p-3 bg-surface-container-highest rounded-xl" required />
                <input value={resAction} onChange={e => setResAction(e.target.value)} placeholder="Action Text" className="p-3 bg-surface-container-highest rounded-xl" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <select value={resBanner} onChange={e => setResBanner(e.target.value)} className="p-3 bg-surface-container-highest rounded-xl">
                  <option value="bg-primary">Teal (Primary)</option>
                  <option value="bg-[#006064]">Dark Cyan</option>
                  <option value="bg-stone-800">Stone (Dark)</option>
                  <option value="bg-[#744f00]">Amber (Deep)</option>
                </select>
                <label className="flex items-center gap-2 text-xs font-bold text-on-surface-variant uppercase px-3">
                  <input type="checkbox" checked={resExternal} onChange={e => setResExternal(e.target.checked)} />
                  External Link?
                </label>
              </div>
              <div className="p-3 bg-surface-container-highest rounded-xl border-2 border-dashed border-outline-variant/10">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-2">Upload File (Optional)</p>
                <input 
                  type="file" 
                  onChange={e => setResFile(e.target.files?.[0] || null)}
                  className="text-xs text-on-surface w-full"
                />
              </div>
              <button 
                type="submit" 
                disabled={isUploading}
                className="w-full py-3 bg-primary text-white font-bold rounded-xl disabled:opacity-50"
              >
                {isUploading ? 'Uploading...' : 'Add Resource'}
              </button>
            </form>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {resources.map(res => (
                <div key={res.id} className="p-4 border border-outline-variant/10 rounded-xl bg-surface-container flex justify-between items-center">
                  <div>
                    <p className="font-bold text-sm text-primary">{res.title}</p>
                    <p className="text-[10px] text-on-surface-variant line-clamp-1">{res.description}</p>
                  </div>
                  <button onClick={() => handleDeleteResource(res.id)} className="text-error font-bold text-xs p-2">Delete</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
