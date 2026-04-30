"use client";

import AdminPanel from "@/components/AdminPanel";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Basic redirect if not logged in (Firestore rules will block data access anyway)
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <div className="pt-20">
      <AdminPanel />
    </div>
  );
}
