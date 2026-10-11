import { cookies } from "next/headers";
import crypto from "node:crypto";

const COOKIE_NAME = "ess_admin_session";

function getSecret(): string {
  return process.env.ADMIN_SECRET || process.env.DATABASE_URL || "el-shadai-school-secret-key-2026";
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "ElShadai2026!";
}

export function signAdminToken(role = "admin"): string {
  const payload = JSON.stringify({
    role,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
  });
  const base64 = Buffer.from(payload).toString("base64url");
  const sig = crypto
    .createHmac("sha256", getSecret())
    .update(base64)
    .digest("base64url");
  return `${base64}.${sig}`;
}

export function verifyAdminToken(token: string | undefined): boolean {
  if (!token || !token.includes(".")) return false;
  const [base64, sig] = token.split(".");
  if (!base64 || !sig) return false;
  const expectedSig = crypto
    .createHmac("sha256", getSecret())
    .update(base64)
    .digest("base64url");
  if (sig !== expectedSig) return false;
  try {
    const payload = JSON.parse(Buffer.from(base64, "base64url").toString("utf-8"));
    return payload.exp > Date.now();
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    return verifyAdminToken(token);
  } catch {
    return false;
  }
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
