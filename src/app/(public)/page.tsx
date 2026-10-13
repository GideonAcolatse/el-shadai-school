import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  MapPin,
  CheckCircle2,
  BookOpen,
  GraduationCap,
  Trophy,
  Cpu,
  HeartHandshake,
  Users,
  Pin,
  Quote,
  Clock,
  ShieldCheck,
  Palette,
  Compass,
  Star,
  MessageSquare,
} from "lucide-react";
import {
  getSiteSettings,
  getLeaders,
  getNotices,
  getUpcomingEvents,
} from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, leaders, notices, events] = await Promise.all([
    getSiteSettings(),
    getLeaders(),
    getNotices(3),
    getUpcomingEvents(4),
  ]);

  const aboutParagraphs = settings.aboutSummary
    .replace(/—/g, ", ")
    .split("\n\n")
    .filter((p) => p.trim().length > 0);

  const cleanHeroTitle = settings.heroTitle.replace(/\s*—\s*/g, ": ");

  return (
    <div className="space-y-20 sm:space-y-24 pb-20">
      {/* 1. Split Editorial Hero Section */}
      <section className="pt-8 sm:pt-12 lg:pt-14 pb-12 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Copy Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#fbf3f4] border border-[#edd5d9] text-[#9e3b4b]">
                <span className="w-2 h-2 rounded-full bg-[#9e3b4b] animate-pulse shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  {settings.heroBadge.replace(/—/g, "•")}
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.35rem] font-bold text-[#121c46] tracking-tight leading-[1.1]">
                {cleanHeroTitle}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                {settings.heroSubtitle.replace(/—/g, ", ")}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/admission"
                  className="apple-press inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1b2a6b] hover:bg-[#142052] text-white font-semibold text-sm sm:text-base shadow-xs"
                >
                  <span>Apply for Admission</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/about"
                  className="apple-press inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#121c46] font-semibold text-sm sm:text-base border border-slate-300"
                >
                  <span>About Our School</span>
                </Link>
                <a
                  href={process.env.NEXT_PUBLIC_PORTAL_URL || "http://elshadaisch-fees.test"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apple-press inline-flex items-center gap-1.5 px-4 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 font-semibold text-sm border border-slate-200"
                  title="Parent & Staff Portal"
                >
                  <span>Portal</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              </div>

              {/* Clean Key Facts Strip */}
              <div className="pt-6 grid grid-cols-3 gap-4 sm:gap-6 border-t border-slate-200 max-w-xl">
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-[#1b2a6b]">
                    Preschool to JHS
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Creche, Nursery, KG, Basic 1 to 9
                  </p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-[#9e3b4b]">
                    Free Admission
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Zero one-time admission fee
                  </p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-[#121c46]">
                    Tema Newtown
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Manhean Campus, Greater Accra
                  </p>
                </div>
              </div>
            </div>

            {/* Right Structured Photography Grid */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-12 gap-3.5 items-stretch">
                <div className="col-span-12 rounded-2xl overflow-hidden border border-slate-200 aspect-[16/11] relative bg-slate-100">
                  <img
                    src={settings.heroImage || "/images/school/DSC_0064.jpg"}
                    alt="El-Shadai School students in classroom"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121c46]/75 via-transparent to-transparent" />
                  <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-white">
                    <div>
                      <p className="font-semibold text-sm">
                        Classroom Learning at El-Shadai
                      </p>
                      <p className="text-xs text-slate-200">
                        Tema Newtown Manhean Campus
                      </p>
                    </div>
                    <Link
                      href="/gallery"
                      className="apple-press px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-md text-xs font-semibold border border-white/25 hover:bg-white/30"
                    >
                      View Gallery
                    </Link>
                  </div>
                </div>

                <div className="col-span-6 rounded-2xl overflow-hidden border border-slate-200 aspect-[4/3] relative bg-slate-100">
                  <img
                    src="/images/school/jhs-stem.jpeg"
                    alt="STEM and Science Practicals"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-3 text-xs font-semibold text-white">
                    STEM &amp; Lab Practicals
                  </span>
                </div>

                <div className="col-span-6 rounded-2xl overflow-hidden border border-slate-200 aspect-[4/3] relative bg-slate-100">
                  <img
                    src="/images/school/culture.jpeg"
                    alt="Cultural and Creative Arts"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-3 text-xs font-semibold text-white">
                    Culture &amp; Leadership
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Upcoming Key Dates & Academic Calendar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#1b2a6b] text-white p-6 sm:p-8 shadow-sm border border-[#121c46]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/15">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#9e3b4b] flex items-center justify-center text-white shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Upcoming Key Dates &amp; Academic Schedule
                </h2>
                <p className="text-xs text-slate-200 mt-0.5">
                  Important school resumptions, PTA meetings, and examination dates
                </p>
              </div>
            </div>
            <Link
              href="/notice#calendar"
              className="apple-press inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-slate-200"
            >
              <span>Full Academic Calendar</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            {events.map((ev) => {
              const d = new Date(ev.eventDate);
              const day = d.toLocaleDateString("en-GB", { day: "2-digit" });
              const month = d.toLocaleDateString("en-GB", { month: "short" });
              return (
                <div
                  key={ev.id}
                  className="rounded-xl bg-white/[0.08] hover:bg-white/[0.12] border border-white/15 p-4 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-[#9e3b4b] text-white font-mono text-xs font-semibold">
                        {day} {month}
                      </span>
                      <span className="text-[11px] font-medium text-slate-200 px-2 py-0.5 rounded-md bg-white/10">
                        {ev.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-white leading-snug">
                      {ev.title}
                    </h3>
                    {ev.description && (
                      <p className="text-xs text-slate-200 mt-1.5 line-clamp-2">
                        {ev.description}
                      </p>
                    )}
                  </div>
                  {ev.timeString && (
                    <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-slate-200">
                      <Clock className="w-3.5 h-3.5 text-[#e6a2ad] shrink-0" />
                      <span>{ev.timeString.replace(/–/g, "to")}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. About El-Shadai School */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="apple-card rounded-2xl p-5 sm:p-6 bg-white space-y-4">
              <div className="rounded-xl overflow-hidden border border-slate-200 aspect-[4/3] bg-slate-100">
                <img
                  src="/images/school/DSC_0738.jpg"
                  alt="El-Shadai School Campus in Tema Newtown Manhean"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="text-xs text-slate-600">
                  <p className="font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#9e3b4b]" />
                    Tema Newtown Manhean
                  </p>
                  <p className="mt-0.5">{settings.address}</p>
                </div>
                <Link
                  href="/contact"
                  className="apple-press inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1b2a6b] text-white text-xs font-semibold shrink-0"
                >
                  <span>Visit Campus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#121c46]">
              Nurturing Young Minds Through Academic Excellence and Moral Values
            </h2>
            <div className="space-y-4 text-slate-600 text-base leading-relaxed">
              {aboutParagraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-3.5 pt-2">
              {[
                "Qualified and dedicated teachers",
                "Strong academic and moral discipline",
                "Practical STEM and computing classes",
                "Safe, welcoming campus in Tema",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-200/90"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#9e3b4b] shrink-0" />
                  <span className="text-sm font-semibold text-slate-800">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Academic Departments */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-2 mb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#121c46]">
            Academic Departments
          </h2>
          <p className="text-slate-600 text-base">
            Structured learning pathways tailored to each stage of your child’s academic and personal development.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {[
            {
              title: "Preschool Department",
              badge: "Creche, Nursery & KG 1 to 2",
              description:
                "Building early literacy, phonics, numeracy, creativity, and social confidence in a caring environment.",
              image: "/images/school/preschool.jpeg",
              icon: Compass,
            },
            {
              title: "Primary School",
              badge: "Basic 1 to Basic 6",
              description:
                "Developing strong foundations in reading, mathematics, science, computing, and social studies.",
              image: "/images/school/primary.jpeg",
              icon: BookOpen,
            },
            {
              title: "Junior High School",
              badge: "JHS 1 to JHS 3 (BECE Prep)",
              description:
                "Preparing students for the BECE and senior high school through laboratory practicals, computing, and leadership.",
              image: "/images/school/jhs-stem.jpeg",
              icon: GraduationCap,
            },
          ].map((prog) => {
            const Icon = prog.icon;
            return (
              <div
                key={prog.title}
                className="apple-card rounded-2xl overflow-hidden flex flex-col justify-between group bg-white"
              >
                <div>
                  <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
                    <img
                      src={prog.image}
                      alt={prog.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#121c46]/90 text-white text-xs font-semibold">
                      {prog.badge}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-9 h-9 rounded-lg bg-[#fbf3f4] text-[#9e3b4b] flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-lg font-bold text-[#121c46]">
                        {prog.title}
                      </h3>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mt-2">
                      {prog.description}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <Link
                    href="/admission"
                    className="apple-press inline-flex items-center gap-1.5 text-sm font-semibold text-[#1b2a6b] hover:text-[#9e3b4b] transition-colors"
                  >
                    <span>Apply for {prog.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Admissions & Tuition Overview */}
      <section className="bg-[#121c46] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl space-y-2">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                Admissions &amp; Tuition Overview
              </h2>
              <p className="text-slate-300 text-base">
                We welcome new pupils every academic year with a straightforward, family-friendly admission process.
              </p>
            </div>
            <Link
              href="/admission"
              className="apple-press inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#9e3b4b] hover:bg-[#842f3d] text-white font-semibold text-sm shrink-0"
            >
              <span>Complete Online Application</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-white/[0.06] border border-white/15 p-6 space-y-3">
              <div className="w-11 h-11 rounded-xl bg-[#9e3b4b] text-white flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#e6a2ad]">
                Registration
              </span>
              <h3 className="text-xl font-bold text-white">
                {settings.admissionFeeTitle.replace(/—/g, "-")}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {settings.admissionFeeText.replace(/—/g, " - ")}
              </p>
            </div>

            <div className="rounded-2xl bg-white/[0.06] border border-white/15 p-6 space-y-3">
              <div className="w-11 h-11 rounded-xl bg-white/15 text-white flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Early Years &amp; Basic 1 to 6
              </span>
              <h3 className="text-xl font-bold text-white">
                Preschool &amp; Primary Tuition
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {settings.primaryTuitionText.replace(/—/g, " - ")}
              </p>
            </div>

            <div className="rounded-2xl bg-white/[0.06] border border-white/15 p-6 space-y-3">
              <div className="w-11 h-11 rounded-xl bg-white/15 text-white flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-slate-300">
                JHS 1 to JHS 3
              </span>
              <h3 className="text-xl font-bold text-white">
                Junior High Tuition
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {settings.jhsTuitionText.replace(/—/g, " - ")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Co-Curricular & Campus Life */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-1.5">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#121c46]">
              Student Life &amp; Co-Curricular Activities
            </h2>
            <p className="text-slate-600 text-base">
              Holistic development combining classroom instruction with sports, arts, computing, and character formation.
            </p>
          </div>
          <Link
            href="/gallery"
            className="apple-press inline-flex items-center gap-1.5 text-sm font-semibold text-[#1b2a6b] hover:text-[#9e3b4b]"
          >
            <span>Explore Photo Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Sports & Physical Education",
              desc: "Building teamwork, endurance, and healthy sportsmanship through athletics and football.",
              image: "/images/school/sports.jpeg",
              icon: Trophy,
            },
            {
              title: "Cultural & Creative Arts",
              desc: "Debate, traditional drumming and dance, music, and drama to build student confidence.",
              image: "/images/school/culture.jpeg",
              icon: Palette,
            },
            {
              title: "STEM & Computing Lab",
              desc: "Hands-on laboratory practicals in science, computing, and problem-solving.",
              image: "/images/school/science.jpeg",
              icon: Cpu,
            },
            {
              title: "Moral & Character Training",
              desc: "Instilling strong values, discipline, respect, and leadership for life.",
              image: "/images/school/moral-character.jpeg",
              icon: HeartHandshake,
            },
          ].map((act) => {
            const Icon = act.icon;
            return (
              <div
                key={act.title}
                className="apple-card rounded-2xl overflow-hidden flex flex-col bg-white"
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={act.image}
                    alt={act.title}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[#9e3b4b] mb-1">
                      <Icon className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        Campus Life
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#121c46]">
                      {act.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      {act.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Latest from the School Notice Board */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-1.5">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#121c46]">
              Latest School Notices
            </h2>
            <p className="text-slate-600 text-base">
              Official announcements and circulars from the school administration.
            </p>
          </div>
          <Link
            href="/notice"
            className="apple-press inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-[#121c46]"
          >
            <span>View All Notices</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {notices.map((notice) => (
            <Link
              key={notice.id}
              href={`/notice/${notice.slug}`}
              className="apple-card apple-press rounded-2xl overflow-hidden flex flex-col justify-between group bg-white"
            >
              <div>
                <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative">
                  <img
                    src={notice.coverImage || "/images/school/DSC_0064.jpg"}
                    alt={notice.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-[#121c46]/90 text-white text-xs font-semibold">
                      {notice.category}
                    </span>
                    {notice.isPinned && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#9e3b4b] text-white text-xs font-bold">
                        <Pin className="w-3 h-3" />
                        Pinned
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <p className="text-xs font-mono text-slate-500">
                    {new Date(notice.publishedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <h3 className="text-lg font-bold text-[#121c46] group-hover:text-[#1b2a6b] transition-colors line-clamp-2">
                    {notice.title.replace(/—/g, "-")}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {notice.excerpt.replace(/—/g, ", ")}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2 flex items-center gap-1.5 text-xs font-bold text-[#9e3b4b] uppercase tracking-wider">
                <span>Read Notice</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. Parent & Student Feedback */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#f0f3fa] border border-slate-200/90 p-8 sm:p-10">
          <div className="max-w-2xl mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#121c46]">
              Voices from Our School Community
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "El-Shadai School has been a blessing to our family. The teachers are dedicated, and my child has grown both academically and morally.",
                author: "Parent",
                role: "Primary & JHS Parent, Tema",
              },
              {
                quote:
                  "El-Shadai School has given my child the confidence to excel academically and socially. The teachers genuinely care about the students’ growth and discipline.",
                author: "Guardian",
                role: "Tema Newtown Community",
              },
              {
                quote:
                  "I love my school because I get to learn, play, and grow every day. My teachers always encourage me to do my best in science, reading, and computing.",
                author: "Student",
                role: "El-Shadai School Pupil",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl p-6 bg-white border border-slate-200/80 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#f59e0b]">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="w-4 h-4 fill-[#f59e0b]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#9e3b4b]/50" />
                  <p className="text-slate-700 text-sm leading-relaxed">
                    “{item.quote}”
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <p className="font-bold text-sm text-[#121c46]">
                    {item.author}
                  </p>
                  <p className="text-xs text-slate-500">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. School Leadership */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-1.5">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#121c46]">
              School Leadership &amp; Administration
            </h2>
            <p className="text-slate-600 text-base">
              Meet the dedicated management team guiding academic standards and student welfare at El-Shadai School.
            </p>
          </div>
          <Link
            href="/about"
            className="apple-press inline-flex items-center gap-1.5 text-sm font-semibold text-[#1b2a6b] hover:text-[#9e3b4b]"
          >
            <span>More About Our Team</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leaders.map((leader) => (
            <div
              key={leader.id}
              className="apple-card rounded-2xl overflow-hidden bg-white flex flex-col"
            >
              <div className="aspect-[3/4] bg-slate-100 overflow-hidden">
                <img
                  src={leader.imageUrl}
                  alt={leader.name}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-1">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#fbf3f4] text-[#9e3b4b] border border-[#edd5d9] text-xs font-bold uppercase tracking-wider">
                  {leader.role}
                </span>
                <h3 className="text-base font-bold text-[#121c46] pt-1">
                  {leader.name}
                </h3>
                {leader.bio && (
                  <p className="text-xs text-slate-600 pt-1 line-clamp-2">
                    {leader.bio.replace(/—/g, ", ")}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Visit Campus & Enrollment CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#1b2a6b] via-[#162359] to-[#121c46] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-lg border border-white/10">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse" />
              <span>Admissions Open for 2026/2027</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Give Your Child the Foundation for Lifelong Excellence
            </h2>
            <p className="text-slate-200 text-base sm:text-lg max-w-2xl leading-relaxed">
              Visit our campus in Tema Newtown Manhean, meet our teachers, and explore our learning facilities. Free admission forms are available now.
            </p>
            <div className="flex flex-wrap items-center gap-3.5 pt-4">
              <Link
                href="/admission"
                className="apple-press inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-[#9e3b4b] hover:bg-[#842f3d] text-white font-bold text-sm sm:text-base shadow-sm"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/233244721828?text=${encodeURIComponent("Hello El-Shadai School, I would like to schedule a campus visit and inquire about admissions.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="apple-press inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-sm sm:text-base border border-white/20 backdrop-blur-md"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Chat on WhatsApp</span>
              </a>
              <Link
                href="/contact"
                className="apple-press inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-slate-100 text-[#121c46] font-semibold text-sm sm:text-base"
              >
                <MapPin className="w-4 h-4 text-[#9e3b4b]" />
                <span>Visit Campus</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
