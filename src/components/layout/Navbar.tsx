"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Bell,
  Phone,
  ArrowRight,
  Calendar,
  LogIn,
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

// Tracks whether the visitor has dismissed the current announcement during their active SPA browsing session
let dismissedAnnouncementForVisit: string | null = null;

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
  const hasAnnouncement = Boolean(urgentBannerActive && urgentBannerText);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    if (
      urgentBannerActive &&
      urgentBannerText &&
      dismissedAnnouncementForVisit !== urgentBannerText
    ) {
      setPopupOpen(true);
    } else if (!urgentBannerActive || !urgentBannerText) {
      setPopupOpen(false);
    }
  }, [urgentBannerActive, urgentBannerText]);

  useEffect(() => {
    if (!popupOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        handleDismissPopup();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [popupOpen, urgentBannerText]);

  function handleDismissPopup() {
    if (urgentBannerText) {
      dismissedAnnouncementForVisit = urgentBannerText;
    }
    setPopupOpen(false);
  }

  return (
    <>
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
          <div className="hidden md:flex items-center gap-2">
            {hasAnnouncement && (
              <button
                type="button"
                onClick={() => setPopupOpen(true)}
                title="View School Announcement"
                className="apple-press inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#fbf3f4] hover:bg-[#f5e4e7] text-[#9e3b4b] border border-[#9e3b4b]/20 text-xs font-bold cursor-pointer"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Notice</span>
              </button>
            )}
            <a
              href={process.env.NEXT_PUBLIC_PORTAL_URL || "http://elshadaisch-fees.test"}
              target="_blank"
              rel="noopener noreferrer"
              title="Parent, Student & Staff Portal"
              className="apple-press inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 border border-slate-200/80 text-xs font-semibold"
            >
              <LogIn className="w-3.5 h-3.5 text-[#1b2a6b]" />
              <span>Portal</span>
            </a>
            <Link
              href="/admission"
              className="apple-press inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-[#1b2a6b] hover:bg-[#142052] text-white text-sm font-semibold shadow-xs"
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

                <div className="pt-4 mt-3 border-t border-slate-200/80 flex flex-col gap-2.5">
                  {hasAnnouncement && (
                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        setPopupOpen(true);
                      }}
                      className="apple-press flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#fbf3f4] text-[#9e3b4b] border border-[#9e3b4b]/20 font-semibold text-sm cursor-pointer"
                    >
                      <Bell className="w-4 h-4" />
                      View School Announcement
                    </button>
                  )}
                  <a
                    href={process.env.NEXT_PUBLIC_PORTAL_URL || "http://elshadaisch-fees.test"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="apple-press flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-semibold text-sm"
                  >
                    <LogIn className="w-4 h-4 text-[#1b2a6b]" />
                    <span>Parent & Staff Portal</span>
                  </a>
                  <Link
                    href="/admission"
                    onClick={() => setMobileOpen(false)}
                    className="apple-press flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#1b2a6b] text-white font-semibold text-sm shadow-xs"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Website Announcement Pop-Up Modal */}
      <AnimatePresence>
        {hasAnnouncement && popupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleDismissPopup}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#121c46]/65 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="school-announcement-popup-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={SPRING_CRITICAL}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-3xl bg-white border border-slate-200/80 shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-[#1b2a6b] px-6 py-5 text-white relative flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-white p-0.5 shrink-0 shadow-xs overflow-hidden">
                    <img
                      src="/images/school/logo.jpg"
                      alt={schoolName}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#9e3b4b] text-white text-[10px] font-bold uppercase tracking-wider">
                      <Bell className="w-3 h-3" />
                      Official Announcement
                    </span>
                    <h2
                      id="school-announcement-popup-title"
                      className="font-display font-bold text-lg sm:text-xl text-white mt-1 leading-tight"
                    >
                      {schoolName}
                    </h2>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDismissPopup}
                  aria-label="Close announcement pop-up"
                  className="apple-press w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-7 space-y-5">
                <div className="bg-[#f8fafc] border border-slate-200/80 rounded-2xl p-5">
                  <p className="text-base sm:text-lg font-bold text-[#1b2a6b] leading-snug">
                    {urgentBannerText}
                  </p>
                </div>

                {(nextEventTitle && nextEventDate) || phonePrimary ? (
                  <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-xl bg-[#f0f3fa] border border-[#1b2a6b]/10 text-xs text-slate-700">
                    {nextEventTitle && nextEventDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#9e3b4b] shrink-0" />
                        <span>
                          <strong className="text-[#1b2a6b] font-semibold">
                            {nextEventDate}:
                          </strong>{" "}
                          {nextEventTitle}
                        </span>
                      </div>
                    )}
                    {phonePrimary && (
                      <a
                        href={`tel:${phonePrimary.replace(/\s+/g, "")}`}
                        className="inline-flex items-center gap-1.5 font-semibold text-[#1b2a6b] hover:underline"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#9e3b4b]" />
                        <span>{phonePrimary}</span>
                      </a>
                    )}
                  </div>
                ) : null}

                {/* Modal Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-1">
                  <button
                    type="button"
                    onClick={handleDismissPopup}
                    className={`apple-press px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer ${
                      urgentBannerLink
                        ? "bg-slate-100 hover:bg-slate-200 text-slate-700"
                        : "bg-[#1b2a6b] hover:bg-[#142052] text-white shadow-xs"
                    }`}
                  >
                    Continue to Website
                  </button>

                  {urgentBannerLink && (
                    <Link
                      href={urgentBannerLink}
                      onClick={handleDismissPopup}
                      className="apple-press inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#9e3b4b] hover:bg-[#842f3d] text-white text-xs sm:text-sm font-semibold shadow-sm"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
