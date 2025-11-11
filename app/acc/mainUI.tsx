"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function MainUI() {
  const [stores, setStores] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await fetch("/api/stores");
        const data = await res.json();
        setStores(data.stores);
        console.log(stores);
        
      } catch (err) {
        console.error("Error fetching stores", err);
      }
    };
    fetchStores();
  }, []);

  const filteredStores = () => stores;

  return (
    <div className="p-8 max-w-screen-2xl mx-auto">
      {/* Search + Add New Store */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <label htmlFor="search" className="text-xl p-2.5">
            🔍
          </label>
          <input
            type="text"
            placeholder="Search stores..."
            value={searchTerm}
            className="input input-bordered w-[300px]"
            id="search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          className="btn btn-accent w-48"
          onClick={() => router.push("/connect-shopify")}
        >
          ➕ Add New Store
        </button>
      </div>

      {/* Store Cards */}
      <ul>
        {filteredStores().map((store, index) => (
          <li key={index}>
            <br />
            <div className="card min-w-96 max-w-[900px] bg-base-100 border border-slate-700">
              <div className="card-body">
                <h2 className="card-title">{store.shopName}</h2>
                <div className="card-actions justify-end space-x-2">
                  <button
                    className="btn btn-outline btn-info w-28"
                    onClick={() =>
                      router.push(`/acc/${store.shopName}/chat?shop=${store.shopDomain}`)
                    }
                  >
                    Chat
                  </button>

                  <button
                    className="btn btn-outline btn-secondary w-28"
                    onClick={() =>
                      router.push(`/acc/${store.shopName}/history?shop=${store.shopDomain}`)
                    }
                  >
                    History
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Logout Button */}
      <button
        className="btn btn-outline btn-accent fixed bottom-8 right-8"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Log out
      </button>
    </div>
  );
}
