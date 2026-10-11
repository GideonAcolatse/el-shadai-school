"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Sparkles, AlertCircle } from "lucide-react";

const GRADE_OPTIONS: Record<string, string[]> = {
  Preschool: ["Creche", "Nursery 1", "Nursery 2", "Kindergarten 1 (KG 1)", "Kindergarten 2 (KG 2)"],
  "Primary School": [
    "Basic 1 (Primary 1)",
    "Basic 2 (Primary 2)",
    "Basic 3 (Primary 3)",
    "Basic 4 (Primary 4)",
    "Basic 5 (Primary 5)",
    "Basic 6 (Primary 6)",
  ],
  "Junior High School": ["JHS 1 (Basic 7)", "JHS 2 (Basic 8)", "JHS 3 (Basic 9)"],
};

export function AdmissionForm() {
  const [levelApplying, setLevelApplying] = useState("Primary School");
  const [gradeClass, setGradeClass] = useState("Basic 1 (Primary 1)");
  const [submitting, setSubmitting] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function handleLevelChange(newLevel: string) {
    setLevelApplying(newLevel);
    const firstGrade = GRADE_OPTIONS[newLevel]?.[0] || "";
    setGradeClass(firstGrade);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      studentFirstName: formData.get("studentFirstName"),
      studentMiddleName: formData.get("studentMiddleName"),
      studentLastName: formData.get("studentLastName"),
      dateOfBirth: formData.get("dateOfBirth"),
      gender: formData.get("gender"),
      levelApplying,
      gradeClass,
      previousSchool: formData.get("previousSchool"),
      guardianName: formData.get("guardianName"),
      guardianRelation: formData.get("guardianRelation"),
      guardianPhone: formData.get("guardianPhone"),
      guardianEmail: formData.get("guardianEmail"),
      residentialAddress: formData.get("residentialAddress"),
      city: formData.get("city"),
      medicalNotes: formData.get("medicalNotes"),
    };

    try {
      const res = await fetch("/api/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Please check all required fields and try again.");
      } else {
        setReferenceNumber(data.referenceNumber || "ESS-2026-NEW");
        e.currentTarget.reset();
      }
    } catch {
      setErrorMsg("Network error submitting application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (referenceNumber) {
    return (
      <div className="rounded-3xl bg-emerald-50/90 border border-emerald-200 p-8 sm:p-10 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="eyebrow-badge text-emerald-800 block">
          Application Received
        </span>
        <h3 className="section-heading text-2xl sm:text-3xl font-bold text-[#0b192c]">
          Thank You for Applying to El-Shadai School!
        </h3>
        <p className="text-slate-600 max-w-lg mx-auto text-sm sm:text-base">
          Your online admission application has been recorded in our school portal. Our Admissions Office will contact you shortly to schedule a campus visit and placement assessment.
        </p>
        <div className="inline-block px-5 py-3 rounded-2xl bg-white border border-emerald-200 shadow-2xs">
          <span className="text-xs text-slate-500 block">
            Application Reference Code
          </span>
          <span className="font-mono text-lg font-bold text-[#0b192c]">
            {referenceNumber}
          </span>
        </div>
        <div className="pt-3">
          <button
            type="button"
            onClick={() => setReferenceNumber(null)}
            className="apple-press px-6 py-2.5 rounded-full bg-[#0b192c] text-white text-xs font-semibold cursor-pointer"
          >
            Submit Another Student Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="apple-card rounded-3xl p-6 sm:p-10 bg-white space-y-8"
    >
      <div className="border-b border-slate-200/80 pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1559ed] mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Online Enrollment Portal</span>
        </div>
        <h3 className="section-heading text-2xl sm:text-3xl font-bold text-[#0b192c]">
          Student Admission Application Form
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          Complete the form below for Preschool, Primary, or Junior High School admission. Fields marked with * are required.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2.5">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Section 1: Student Details */}
      <div className="space-y-4">
        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
          1. Student Information
        </h4>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              First Name *
            </label>
            <input
              type="text"
              name="studentFirstName"
              required
              placeholder="e.g. Kwame"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1559ed]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Middle Name
            </label>
            <input
              type="text"
              name="studentMiddleName"
              placeholder="Optional"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1559ed]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Last Name (Surname) *
            </label>
            <input
              type="text"
              name="studentLastName"
              required
              placeholder="e.g. Mensah"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1559ed]"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Date of Birth *
            </label>
            <input
              type="date"
              name="dateOfBirth"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1559ed]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Gender *
            </label>
            <select
              name="gender"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1559ed]"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section 2: Academic Placement */}
      <div className="space-y-4 pt-2 border-t border-slate-100">
        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
          2. Department & Class Applying For
        </h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              School Department *
            </label>
            <select
              value={levelApplying}
              onChange={(e) => handleLevelChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1559ed]"
            >
              {Object.keys(GRADE_OPTIONS).map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Class / Grade Level *
            </label>
            <select
              value={gradeClass}
              onChange={(e) => setGradeClass(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1559ed]"
            >
              {(GRADE_OPTIONS[levelApplying] || []).map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Previous School Attended (For Transfer Pupils)
          </label>
          <input
            type="text"
            name="previousSchool"
            placeholder="Enter previous school name & last class completed (if applicable)"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1559ed]"
          />
        </div>
      </div>

      {/* Section 3: Parent / Guardian Information */}
      <div className="space-y-4 pt-2 border-t border-slate-100">
        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
          3. Parent / Guardian Contact Information
        </h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Parent / Guardian Full Name *
            </label>
            <input
              type="text"
              name="guardianName"
              required
              placeholder="Full Name of Parent or Guardian"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1559ed]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Relationship to Child *
            </label>
            <select
              name="guardianRelation"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1559ed]"
            >
              <option value="Parent">Parent (Mother / Father)</option>
              <option value="Guardian">Legal Guardian</option>
              <option value="Relative">Family Relative</option>
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Phone Number (WhatsApp / Direct Line) *
            </label>
            <input
              type="tel"
              name="guardianPhone"
              required
              placeholder="e.g. +233 24 472 1828"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1559ed]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              name="guardianEmail"
              required
              placeholder="parent@example.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1559ed]"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Residential Address / Community *
            </label>
            <input
              type="text"
              name="residentialAddress"
              required
              placeholder="House No., Street, or Community (e.g. Tema Newtown Manhean)"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1559ed]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              City / Town *
            </label>
            <input
              type="text"
              name="city"
              defaultValue="Tema"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1559ed]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Additional Notes or Medical / Learning Support Information (Optional)
          </label>
          <textarea
            name="medicalNotes"
            rows={3}
            placeholder="Share any allergies, medical notes, or questions for our admissions team..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1559ed]"
          />
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
          <input
            type="checkbox"
            required
            className="mt-0.5 rounded border-slate-300 text-[#1559ed] focus:ring-[#1559ed]"
          />
          <span>
            I confirm that the information provided is accurate and agree to abide by the policies of El-Shadai School.
          </span>
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="apple-press inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#1559ed] hover:bg-[#1045bd] text-white font-bold text-sm shadow-lg shadow-blue-600/20 cursor-pointer disabled:opacity-60 shrink-0"
        >
          <Send className="w-4 h-4" />
          <span>{submitting ? "Submitting Application..." : "Submit Application"}</span>
        </button>
      </div>
    </form>
  );
}
