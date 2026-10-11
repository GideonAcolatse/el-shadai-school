import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNoticeBySlug, getNotices, getSiteSettings } from "@/lib/cms";
import {
  ArrowLeft,
  Calendar,
  Pin,
  Phone,
  Share2,
  Bell,
  ArrowRight,
  Download,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [notice, allNotices, settings] = await Promise.all([
    getNoticeBySlug(slug),
    getNotices(4),
    getSiteSettings(),
  ]);

  if (!notice) {
    notFound();
  }

  const relatedNotices = allNotices.filter((n) => n.slug !== notice.slug).slice(0, 3);
  const paragraphs = notice.content.split(/\n\n+/).filter(Boolean);

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-24">
      {/* Top Banner */}
      <section className="relative bg-[#071636] text-white pt-12 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{
            backgroundImage: `url(${notice.coverImage || "/images/school/DSC_0064.jpg"})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071636]/90 via-[#071636]/95 to-[#071636]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/notice"
            className="apple-press inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white mb-6 bg-white/10 px-3.5 py-2 rounded-xl border border-white/10 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to All Notices
          </Link>

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3 py-1 rounded-full bg-[#1559ed] text-white text-xs font-bold uppercase tracking-wider">
              {notice.category}
            </span>
            {notice.isPinned && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#fbbf24] text-slate-950 text-xs font-bold">
                <Pin className="w-3 h-3" /> Pinned Announcement
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-300 ml-1">
              <Calendar className="w-3.5 h-3.5 text-[#38bdf8]" />
              Published{" "}
              {new Date(notice.publishedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
            {notice.title}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
            {notice.excerpt}
          </p>
        </div>
      </section>

      {/* Notice Article Card */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <article className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-900/5 overflow-hidden">
          {notice.coverImage && (
            <div className="relative h-64 sm:h-96 overflow-hidden bg-slate-100">
              <img
                src={notice.coverImage}
                alt={notice.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6 sm:p-10 lg:p-12">
            <div className="prose prose-slate max-w-none space-y-5 text-slate-700 leading-relaxed text-base sm:text-lg">
              {paragraphs.map((para, idx) => (
                <p key={idx} className="whitespace-pre-line">
                  {para}
                </p>
              ))}
            </div>

            {notice.attachment && (
              <div className="mt-8 p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-[#1559ed]" />
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Official Circular / Attachment
                    </p>
                    <p className="text-xs text-slate-500">
                      Download attached document for full details
                    </p>
                  </div>
                </div>
                <a
                  href={notice.attachment}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apple-press px-4 py-2 rounded-xl bg-[#1559ed] text-white text-xs font-semibold hover:bg-[#0b3ea8] transition-colors"
                >
                  Download
                </a>
              </div>
            )}

            {/* Official School Sign-off */}
            <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider font-bold text-slate-400">
                  Issued By
                </p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">
                  Office of the Headteacher &amp; Administration — {settings.schoolName}
                </p>
                <p className="text-xs text-slate-500">{settings.address}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={`tel:${settings.phonePrimary.replace(/[^+\d]/g, "")}`}
                  className="apple-press inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#1559ed]" />
                  Call Administration
                </a>
                <Link
                  href="/admission"
                  className="apple-press inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1559ed] hover:bg-[#0b3ea8] text-white text-xs font-semibold transition-colors"
                >
                  Apply for Admission
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Related Notices */}
        {relatedNotices.length > 0 && (
          <div className="mt-14">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#1559ed]" />
                Other Recent Notices
              </h2>
              <Link
                href="/notice"
                className="apple-press text-xs font-semibold text-[#1559ed] hover:text-[#0b3ea8] inline-flex items-center gap-1"
              >
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedNotices.map((item) => (
                <Link
                  key={item.id}
                  href={`/notice/${item.slug}`}
                  className="apple-press group bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1559ed]">
                      {item.category}
                    </span>
                    <h3 className="font-display font-bold text-base text-slate-900 mt-1.5 group-hover:text-[#1559ed] transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                      {item.excerpt}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1559ed] mt-4">
                    Read Notice <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
