// src/app/admin/page.tsx
"use client";

import dynamic from 'next/dynamic';
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Dynamically import AdminPanel with no SSR
const AdminPanel = dynamic(() => import("@/components/AdminPanel"), { 
  ssr: false,
  loading: () => <div className="p-8 text-primary animate-pulse font-bold">Initializing Admin Dashboard...</div>
});

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if we're done loading and there's no user
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return <div className="pt-20 p-8">Verifying administrator access...</div>;
  if (!user) return null; // router.push handles the redirect

  return (
    <div className="pt-20">
      <AdminPanel />
    </div>
  );
}
