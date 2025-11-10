import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/lib/mongoose";
import User from "@/lib/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      await connectDB();
      await User.findOneAndUpdate(
        { userId: user.id },
        { userId: user.id, userEmail: user.email },
        { upsert: true }
      );
      return true;
    },
    async session({ session, user, token }) {
      session.user.id = token.sub; // expose userId to frontend
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
