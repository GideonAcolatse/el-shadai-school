"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Loader2,
  AlertCircle,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Invalid password");
      }
      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Unable to sign in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#071636] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Subtle Ambient Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url(/images/school/DSC_0064.jpg)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#071636]/90 via-[#071636]/95 to-[#071636]" />

      <div className="relative z-10 w-full max-w-md">
        <Link
          href="/"
          className="apple-press inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white mb-6 px-3.5 py-2 rounded-xl bg-white/10 border border-white/10 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to School Website
        </Link>

        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200/80">
          <div className="flex items-center gap-3.5 mb-6">
            <img
              src="/images/school/logo.jpg"
              alt="El-Shadai School Logo"
              className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-xs"
            />
            <div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[#1559ed]">
                <ShieldCheck className="w-3.5 h-3.5" /> Staff &amp; Computing Portal
              </span>
              <h1 className="font-display font-bold text-2xl text-slate-900">
                El-Shadai CMS Admin
              </h1>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
            Sign in to publish notices, update academic calendar dates, upload campus photos to the gallery, and review student admission applications.
          </p>

          {error && (
            <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Administrator Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password..."
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#1559ed]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="
                    absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer
                  "
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="apple-press w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#1559ed] hover:bg-[#0b3ea8] text-white font-semibold text-sm shadow-lg shadow-blue-600/25 transition-colors cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Open Admin Dashboard
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400">
              Default Staff Password: <code className="font-mono text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">ElShadai2026!</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
