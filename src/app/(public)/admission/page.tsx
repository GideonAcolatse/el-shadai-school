import React from "react";
import type { Metadata } from "next";
import {
  FileCheck2,
  CheckCircle2,
  Phone,
  Sparkles,
  ShieldCheck,
  Users,
  GraduationCap,
} from "lucide-react";
import { getSiteSettings } from "@/lib/cms";
import { AdmissionForm } from "@/components/forms/AdmissionForm";

export const metadata: Metadata = {
  title: "Admissions & Online Application",
  description:
    "Apply to El-Shadai School in Tema Newtown Manhean for Preschool, Primary, and Junior High School. Simple 5-step admissions process with Free One-Time Admission.",
};

const ADMISSION_STEPS = [
  {
    step: "01",
    title: "Inquiry & Campus Visit",
    description:
      "Parents and guardians are encouraged to contact us or visit our Tema Newtown Manhean campus to learn more about our programs and facilities.",
  },
  {
    step: "02",
    title: "Application Form",
    description:
      "Complete the online admission form below or pick up a physical form at the school administration office.",
  },
  {
    step: "03",
    title: "Entrance Assessment",
    description:
      "Depending on the grade level, students take a brief placement assessment to ensure they are placed in the right class.",
  },
  {
    step: "04",
    title: "Interview & Review",
    description:
      "A short, supportive parent-student interview is conducted with the Headteacher and admissions team.",
  },
  {
    step: "05",
    title: "Enrollment & Orientation",
    description:
      "Once admitted, students and parents receive an orientation package, booklist, and uniform guide to settle smoothly into school life.",
  },
];

const REQUIREMENTS = [
  "Completed admission application form (Online or Office copy)",
  "Two (2) recent passport-sized photographs of the student",
  "Photocopy of the child’s official Birth Certificate or Ghana Card",
  "Most recent Terminal Report Card (for Primary & JHS transfer pupils)",
];

export default async function AdmissionPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-20 pb-20">
      {/* Page Hero */}
      <section className="bg-[#0b192c] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 eyebrow-badge">
              <Sparkles className="w-3.5 h-3.5" />
              Welcome to Admissions
            </span>
            <h1 className="display-heading text-4xl sm:text-5xl font-bold text-white">
              Join the El-Shadai School Family
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              At El-Shadai School in Tema, Ghana, we welcome new students every academic year. Our admissions process is simple, transparent, and supportive—designed to help families find the right fit for their children.
            </p>
          </div>
        </div>
      </section>

      {/* 5-Step Admissions Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="eyebrow-badge text-[#1559ed] block">
            How to Apply
          </span>
          <h2 className="section-heading text-3xl sm:text-4xl font-bold text-[#0b192c]">
            Our 5-Step Admissions Process
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-5">
          {ADMISSION_STEPS.map((item) => (
            <div
              key={item.step}
              className="apple-card rounded-3xl p-6 bg-white flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-[#1559ed] font-mono text-sm font-bold">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-[#0b192c]">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Step {item.step}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Requirements & Tuition Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Application Requirements */}
          <div className="lg:col-span-5 apple-card rounded-3xl p-7 sm:p-9 bg-white flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="eyebrow-badge text-[#1559ed] block">
                Checklist for Parents
              </span>
              <h2 className="section-heading text-2xl sm:text-3xl font-bold text-[#0b192c]">
                Application Requirements
              </h2>
              <p className="text-sm text-slate-600">
                To complete enrollment at the school office after submitting your application, please prepare the following documents:
              </p>

              <ul className="space-y-3 pt-2">
                {REQUIREMENTS.map((req) => (
                  <li
                    key={req}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70"
                  >
                    <FileCheck2 className="w-5 h-5 text-[#1559ed] shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-slate-800">
                      {req}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Admissions Help Desk
                </p>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">
                  {settings.phonePrimary}
                </p>
              </div>
              <a
                href={`tel:${settings.phonePrimary.replace(/\s+/g, "")}`}
                className="apple-press inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 text-[#0b192c] text-xs font-bold"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Office</span>
              </a>
            </div>
          </div>

          {/* Tuition & Fee Tiers */}
          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-5">
            <div className="apple-card rounded-3xl p-6 bg-white flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-amber-500/15 text-amber-700 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-700 font-semibold block">
                  Registration
                </span>
                <h3 className="text-xl font-bold text-[#0b192c]">
                  {settings.admissionFeeTitle}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {settings.admissionFeeText}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-xs font-bold text-emerald-700">
                ✓ Free Admission Form
              </div>
            </div>

            <div className="apple-card rounded-3xl p-6 bg-white flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#1559ed] flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#1559ed] font-semibold block">
                  Creche – Basic 6
                </span>
                <h3 className="text-xl font-bold text-[#0b192c]">
                  Preschool & Primary Tuition
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {settings.primaryTuitionText}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-xs font-bold text-[#1559ed]">
                ✓ Flexible Termly Plans
              </div>
            </div>

            <div className="apple-card rounded-3xl p-6 bg-white flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-semibold block">
                  JHS 1 – JHS 3
                </span>
                <h3 className="text-xl font-bold text-[#0b192c]">
                  Junior High Tuition
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {settings.jhsTuitionText}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-xs font-bold text-emerald-700">
                ✓ BECE & STEM Focus
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Online Application Form */}
      <section id="apply" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdmissionForm />
      </section>
    </div>
  );
}
