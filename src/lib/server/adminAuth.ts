import crypto from "crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "ahmed_omar";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "cyberx_secure_2026";
const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "cyberx_session_secret_key_8492048592_ahmed_omar_ai_2026";

export interface AdminUser {
  username: string;
  name: string;
  role: string;
  avatar: string;
  verifiedAt: string;
}

export function verifyAdminCredentials(user: string, pass: string): boolean {
  return user.trim() === ADMIN_USERNAME && pass.trim() === ADMIN_PASSWORD;
}

export function createAdminToken(username: string): string {
  const payload = {
    username,
    role: "Founder & CEO of CyberX",
    name: "Eng. Ahmed Omar",
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", ADMIN_SESSION_SECRET)
    .update(body)
    .digest("base64url");
  return `${body}.${signature}`;
}

export function verifyAdminToken(token: string): { valid: boolean; user?: AdminUser } {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return { valid: false };
    const [body, signature] = parts;

    const expectedSig = crypto
      .createHmac("sha256", ADMIN_SESSION_SECRET)
      .update(body)
      .digest("base64url");

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
      return { valid: false };
    }

    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf-8"));
    if (Date.now() > payload.exp) {
      return { valid: false };
    }

    return {
      valid: true,
      user: {
        username: payload.username,
        name: payload.name || "Eng. Ahmed Omar",
        role: payload.role || "Founder & CEO of CyberX",
        avatar: "/ahmed.jpg",
        verifiedAt: new Date().toISOString(),
      },
    };
  } catch {
    return { valid: false };
  }
}

export async function getAdminSessionFromRequest(req?: NextRequest): Promise<{ valid: boolean; user?: AdminUser }> {
  // Check authorization header first
  if (req) {
    const authHeader = req.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7).trim();
      const res = verifyAdminToken(token);
      if (res.valid) return res;
    }
  }

  // Check cookies
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("cyberx_admin_token");
    if (tokenCookie?.value) {
      return verifyAdminToken(tokenCookie.value);
    }
  } catch {
    // If outside request context or cookies() fails
  }

  return { valid: false };
}
