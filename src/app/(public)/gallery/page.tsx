import React from "react";
import type { Metadata } from "next";
import { getGalleryItems } from "@/lib/cms";
import { GalleryClient } from "@/components/gallery/GalleryClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "School Photo Gallery | Our School in Pictures",
  description:
    "Explore the vibrant life at El-Shadai School in Tema, Ghana: classroom learning, STEM practicals, sports, cultural celebrations, and dedicated teachers.",
};

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <div className="space-y-16 pb-20">
      {/* Page Hero */}
      <section className="bg-[#1b2a6b] text-white py-16 sm:py-20 border-b-4 border-[#9e3b4b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#f2bfc7]">
              Our School in Pictures
            </p>
            <h1 className="display-heading text-4xl sm:text-5xl font-bold text-white">
              Capturing Our School Moments
            </h1>
            <p className="text-blue-100/90 text-lg leading-relaxed">
              At El-Shadai School, we celebrate every achievement, big or small. Our gallery showcases the dedication of our teachers, the curiosity of our students, and the joyful energy that fills our campus every day.
            </p>
          </div>
        </div>
      </section>

      {/* Filterable Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8 space-y-1.5">
          <h2 className="section-heading text-2xl sm:text-3xl font-bold text-[#1b2a6b]">
            Explore Campus Life by Category
          </h2>
          <p className="text-sm text-slate-600">
            Select a category below to filter photographs from our classrooms, laboratories, and school events.
          </p>
        </div>

        <GalleryClient items={items} />
      </section>
    </div>
  );
}
