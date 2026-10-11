import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Target,
  Eye,
  Award,
  CheckCircle2,
  Quote,
} from "lucide-react";
import { getSiteSettings, getLeaders } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us | Mission, Vision & Leadership",
  description:
    "Learn about El-Shadai School in Tema Newtown Manhean, Ghana: our mission, vision, core values, Headteacher's welcome, and dedicated leadership team.",
};

export default async function AboutPage() {
  const [settings, leaders] = await Promise.all([
    getSiteSettings(),
    getLeaders(),
  ]);

  const coreValuesList = settings.coreValues
    .split(",")
    .map((v) => v.replace(/and\s+/i, "").trim())
    .filter(Boolean);

  return (
    <div className="space-y-20 pb-20">
      {/* Page Hero */}
      <section className="bg-[#1b2a6b] text-white py-16 sm:py-20 border-b-4 border-[#9e3b4b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#f2bfc7]">
              Who We Are
            </p>
            <h1 className="display-heading text-4xl sm:text-5xl font-bold text-white">
              About {settings.schoolName}
            </h1>
            <p className="text-blue-100/90 text-lg leading-relaxed">
              At El-Shadai School in Tema, Ghana, we believe that every child is a light meant to shine. Since our founding, our mission has been to provide quality private education that balances strong academics with discipline, character training, and creativity.
            </p>
          </div>
        </div>
      </section>

      {/* 1. Who We Are & Campus Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="section-heading text-3xl sm:text-4xl font-bold text-[#1b2a6b]">
              Shaping Confident, Responsible Citizens Who Shine Brightly
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              At El-Shadai School in Tema Newtown Manhean, we create an environment where students are inspired to dream, to achieve, and to grow into confident, responsible citizens who contribute positively to society.
            </p>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Our holistic approach to education combines quality classroom teaching, practical STEM and computing sessions, co-curricular clubs, and personal character development across Preschool, Primary, and Junior High School.
            </p>
            <div className="pt-2">
              <Link
                href="/admission"
                className="apple-press inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#9e3b4b] hover:bg-[#842f3d] text-white font-semibold text-sm shadow-xs"
              >
                <span>Join Our School Family</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 aspect-[4/5] bg-slate-100">
              <img
                src="/images/school/DSC_0311.jpg"
                alt="El-Shadai Classroom Learning"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 aspect-[4/5] bg-slate-100 mt-8">
              <img
                src="/images/school/DSC_0371.jpg"
                alt="El-Shadai Student Excellence"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Mission, Vision & Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-7">
          {/* Mission */}
          <div className="apple-card rounded-2xl p-7 sm:p-8 bg-white space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#f0f3fa] text-[#1b2a6b] flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="section-heading text-2xl font-bold text-[#1b2a6b]">
              Our Mission
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {settings.mission}
            </p>
          </div>

          {/* Vision */}
          <div className="apple-card rounded-2xl p-7 sm:p-8 bg-white space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#fbf3f4] text-[#9e3b4b] flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="section-heading text-2xl font-bold text-[#1b2a6b]">
              Our Vision
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {settings.vision}
            </p>
          </div>

          {/* Core Values */}
          <div className="apple-card rounded-2xl p-7 sm:p-8 bg-white space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#f0f3fa] text-[#1b2a6b] flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="section-heading text-2xl font-bold text-[#1b2a6b]">
              Our Core Values
            </h3>
            <div className="flex flex-wrap gap-2 pt-1">
              {coreValuesList.map((val) => (
                <span
                  key={val}
                  className="px-3.5 py-1.5 rounded-lg bg-[#f0f3fa] text-[#1b2a6b] text-xs font-bold"
                >
                  {val}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-500 pt-1">
              Every lesson and co-curricular activity at El-Shadai School reinforces these five pillars.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Headteacher's Welcome */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#1b2a6b] text-white p-8 sm:p-12 shadow-xl border border-white/10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-4">
              <div className="rounded-2xl overflow-hidden border-2 border-[#e6a2ad]/40 aspect-[3/4] max-w-xs mx-auto bg-[#121c46] shadow-lg">
                <img
                  src={settings.headteacherImage || "/images/school/leader-headteacher.jpg"}
                  alt={settings.headteacherName}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            <div className="lg:col-span-8 space-y-5">
              <p className="text-xs font-bold uppercase tracking-widest text-[#f2bfc7]">
                Headteacher&apos;s Welcome Message
              </p>
              <Quote className="w-10 h-10 text-[#e6a2ad]/40" />
              <blockquote className="section-heading text-xl sm:text-2xl lg:text-3xl font-medium text-white leading-relaxed">
                &ldquo;{settings.headteacherMessage}&rdquo;
              </blockquote>
              <div className="pt-4 border-t border-white/15">
                <p className="text-lg font-bold text-white">
                  {settings.headteacherName}
                </p>
                <p className="text-sm text-blue-100/80">
                  {settings.headteacherRole.replace(/—/g, "-")}, {settings.schoolName}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Inside Our School (4 Strengths) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-2 mb-10">
          <h2 className="section-heading text-3xl sm:text-4xl font-bold text-[#1b2a6b]">
            Inside Our School
          </h2>
          <p className="text-slate-600 text-base">
            Why families across Tema Newtown Manhean choose El-Shadai School for their children.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Qualified & Passionate Teachers",
              desc: "Experienced educators who mentor every child with patience, high expectations, and care.",
            },
            {
              title: "Balanced Academics & Discipline",
              desc: "Rigorous GES curriculum paired with structured study habits and strong moral conduct.",
            },
            {
              title: "Affordable, Flexible Admissions",
              desc: "Free one-time admission and tailored termly tuition plans that support families.",
            },
            {
              title: "Moral & Character Development",
              desc: "Nurturing honesty, respect, leadership, and community service from Preschool through JHS.",
            },
          ].map((strength) => (
            <div
              key={strength.title}
              className="apple-card rounded-2xl p-6 bg-white space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#f0f3fa] text-[#1b2a6b] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#1b2a6b]">
                {strength.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {strength.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Our Dedicated Leaders */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-2 mb-10">
          <h2 className="section-heading text-3xl sm:text-4xl font-bold text-[#1b2a6b]">
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
              className="apple-card rounded-2xl overflow-hidden bg-white flex flex-col"
            >
              <div className="aspect-[3/4] bg-slate-100 overflow-hidden">
                <img
                  src={leader.imageUrl}
                  alt={leader.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-5 text-center space-y-1">
                <span className="inline-block px-3 py-0.5 rounded-md bg-[#fbf3f4] text-[#9e3b4b] border border-[#edd5d9] text-xs font-bold uppercase tracking-wider">
                  {leader.role}
                </span>
                <h3 className="text-base font-bold text-[#1b2a6b] pt-1">
                  {leader.name}
                </h3>
                {leader.bio && (
                  <p className="text-xs text-slate-600 pt-1">
                    {leader.bio.replace(/—/g, "-")}
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
