import React from "react";
import { getNotices, getUpcomingEvents } from "@/lib/cms";
import { NoticeBoardClient } from "@/components/notice/NoticeBoardClient";
import { Bell, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Notice Board & Academic Calendar | El-Shadai School",
  description:
    "Stay updated with the latest announcements, term dates, PTA meetings, and academic calendar events at El-Shadai School, Tema Newtown Manhean.",
};

export default async function NoticePage() {
  const [notices, events] = await Promise.all([
    getNotices(),
    getUpcomingEvents(),
  ]);

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-24">
      {/* Page Hero */}
      <section className="relative bg-[#071636] text-white pt-16 pb-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: "url(/images/school/DSC_0738.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071636]/90 via-[#071636]/95 to-[#071636]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#fbbf24] text-xs font-bold uppercase tracking-widest mb-5">
            <Bell className="w-3.5 h-3.5" />
            Official Communications
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white max-w-3xl mx-auto">
            School Notice Board &amp; Key Dates
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
            Stay informed on school resumptions, examination schedules, PTA general meetings, and special campus events at El-Shadai School.
          </p>
          <div className="mt-6 inline-flex items-center gap-4 text-xs text-slate-300 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
            <span className="inline-flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5 text-[#38bdf8]" />
              {notices.length} Published Notices
            </span>
            <span className="text-white/20">•</span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#fbbf24]" />
              {events.length} Upcoming Calendar Dates
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <NoticeBoardClient notices={notices} events={events} />
      </section>
    </div>
  );
}
