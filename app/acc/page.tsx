"use client"

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import MainUI from "./mainUI";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (!session) {
      alert("401 Unauthorized");
      router.push("/");
    }
  }, [session, router]);

  if (status === "loading") return <div className="p-8">Loading...</div>;

  if (!session) return null;

  return (
    <main>
        <div className="overlay rounded-md w-full h-full shadow-4xl">
					<MainUI />
        </div>
    </main>
  )
}