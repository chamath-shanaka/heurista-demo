import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Store from "@/lib/models/Store";
// import { getCurrentUser } from "@/lib/auth"; // your Google session helper

export async function GET() {
  const user = await { userId: "dummy_user" };

  await connectDB();

  if (!user) return NextResponse.json({ stores: [] });

  const stores = await Store.find({ userId: user.userId });

  return NextResponse.json({ stores });
}
