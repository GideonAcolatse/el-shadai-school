import React from "react";
import type { Metadata } from "next";
import { Sparkles, Camera } from "lucide-react";
import { getGalleryItems } from "@/lib/cms";
import { GalleryClient } from "@/components/gallery/GalleryClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "School Photo Gallery — Our School in Pictures",
  description:
    "Explore the vibrant life at El-Shadai School in Tema, Ghana — classroom learning, STEM practicals, sports, cultural celebrations, and dedicated teachers.",
};

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <div className="space-y-16 pb-20">
      {/* Page Hero */}
      <section className="bg-[#0b192c] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 eyebrow-badge">
              <Camera className="w-3.5 h-3.5" />
              Our School in Pictures
            </span>
            <h1 className="display-heading text-4xl sm:text-5xl font-bold text-white">
              Capturing Our School Moments
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              At El-Shadai School, we celebrate every achievement, big or small. Our gallery showcases the dedication of our teachers, the curiosity of our students, and the joyful energy that fills our campus every day.
            </p>
          </div>
        </div>
      </section>

      {/* Filterable Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="eyebrow-badge text-[#1559ed] inline-flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Gallery Categories
          </span>
          <h2 className="section-heading text-2xl sm:text-3xl font-bold text-[#0b192c]">
            Explore Campus Life by Category
          </h2>
        </div>

        <GalleryClient items={items} />
      </section>
    </div>
  );
}
