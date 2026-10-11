import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  MapPin,
  CheckCircle2,
  BookOpen,
  GraduationCap,
  Sparkles,
  Trophy,
  Cpu,
  HeartHandshake,
  Users,
  Pin,
  Quote,
  Clock,
  ShieldCheck,
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
    .split("\n\n")
    .filter((p) => p.trim().length > 0);

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* 1. Asymmetric Editorial Hero Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-12 lg:pt-16 pb-12 bg-gradient-to-b from-[#f1f5f9]/80 via-[#faf9f5] to-[#faf9f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Copy Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-800">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span className="eyebrow-badge">{settings.heroBadge}</span>
              </div>

              <h1 className="display-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0b192c] tracking-tight">
                {settings.heroTitle}
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed">
                {settings.heroSubtitle}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/admission"
                  className="apple-press inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#1559ed] hover:bg-[#1045bd] text-white font-semibold text-base shadow-lg shadow-blue-600/20"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/about"
                  className="apple-press inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white hover:bg-slate-50 text-[#0b192c] font-semibold text-base border border-slate-200 shadow-xs"
                >
                  <span>Learn More</span>
                </Link>
              </div>

              {/* Key Trust Metrics */}
              <div className="pt-6 grid grid-cols-3 gap-4 sm:gap-6 border-t border-slate-200/80 max-w-xl">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-[#0b192c]">
                    3 Tiers
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    Preschool, Primary & JHS
                  </p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-[#1559ed]">
                    Free
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    One-Time Admission
                  </p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-amber-600">
                    100%
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    Moral & Academic Focus
                  </p>
                </div>
              </div>
            </div>

            {/* Right Bento Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="grid grid-cols-12 gap-4 items-stretch">
                <div className="col-span-12 rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 aspect-[16/11] relative bg-slate-100">
                  <img
                    src={settings.heroImage || "/images/school/DSC_0064.jpg"}
                    alt="El-Shadai School Students in Classroom"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b192c]/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <div>
                      <span className="text-xs uppercase tracking-wider font-mono text-amber-300 block">
                        Tema Newtown Manhean
                      </span>
                      <p className="font-semibold text-sm sm:text-base">
                        Nurturing Future Leaders Every Day
                      </p>
                    </div>
                    <Link
                      href="/gallery"
                      className="apple-press px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold border border-white/30 hover:bg-white/30"
                    >
                      View Gallery
                    </Link>
                  </div>
                </div>

                <div className="col-span-6 rounded-2xl overflow-hidden shadow-md border border-slate-200/80 aspect-[4/3] relative bg-slate-100">
                  <img
                    src="/images/school/jhs-stem.jpeg"
                    alt="STEM & Science Practicals"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-3 text-xs font-semibold text-white">
                    STEM & Lab Practicals
                  </span>
                </div>

                <div className="col-span-6 rounded-2xl overflow-hidden shadow-md border border-slate-200/80 aspect-[4/3] relative bg-slate-100">
                  <img
                    src="/images/school/culture.jpeg"
                    alt="Cultural & Creative Arts"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-3 text-xs font-semibold text-white">
                    Culture & Leadership
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Upcoming Key Dates & Academic Calendar Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="rounded-3xl bg-[#0b192c] text-white p-6 sm:p-8 shadow-xl border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="eyebrow-badge text-amber-400 block">
                  Live School Schedule
                </span>
                <h2 className="text-xl font-bold text-white">
                  Upcoming Key Dates & Events
                </h2>
              </div>
            </div>
            <Link
              href="/notice#calendar"
              className="apple-press inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300 hover:text-amber-200"
            >
              <span>View Full Academic Calendar</span>
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
                  className="rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 p-4 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono text-xs font-semibold">
                        {day} {month}
                      </span>
                      <span className="text-[11px] font-medium text-slate-300 px-2 py-0.5 rounded-full bg-white/10">
                        {ev.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-white leading-snug">
                      {ev.title}
                    </h3>
                    {ev.description && (
                      <p className="text-xs text-slate-300 mt-1.5 line-clamp-2">
                        {ev.description}
                      </p>
                    )}
                  </div>
                  {ev.timeString && (
                    <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{ev.timeString}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. About Us & Campus Location Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="apple-card rounded-3xl p-6 sm:p-8 bg-white space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1559ed] text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>Tema Newtown Manhean</span>
              </div>
              <h2 className="section-heading text-3xl font-bold text-[#0b192c]">
                About El-Shadai School
              </h2>
              <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-[4/3] bg-slate-100">
                <img
                  src="/images/school/campus-map.jpg"
                  alt="El-Shadai School Tema Newtown Manhean Map"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="text-xs text-slate-600">
                  <p className="font-semibold text-slate-900">
                    Accessible & Safe Campus
                  </p>
                  <p>{settings.address}</p>
                </div>
                <Link
                  href="/contact"
                  className="apple-press inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0b192c] text-white text-xs font-semibold"
                >
                  <span>Find Us On Map</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="eyebrow-badge text-[#1559ed] block">
              Who We Are
            </span>
            <h2 className="section-heading text-3xl sm:text-4xl font-bold text-[#0b192c]">
              Nurturing Young Minds Through Excellence, Discipline & Moral Values
            </h2>
            <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              {aboutParagraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              {[
                "Qualified and passionate educators",
                "Balanced academics & moral discipline",
                "Practical STEM & computing instruction",
                "Safe, caring environment in Tema",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#1559ed] shrink-0" />
                  <span className="text-sm font-semibold text-slate-800">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Academic Programs ("A Learning Path for Every Child") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="eyebrow-badge text-[#1559ed] block">
            Academic Departments
          </span>
          <h2 className="section-heading text-3xl sm:text-4xl font-bold text-[#0b192c]">
            A Learning Path for Every Child
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            At El-Shadai School, our programs are designed to meet the unique needs of children at different stages of their growth and education.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Preschool",
              badge: "Creche • Nursery • KG 1–2",
              description:
                "Laying the foundation for learning with creativity, phonics, numeracy, structured play, and warm care.",
              image: "/images/school/preschool.jpeg",
              icon: Sparkles,
            },
            {
              title: "Primary School",
              badge: "Basic 1 – Basic 6",
              description:
                "Fostering academic excellence with a strong focus on reading, mathematics, science, computing, and social studies.",
              image: "/images/school/primary.jpeg",
              icon: BookOpen,
            },
            {
              title: "Junior High School",
              badge: "JHS 1 – JHS 3 (BECE Prep)",
              description:
                "Preparing students for senior high school and future leadership through critical thinking, STEM practicals, and discipline.",
              image: "/images/school/jhs-stem.jpeg",
              icon: GraduationCap,
            },
          ].map((prog) => {
            const Icon = prog.icon;
            return (
              <div
                key={prog.title}
                className="apple-card rounded-3xl overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
                    <img
                      src={prog.image}
                      alt={prog.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0b192c]/85 backdrop-blur-md text-amber-300 font-mono text-xs font-semibold">
                      {prog.badge}
                    </span>
                  </div>
                  <div className="p-6 sm:p-7">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1559ed] flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-[#0b192c]">
                        {prog.title}
                      </h3>
                    </div>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-2">
                      {prog.description}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 sm:px-7">
                  <Link
                    href="/admission"
                    className="apple-press inline-flex items-center gap-1.5 text-sm font-semibold text-[#1559ed] hover:text-[#1045bd]"
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
      <section className="bg-[#0b192c] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl space-y-2">
              <span className="eyebrow-badge text-amber-400 block">
                Transparent & Family-Friendly
              </span>
              <h2 className="section-heading text-3xl sm:text-4xl font-bold text-white">
                Admissions Information & Tuition
              </h2>
              <p className="text-slate-300 text-base sm:text-lg">
                We welcome new students every academic year. Our admissions process is simple, transparent, and designed to help families find the best fit for their children.
              </p>
            </div>
            <Link
              href="/admission"
              className="apple-press inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-[#0b192c] font-bold text-sm shrink-0"
            >
              <span>Enroll Online Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-3xl bg-white/[0.07] border border-white/15 p-7 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="inline-block text-xs font-mono uppercase tracking-wider text-amber-300">
                Registration
              </span>
              <h3 className="text-xl font-bold text-white">
                {settings.admissionFeeTitle}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {settings.admissionFeeText}
              </p>
            </div>

            <div className="rounded-3xl bg-white/[0.07] border border-white/15 p-7 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-300 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <span className="inline-block text-xs font-mono uppercase tracking-wider text-blue-300">
                Early Years & Basic 1–6
              </span>
              <h3 className="text-xl font-bold text-white">
                Preschool & Primary Tuition
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {settings.primaryTuitionText}
              </p>
            </div>

            <div className="rounded-3xl bg-white/[0.07] border border-white/15 p-7 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="inline-block text-xs font-mono uppercase tracking-wider text-emerald-300">
                JHS 1 – JHS 3
              </span>
              <h3 className="text-xl font-bold text-white">
                Junior High Tuition
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {settings.jhsTuitionText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Student Life & Activities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="space-y-2">
            <span className="eyebrow-badge text-[#1559ed] block">
              Holistic Campus Experience
            </span>
            <h2 className="section-heading text-3xl sm:text-4xl font-bold text-[#0b192c]">
              Student Life & Co-Curricular Activities
            </h2>
          </div>
          <Link
            href="/gallery"
            className="apple-press inline-flex items-center gap-1.5 text-sm font-semibold text-[#1559ed] hover:text-[#1045bd]"
          >
            <span>Explore Full Photo Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Sports & Games",
              desc: "Building teamwork, discipline, and physical fitness through athletics and football.",
              image: "/images/school/sports.jpeg",
              icon: Trophy,
            },
            {
              title: "Clubs & Societies",
              desc: "Debate, cultural drumming & dance, music, and drama to inspire student creativity.",
              image: "/images/school/culture.jpeg",
              icon: Sparkles,
            },
            {
              title: "STEM Programs",
              desc: "Hands-on learning in science, technology, computing, and mathematics.",
              image: "/images/school/science.jpeg",
              icon: Cpu,
            },
            {
              title: "Moral & Character Development",
              desc: "Instilling strong values, respect, and life skills for responsible citizenship.",
              image: "/images/school/moral-character.jpeg",
              icon: HeartHandshake,
            },
          ].map((act) => {
            const Icon = act.icon;
            return (
              <div
                key={act.title}
                className="apple-card rounded-3xl overflow-hidden flex flex-col"
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
                    <div className="flex items-center gap-2 text-[#1559ed] mb-1.5">
                      <Icon className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        Co-Curricular
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#0b192c]">
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
          <div className="space-y-2">
            <span className="eyebrow-badge text-amber-700 block">
              Official Announcements
            </span>
            <h2 className="section-heading text-3xl sm:text-4xl font-bold text-[#0b192c]">
              Latest from the Notice Board
            </h2>
          </div>
          <Link
            href="/notice"
            className="apple-press inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white border border-slate-200 text-sm font-semibold text-[#0b192c] shadow-2xs"
          >
            <span>View All Notices</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {notices.map((notice) => (
            <Link
              key={notice.id}
              href={`/notice/${notice.slug}`}
              className="apple-card apple-press rounded-3xl overflow-hidden flex flex-col justify-between group"
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
                    {new Date(notice.publishedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
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
                <span>Read Full Announcement</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. What Parents Say (Testimonials) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-blue-50 via-white to-amber-50/60 border border-slate-200/80 p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="eyebrow-badge text-[#1559ed] block mb-2">
              Community Trust
            </span>
            <h2 className="section-heading text-3xl sm:text-4xl font-bold text-[#0b192c]">
              What Parents & Students Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "El-Shadai School has been a blessing to our family. The teachers are dedicated, and my child has grown both academically and morally. Truly a school that lets children shine.",
                author: "A Proud Parent",
                role: "Primary & JHS Parent, Tema",
              },
              {
                quote:
                  "El-Shadai School has given my child the confidence to excel academically and socially. The teachers genuinely care about the students’ growth and discipline.",
                author: "Parent Testimonial",
                role: "Tema Newtown Community",
              },
              {
                quote:
                  "I love my school because I get to learn, play, and grow every day. My teachers always encourage me to do my best in science, reading, and computing.",
                author: "A Student",
                role: "El-Shadai School Pupil",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="apple-card rounded-2xl p-6 bg-white flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <Quote className="w-8 h-8 text-amber-500/40" />
                  <p className="text-slate-700 text-sm sm:text-base italic leading-relaxed">
                    “{item.quote}”
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <p className="font-bold text-sm text-[#0b192c]">
                    — {item.author}
                  </p>
                  <p className="text-xs text-slate-500">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Our Dedicated Leaders */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="eyebrow-badge text-[#1559ed] block">
            School Management
          </span>
          <h2 className="section-heading text-3xl sm:text-4xl font-bold text-[#0b192c]">
            Our Dedicated Leaders
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            We are proud to have a team of qualified, passionate, and caring leaders and teachers who inspire and guide students daily.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {leaders.map((leader) => (
            <div
              key={leader.id}
              className="apple-card rounded-3xl overflow-hidden bg-white flex flex-col"
            >
              <div className="aspect-[3/4] bg-slate-100 overflow-hidden">
                <img
                  src={leader.imageUrl}
                  alt={leader.name}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 text-center space-y-1">
                <span className="inline-block px-3 py-0.5 rounded-full bg-amber-500/15 text-amber-800 text-xs font-bold uppercase tracking-wider">
                  {leader.role}
                </span>
                <h3 className="text-base font-bold text-[#0b192c] pt-1">
                  {leader.name}
                </h3>
                {leader.bio && (
                  <p className="text-xs text-slate-600 pt-1 line-clamp-2">
                    {leader.bio}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
