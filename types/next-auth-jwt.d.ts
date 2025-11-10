import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    sub: string; // user ID passed through token
  }
}
