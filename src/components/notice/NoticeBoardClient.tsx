"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Pin,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Bell,
} from "lucide-react";

export interface NoticeDTO {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  coverImage?: string | null;
  isPinned: boolean;
  publishedAt: string | Date;
}

export interface EventDTO {
  id: string;
  title: string;
  description?: string | null;
  eventDate: string | Date;
  timeString?: string | null;
  location?: string | null;
  category: string;
}

const CATEGORIES = ["All", "Admissions", "Academic", "PTA", "Events"];

const SPRING_CRITICAL = {
  type: "spring" as const,
  damping: 30,
  stiffness: 350,
  mass: 0.8,
};

export function NoticeBoardClient({
  notices,
  events,
}: {
  notices: NoticeDTO[];
  events: EventDTO[];
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotices = useMemo(() => {
    return notices.filter((n) => {
      const matchesCat =
        selectedCategory === "All" ||
        n.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        !searchQuery.trim() ||
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [notices, selectedCategory, searchQuery]);

  return (
    <div className="space-y-20">
      {/* Search & Category Filter Bar */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`apple-press relative px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? "text-white"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="notice-cat-pill"
                      transition={SPRING_CRITICAL}
                      className="absolute inset-0 rounded-2xl bg-[#1559ed] -z-10"
                    />
                  )}
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notices & circulars..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1559ed]"
            />
          </div>
        </div>

        {/* Notices Grid */}
        {filteredNotices.length === 0 ? (
          <div className="apple-card rounded-3xl p-12 text-center bg-white space-y-3">
            <Bell className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-[#0b192c]">
              No matching notices found
            </h3>
            <p className="text-sm text-slate-500">
              Try clearing your search filter or selecting “All” categories.
            </p>
          </div>
        ) : (
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            <AnimatePresence mode="popLayout">
              {filteredNotices.map((notice) => (
                <motion.div
                  layout
                  key={notice.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={SPRING_CRITICAL}
                >
                  <Link
                    href={`/notice/${notice.slug}`}
                    className="apple-card apple-press rounded-3xl overflow-hidden bg-white h-full flex flex-col justify-between group"
                  >
                    <div>
                      <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative">
                        <img
                          src={notice.coverImage || "/images/school/DSC_0064.jpg"}
                          alt={notice.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-[#0b192c]/85 backdrop-blur-md text-white text-xs font-semibold">
                            {notice.category}
                          </span>
                          {notice.isPinned && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500 text-[#0b192c] text-xs font-bold">
                              <Pin className="w-3 h-3" />
                              Pinned
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="p-6 space-y-2.5">
                        <p className="text-xs font-mono text-slate-500">
                          {new Date(notice.publishedAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </p>
                        <h3 className="text-lg font-bold text-[#0b192c] group-hover:text-[#1559ed] transition-colors line-clamp-2">
                          {notice.title}
                        </h3>
                        <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                          {notice.excerpt}
                        </p>
                      </div>
                    </div>
                    <div className="px-6 pb-6 pt-2 flex items-center gap-1.5 text-xs font-bold text-[#1559ed] uppercase tracking-wider">
                      <span>Read Full Notice</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Academic Calendar & Key Dates Section */}
      <section id="calendar" className="scroll-mt-28">
        <div className="rounded-3xl bg-[#0b192c] text-white p-7 sm:p-10 shadow-xl border border-white/10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div className="space-y-2">
              <span className="eyebrow-badge text-amber-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Term Schedule & Events
              </span>
              <h2 className="section-heading text-2xl sm:text-3xl font-bold text-white">
                Academic Calendar & Important Dates
              </h2>
              <p className="text-sm text-slate-300 max-w-2xl">
                Key school dates, resumption days, PTA meetings, mid-term assessments, and campus events updated directly by the school administration.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {events.map((ev) => {
              const d = new Date(ev.eventDate);
              const day = d.toLocaleDateString("en-GB", { day: "2-digit" });
              const month = d.toLocaleDateString("en-GB", { month: "short" });
              const year = d.getFullYear();

              return (
                <div
                  key={ev.id}
                  className="rounded-2xl bg-white/[0.06] border border-white/10 p-5 flex items-start gap-4"
                >
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/30 text-amber-300 flex flex-col items-center justify-center shrink-0 font-mono">
                    <span className="text-xl font-bold leading-none">{day}</span>
                    <span className="text-[11px] uppercase mt-1">{month}</span>
                  </div>

                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-amber-300 text-[11px] font-semibold">
                        {ev.category}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {year}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white">
                      {ev.title}
                    </h3>
                    {ev.description && (
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {ev.description}
                      </p>
                    )}
                    <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300">
                      {ev.timeString && (
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          {ev.timeString}
                        </span>
                      )}
                      {ev.location && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-amber-400" />
                          {ev.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
