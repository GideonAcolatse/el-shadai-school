"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
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
        setStatusMessage(data.message || "Subscribed to school updates.");
        setEmail("");
      } else {
        setStatusMessage(data.error || "Could not subscribe right now.");
      }
    } catch {
      setStatusMessage("Subscribed. Thank you for staying connected.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <footer className="bg-[#121c46] text-slate-300 border-t border-white/10 mt-auto">
      {/* Top Newsletter Banner */}
      <div className="border-b border-white/10 bg-[#1b2a6b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Subscribe to School Updates
              </h2>
              <p className="text-slate-200 mt-1.5 max-w-2xl text-sm sm:text-base">
                Receive term resumption dates, PTA notices, examination schedules, and campus news from {schoolName}.
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
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-white/40"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="apple-press inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#9e3b4b] hover:bg-[#842f3d] text-white font-semibold text-sm shadow-xs cursor-pointer disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? "Joining..." : "Subscribe"}</span>
                </button>
              </form>
              {statusMessage && (
                <p className="mt-2.5 text-xs text-white flex items-center gap-1.5">
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
                <p className="text-xs font-semibold text-[#e6a2ad]">
                  {motto}
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              El-Shadai School in Tema Newtown Manhean provides quality private education across Preschool, Primary, and Junior High School, building academic excellence, discipline, and moral character.
            </p>
            {facebookUrl && (
              <div className="pt-2 flex items-center gap-3">
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="apple-press inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-white"
                >
                  <span>Facebook Page</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#e6a2ad]" />
                </a>
              </div>
            )}
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
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
                  Admissions &amp; Fees
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
                  About &amp; Leadership
                </Link>
              </li>
              <li>
                <Link
                  href="/notice"
                  className="hover:text-white transition-colors"
                >
                  Notice Board &amp; Calendar
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact &amp; Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Academic Programs & Top Instructors */}
          <div className="lg:col-span-3 space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                Academic Departments
              </h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>Preschool (Creche, Nursery &amp; KG)</li>
                <li>Primary School (Basic 1 to Basic 6)</li>
                <li>Junior High School (JHS 1 to JHS 3)</li>
                <li>Practical STEM &amp; Computing Lab</li>
              </ul>
            </div>

            <div className="pt-3 border-t border-white/10">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#e6a2ad]" />
                Featured Instructors
              </h4>
              <ul className="space-y-1 text-xs text-slate-300">
                <li>Desmond Dorsu</li>
                <li>Kidwell McWallace Africanus</li>
              </ul>
            </div>
          </div>

          {/* Column 4: Direct Contact Details */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Contact Our Campus
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#e6a2ad] shrink-0 mt-1" />
                <span>{address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#e6a2ad] shrink-0 mt-1" />
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
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#e6a2ad] shrink-0 mt-1" />
                <div className="space-y-1">
                  <a
                    href={`mailto:${emailInfo}`}
                    className="block hover:text-white transition-colors"
                  >
                    {emailInfo}
                  </a>
                  <a
                    href={`mailto:${emailAdmissions}`}
                    className="block hover:text-white transition-colors text-xs text-slate-400"
                  >
                    {emailAdmissions}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {schoolName}, Tema Newtown Manhean. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="text-slate-400">
              Powered by <span className="font-semibold text-white">KedjeloEdu</span>
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <a
              href={process.env.NEXT_PUBLIC_PORTAL_URL || "http://elshadaisch-fees.test"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              School Portal
            </a>
            <span className="hidden sm:inline text-slate-600">•</span>
            <Link href="/admission" className="hover:text-white transition-colors">
              Online Admissions
            </Link>
            <Link href="/notice" className="hover:text-white transition-colors">
              Notice Board
            </Link>
            <Link href="/admin" className="hover:text-white transition-colors">
              Staff CMS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
