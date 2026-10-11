"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, Sparkles } from "lucide-react";

export interface GalleryItemDTO {
  id: string;
  title: string;
  caption?: string | null;
  category: string;
  imageUrl: string;
  featured: boolean;
}

const CATEGORIES = [
  "All",
  "Classroom Learning",
  "STEM & Projects",
  "Creative Arts & Culture",
  "Sports & Physical Education",
  "Events & Celebrations",
  "Teachers & Leadership",
];

const SPRING_CRITICAL = {
  type: "spring" as const,
  damping: 30,
  stiffness: 340,
  mass: 0.8,
};

export function GalleryClient({ items }: { items: GalleryItemDTO[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return items;
    return items.filter(
      (item) => item.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [items, activeCategory]);

  const activeLightboxItem =
    selectedIndex !== null ? filteredItems[selectedIndex] : null;

  function showPrev() {
    if (selectedIndex === null) return;
    setSelectedIndex(
      (selectedIndex - 1 + filteredItems.length) % filteredItems.length
    );
  }

  function showNext() {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % filteredItems.length);
  }

  return (
    <div className="space-y-10">
      {/* Apple-Style Filterable Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 bg-white p-2 rounded-3xl border border-slate-200/80 shadow-xs max-w-fit mx-auto">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          const count =
            cat === "All"
              ? items.length
              : items.filter(
                  (i) => i.category.toLowerCase() === cat.toLowerCase()
                ).length;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActiveCategory(cat);
                setSelectedIndex(null);
              }}
              className={`apple-press relative px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                isActive
                  ? "text-white"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="gallery-cat-pill"
                  transition={SPRING_CRITICAL}
                  className="absolute inset-0 rounded-2xl bg-[#1559ed] shadow-xs -z-10"
                />
              )}
              <span className="flex items-center gap-1.5">
                <span>{cat}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {count}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Photo Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={SPRING_CRITICAL}
              onClick={() => setSelectedIndex(idx)}
              className="apple-card apple-press rounded-3xl overflow-hidden bg-white cursor-pointer group flex flex-col justify-between"
            >
              <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b192c]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                  <span className="text-xs font-semibold text-amber-300 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    {item.category}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center">
                    <ZoomIn className="w-4 h-4" />
                  </span>
                </div>
              </div>
              <div className="p-4">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#1559ed] font-semibold block">
                  {item.category}
                </span>
                <h3 className="text-sm font-bold text-[#0b192c] mt-0.5 line-clamp-1">
                  {item.title}
                </h3>
                {item.caption && (
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {item.caption}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Interruptible Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxItem && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 apple-glass-dark flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={SPRING_CRITICAL}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-[#0b192c] rounded-3xl overflow-hidden border border-white/15 shadow-2xl"
            >
              {/* Top Controls */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 text-white">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">
                    {activeLightboxItem.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {selectedIndex + 1} / {filteredItems.length}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedIndex(null)}
                  aria-label="Close lightbox"
                  className="apple-press w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Image Viewport */}
              <div className="relative bg-black/60 flex items-center justify-center max-h-[72vh] min-h-[320px]">
                <img
                  src={activeLightboxItem.imageUrl}
                  alt={activeLightboxItem.title}
                  className="max-h-[72vh] w-auto object-contain"
                />

                <button
                  type="button"
                  onClick={showPrev}
                  aria-label="Previous photo"
                  className="apple-press absolute left-3 sm:left-5 w-11 h-11 rounded-full bg-black/50 hover:bg-black/75 border border-white/20 text-white flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Next photo"
                  className="apple-press absolute right-3 sm:right-5 w-11 h-11 rounded-full bg-black/50 hover:bg-black/75 border border-white/20 text-white flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Caption Footer */}
              <div className="p-5 text-white">
                <h3 className="text-lg font-bold">{activeLightboxItem.title}</h3>
                {activeLightboxItem.caption && (
                  <p className="text-sm text-slate-300 mt-1">
                    {activeLightboxItem.caption}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
