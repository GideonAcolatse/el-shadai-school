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
      <section className="relative bg-[#1b2a6b] text-white pt-16 pb-24 overflow-hidden border-b-4 border-[#9e3b4b]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: "url(/images/school/DSC_0738.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1b2a6b]/90 via-[#1b2a6b]/95 to-[#121c46]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#f2bfc7]">
              Official Communications
            </p>
            <h1 className="display-heading font-bold text-4xl sm:text-5xl text-white">
              School Notice Board &amp; Key Dates
            </h1>
            <p className="text-blue-100/90 text-base sm:text-lg leading-relaxed">
              Stay informed on school resumptions, examination schedules, PTA general meetings, and special campus events at El-Shadai School.
            </p>
            <div className="pt-2 inline-flex flex-wrap items-center gap-4 text-xs text-blue-100 bg-white/10 border border-white/15 px-4 py-2 rounded-xl">
              <span className="inline-flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-[#f2bfc7]" />
                {notices.length} Published Notices
              </span>
              <span className="text-white/30">•</span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#f2bfc7]" />
                {events.length} Upcoming Calendar Dates
              </span>
            </div>
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
