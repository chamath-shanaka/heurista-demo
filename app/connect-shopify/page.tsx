"use client";

import { useState } from "react";

export default function ConnectShopify() {
  const [storeDomain, setStoreDomain] = useState("");

  const connect = () => {
    if (!storeDomain.trim()) {
      alert("Please enter your store domain.");
      return;
    }
    window.location.href = `
      https://${storeDomain}/admin/oauth/authorize?
      client_id=${process.env.NEXT_PUBLIC_SHOPIFY_API_KEY}&scope=
      read_products,read_inventory&redirect_uri=${process.env.NEXT_PUBLIC_APP_URL}/api/shopify/callback
    `;
  };

  return (
    <div className="p-8 max-w-lg mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Connect a Shopify Store</h1>

      <input
        className="input input-bordered w-full"
        placeholder="enter your shopify store url"
        value={storeDomain}
        onChange={(e) => setStoreDomain(e.target.value)}
      />

      <button className="btn btn-accent w-full" onClick={connect}>
        Connect Store
      </button>
    </div>
  );
}
