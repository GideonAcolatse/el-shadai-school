"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Bell,
  Phone,
  ArrowRight,
  ShieldCheck,
  Calendar,
} from "lucide-react";

interface NavbarProps {
  schoolName: string;
  motto: string;
  phonePrimary: string;
  urgentBannerActive: boolean;
  urgentBannerText?: string | null;
  urgentBannerLink?: string | null;
  nextEventTitle?: string | null;
  nextEventDate?: string | null;
}

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/admission", label: "Admission" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About Us" },
  { href: "/notice", label: "Notice Board" },
  { href: "/contact", label: "Contact" },
];

const SPRING_CRITICAL = {
  type: "spring" as const,
  damping: 30,
  stiffness: 360,
  mass: 0.8,
};

export function Navbar({
  schoolName,
  motto,
  phonePrimary,
  urgentBannerActive,
  urgentBannerText,
  urgentBannerLink,
  nextEventTitle,
  nextEventDate,
}: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Top Urgent Notice & Key Date Bar */}
      {urgentBannerActive && urgentBannerText && (
        <div className="bg-[#1b2a6b] text-white text-xs sm:text-sm border-b border-white/10 relative z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-[#9e3b4b] text-white text-[11px] font-bold tracking-wide uppercase shrink-0">
                Announcement
              </span>
              <p className="truncate font-medium text-white/95">
                {urgentBannerText}
              </p>
              {urgentBannerLink && (
                <Link
                  href={urgentBannerLink}
                  className="apple-press inline-flex items-center gap-1 text-white hover:text-white/80 font-semibold underline underline-offset-4 shrink-0 ml-1"
                >
                  Details
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>

            <div className="hidden lg:flex items-center gap-5 text-xs text-slate-200 shrink-0">
              {nextEventTitle && nextEventDate && (
                <Link
                  href="/notice#calendar"
                  className="apple-press flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#e6a2ad]" />
                  <span className="font-mono text-[11px] text-white font-semibold">
                    {nextEventDate}:
                  </span>
                  <span className="font-medium">{nextEventTitle}</span>
                </Link>
              )}
              <a
                href={`tel:${phonePrimary.replace(/\s+/g, "")}`}
                className="apple-press flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#e6a2ad]" />
                <span>{phonePrimary}</span>
              </a>
              <Link
                href="/admin"
                className="apple-press inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/15 text-white font-medium transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#e6a2ad]" />
                Staff Portal
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Navigation Header */}
      <header className="sticky top-0 z-40 apple-glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            className="apple-press flex items-center gap-3.5 group focus:outline-none"
          >
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-200/80 shadow-xs bg-white shrink-0">
              <img
                src="/images/school/logo.jpg"
                alt={schoolName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="block font-bold text-lg sm:text-xl tracking-tight text-[#1b2a6b] leading-none">
                {schoolName}
              </span>
              <span className="block text-xs font-semibold text-[#9e3b4b] mt-1 tracking-wide">
                {motto}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/70"
          >
            {NAV_LINKS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`apple-press relative px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-[#1b2a6b]"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={SPRING_CRITICAL}
                      className="absolute inset-0 bg-white rounded-lg shadow-xs border border-slate-200/80 -z-10"
                    />
                  )}
                  <span className="flex items-center gap-1.5">
                    {item.href === "/notice" && (
                      <Bell className="w-3.5 h-3.5 text-[#9e3b4b]" />
                    )}
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/admission"
              className="apple-press inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1b2a6b] hover:bg-[#142052] text-white text-sm font-semibold shadow-xs"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Drawer Trigger */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={
              mobileOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={mobileOpen}
            className="apple-press md:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white border border-slate-200 text-slate-800 shadow-2xs"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={SPRING_CRITICAL}
              className="md:hidden overflow-hidden border-t border-slate-200/70 bg-white/95 backdrop-blur-xl"
            >
              <div className="px-4 pt-3 pb-6 space-y-1.5">
                {NAV_LINKS.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`apple-press flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold ${
                        isActive
                          ? "bg-[#f0f3fa] text-[#1b2a6b]"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="w-4 h-4 opacity-60" />
                    </Link>
                  );
                })}

                <div className="pt-4 mt-3 border-t border-slate-200/80 grid grid-cols-2 gap-3">
                  <Link
                    href="/admission"
                    onClick={() => setMobileOpen(false)}
                    className="apple-press flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#1b2a6b] text-white font-semibold text-sm shadow-xs"
                  >
                    Apply Now
                  </Link>
                  <Link
                    href="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="apple-press flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 text-slate-800 font-semibold text-sm"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#9e3b4b]" />
                    Admin CMS
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
