import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Store from "@/lib/models/Store";
import { getCurrentUser } from "@/lib/auth";
import { encrypt } from "@/lib/encrypt";

export async function GET(req: Request) {
  await connectDB();
  const user = await getCurrentUser();
  if (!user) return NextResponse.redirect("/");

  const { searchParams } = new URL(req.url);
  const shop = searchParams.get("shop");
  const code = searchParams.get("code");

  // Exchange code -> access token
  const tokenRes = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.SHOPIFY_API_KEY,
      client_secret: process.env.SHOPIFY_SECRET_KEY,
      code
    })
  });

  const { access_token } = await tokenRes.json();
  const encryptedToken = encrypt(access_token);

  // Fetch shop info
  const shopInfoRes = await fetch(
    `https://${shop}/admin/api/2025-10/shop.json`,
    { headers: { "X-Shopify-Access-Token": access_token } }
  );
  const shopInfo = await shopInfoRes.json();
  const shopName = shopInfo.shop.name;

  // Fetch products
  const productsRes = await fetch(
    `https://${shop}/admin/api/2025-10/products.json?limit=100`,
    { headers: { "X-Shopify-Access-Token": access_token } }
  );
  const productData = await productsRes.json();

  // save to MongoDB
  await Store.findOneAndUpdate(
    { shopDomain: shop },
    {
      userId: user.id,
      shopName,
      shopDomain: shop,
      encryptedToken,
      productData
    },
    { upsert: true }
  );

  return NextResponse.redirect("/acc");
}
