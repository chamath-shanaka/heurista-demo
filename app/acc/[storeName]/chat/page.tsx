"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";

export default function ChatPage() {
  const { storeName } = useParams();
  const decodedStoreName = decodeURIComponent(storeName as string);

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", message: input };
    setMessages([...messages, newMessage]);
    setInput("");
    setIsTyping(true);

    const res = await fetch("/api/chat/ask", {
      method: "POST",
      body: JSON.stringify({
        storeName: decodedStoreName,
        message: newMessage.message,
      }),
    });

    const data = await res.json();
    setIsTyping(false);

    setMessages([...messages, newMessage, { role: "assistant", message: data.reply }]);
  };

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <button className="btn btn-outline mb-4" onClick={() => history.back()}>
        ← Back
      </button>

      <h2 className="text-xl font-bold mb-4">{decodedStoreName}</h2>

      <div className="h-[70vh] overflow-y-auto space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`chat ${msg.role === "user" ? "chat-end" : "chat-start"}`}>
            <div
              className={`chat-bubble ${
                msg.role === "user" ? "bg-green-500 text-white" : "bg-gray-200 text-black"
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="chat chat-start">
            <div className="chat-bubble bg-gray-200 animate-pulse text-black">
              Typing...
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2 mt-4">
        <input
          className="input input-bordered w-full"
          value={input}
          placeholder="Ask about products..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn btn-accent" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
