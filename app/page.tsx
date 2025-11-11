"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/acc");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4">
      <h1 className="text-3xl font-bold">Store AI</h1>
      <button
        className="btn btn-accent"
        onClick={() => signIn("google", { callbackUrl: "/acc" })}
      >
        Sign in with Google
      </button>
    </div>
  );
}
