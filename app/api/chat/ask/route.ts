import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Store from "@/models/Store";
import { decrypt } from "@/lib/encrypt";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  await connectDB();
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { storeDomain, message } = await req.json();
  if (!storeDomain || !message) return NextResponse.json({ error: "Bad request" }, { status: 400 });

  // Get store
  const store = await Store.findOne({ shopDomain: storeDomain });
  if (!store) return NextResponse.json({ error: "Store not found" }, { status: 404 });

  // decrypt token
  const accessToken = decrypt(store.encryptedToken);
  const productData = store.productData;




  // Gemini Request -----------------------------------------------------------
  const prompt = `
    You are a helpful Shopify inventory assistant. Answer the user's question based ONLY on the following JSON data.
    Do not make up information. If information isn't in the data, say so.

    Store data JSON:
    ${JSON.stringify(productData)}

    User question:
    "${message}"
  `;

  const geminiRes = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
      process.env.GEMINI_API_KEY,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  const geminiJson = await geminiRes.json();
  const reply = geminiJson.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";




  // Saving Q&A to Supabase ---------------------------------------------------
  await fetch(`${process.env.SUPABASE_URL}/rest/v1/chat_messages`, {
    method: "POST",
    headers: {
      apikey: process.env.SUPABASE_ANON_PUBLIC_KEY!,
      Authorization: `Bearer ${process.env.SUPABASE_ANON_PUBLIC_KEY!}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify([
      { user_id: user.id, store_domain: storeDomain, role: "user", message },
      { user_id: user.id, store_domain: storeDomain, role: "assistant", message: reply },
    ]),
  });

  return NextResponse.json({ reply });
}
