import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ messages: [] });

  const { searchParams } = new URL(req.url);
  const storeDomain = searchParams.get("store");

  const res = await fetch(
    // `${process.env.SUPABASE_URL}/rest/v1/chat_messages?user_id=eq.${user.id}&store_domain=eq.${storeDomain}&order=created_at.asc`,
    `${process.env.SUPABASE_URL}/rest/v1/chat_messages?user_id=eq.dummy_user&store_domain=eq.shop_url&order=created_at.asc`,
    {
      headers: {
        apikey: process.env.SUPABASE_ANON_PUBLIC_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_ANON_PUBLIC_KEY!}`,
      },
    }
  );

  const messages = await res.json();
  return NextResponse.json({ messages });
}
