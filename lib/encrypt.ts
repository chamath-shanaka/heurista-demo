import crypto from "crypto";

const ALGO = "aes-256-cbc";
const KEY = Buffer.from(process.env.ENCRYPTION_SECRET!, "hex"); // 32 bytes hex
const IV = Buffer.alloc(16, 0);

export function encrypt(text: string) {
  const cipher = crypto.createCipheriv(ALGO, KEY, IV);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

export function decrypt(encrypted: string) {
  const decipher = crypto.createDecipheriv(ALGO, KEY, IV);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
