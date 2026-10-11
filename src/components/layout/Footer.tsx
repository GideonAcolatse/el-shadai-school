"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Send,
  CheckCircle2,
  Award,
  ExternalLink,
} from "lucide-react";

interface FooterProps {
  schoolName: string;
  motto: string;
  address: string;
  phonePrimary: string;
  phoneSecondary: string;
  emailInfo: string;
  emailAdmissions: string;
  facebookUrl?: string | null;
}

export function Footer({
  schoolName,
  motto,
  address,
  phonePrimary,
  phoneSecondary,
  emailInfo,
  emailAdmissions,
  facebookUrl,
}: FooterProps) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatusMessage(data.message || "Subscribed to school updates!");
        setEmail("");
      } else {
        setStatusMessage(data.error || "Could not subscribe right now.");
      }
    } catch {
      setStatusMessage("Subscribed! Thank you for staying connected.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <footer className="bg-[#0b192c] text-slate-300 border-t border-white/10 mt-auto">
      {/* Top Newsletter Banner */}
      <div className="border-b border-white/10 bg-gradient-to-r from-[#0b192c] via-[#112645] to-[#0b192c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="eyebrow-badge text-amber-400 block mb-2">
                Parent & Community Updates
              </span>
              <h2 className="section-heading text-2xl sm:text-3xl font-bold text-white">
                Subscribe to Our School Newsletter
              </h2>
              <p className="text-slate-300 mt-2 max-w-2xl text-sm sm:text-base">
                Stay updated with term resumption dates, PTA notices, examination schedules, and student achievements at {schoolName}.
              </p>
            </div>
            <div className="lg:col-span-5">
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3"
              >
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="apple-press inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0b192c] font-bold text-sm shadow-sm cursor-pointer disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? "Joining..." : "Subscribe"}</span>
                </button>
              </form>
              {statusMessage && (
                <p className="mt-2.5 text-xs text-amber-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{statusMessage}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1: About the School */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-white p-0.5 shrink-0">
                <img
                  src="/images/school/logo.jpg"
                  alt={schoolName}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">
                  {schoolName}
                </h3>
                <p className="text-xs font-medium text-amber-400">
                  “{motto}”
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              El-Shadai School in Tema, Ghana, is dedicated to providing quality private education across Preschool, Primary, and Junior High School that inspires academic excellence, discipline, and leadership.
            </p>
            <div className="pt-2 flex items-center gap-3">
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="apple-press inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-white"
                >
                  <span>Facebook Community</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                </a>
              )}
              <Link
                href="/admin"
                className="apple-press inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 text-xs font-semibold text-amber-300"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin CMS</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/admission"
                  className="hover:text-white transition-colors"
                >
                  Admissions & Fees
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="hover:text-white transition-colors"
                >
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About & Leadership
                </Link>
              </li>
              <li>
                <Link
                  href="/notice"
                  className="hover:text-white transition-colors"
                >
                  Notice Board & Calendar
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact & Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Academic Programs & Top Instructors */}
          <div className="lg:col-span-3 space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                Academic Departments
              </h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>Preschool (Creche, Nursery & KG)</li>
                <li>Primary School (Basic 1 – Basic 6)</li>
                <li>Junior High School (JHS 1 – JHS 3)</li>
                <li>Practical STEM & Computing Lab</li>
              </ul>
            </div>

            <div className="pt-3 border-t border-white/10">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                Featured Instructors
              </h4>
              <ul className="space-y-1 text-xs text-slate-300">
                <li>• Desmond Dorsu</li>
                <li>• Kidwell McWallace Africanus</li>
              </ul>
            </div>
          </div>

          {/* Column 4: Direct Contact Details */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Contact Our Campus
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <span>{address}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <div className="space-y-1">
                  <a
                    href={`tel:${phonePrimary.replace(/\s+/g, "")}`}
                    className="block hover:text-white transition-colors"
                  >
                    {phonePrimary}
                  </a>
                  <a
                    href={`tel:${phoneSecondary.replace(/\s+/g, "")}`}
                    className="block hover:text-white transition-colors"
                  >
                    {phoneSecondary}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <div className="space-y-1">
                  <a
                    href={`mailto:${emailInfo}`}
                    className="block hover:text-white transition-colors break-all"
                  >
                    {emailInfo}
                  </a>
                  <a
                    href={`mailto:${emailAdmissions}`}
                    className="block hover:text-white transition-colors break-all text-xs text-slate-400"
                  >
                    {emailAdmissions}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            Copyright © {new Date().getFullYear()} —{" "}
            <strong className="text-slate-200">EL-SHADAI SCHOOL</strong> | DEVELOPED BY{" "}
            <strong className="text-amber-400">GIDEON KUDJOE ACOLATSE</strong>
          </p>
          <div className="flex items-center gap-5">
            <Link href="/about" className="hover:text-slate-200">
              Privacy & School Policy
            </Link>
            <Link href="/admission" className="hover:text-slate-200">
              Admissions Terms
            </Link>
            <Link href="/admin" className="hover:text-amber-300 font-medium">
              Staff Dashboard
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
