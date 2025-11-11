"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

export default function HistoryPage() {
  const searchParams = useSearchParams();
  const shopDomain = searchParams.get("shop");
  const { storeName } = useParams();
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/chat/history?store=${shopDomain}`);
      const data = await res.json();
      setMessages(data.messages ?? []);
    }
    load();
  }, [shopDomain]);

  return (
    <div className="p-6 max-w-3xl mx-auto flex flex-col gap-3">
      <button className="btn btn-outline mb-4 w-fit" onClick={() => history.back()}>
        ← Back
      </button>

      <h1 className="text-xl font-semibold mb-3">Chat History — {decodeURIComponent(storeName as string)}</h1>

      {messages.length === 0 && (
        <p className="text-base-content/50 italic">No messages yet.</p>
      )}

      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`chat ${msg.role === "assistant" ? "chat-start" : "chat-end"}`}
        >
          <div
            className={`chat-bubble ${
              msg.role === "assistant" ? "chat-bubble-primary" : "chat-bubble-accent"
            }`}
          >
            {msg.message}
          </div>
        </div>
      ))}
    </div>
  );
}
