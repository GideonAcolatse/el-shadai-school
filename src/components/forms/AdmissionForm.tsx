"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

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
  const [applicantName, setApplicantName] = useState("");
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
    const firstName = String(formData.get("studentFirstName") || "").trim();
    const lastName = String(formData.get("studentLastName") || "").trim();
    const fullName = [firstName, lastName].filter(Boolean).join(" ");

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
        setApplicantName(fullName);
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
    const whatsappMessage = `Hello El-Shadai School Admissions! I just submitted an online admission application for ${applicantName || "my child"} (Reference Code: ${referenceNumber}). I would like to schedule our campus visit and placement assessment.`;
    const whatsappUrl = `https://wa.me/233244000000?text=${encodeURIComponent(whatsappMessage)}`;

    return (
      <div className="rounded-2xl bg-[#f0f3fa] border border-slate-200 p-8 sm:p-10 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-[#1b2a6b] text-white flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <p className="text-xs font-bold uppercase tracking-widest text-[#9e3b4b]">
          Application Received
        </p>
        <h3 className="section-heading text-2xl sm:text-3xl font-bold text-[#1b2a6b]">
          Thank You for Applying to El-Shadai School
        </h3>
        <p className="text-slate-600 max-w-lg mx-auto text-sm sm:text-base">
          Your online admission application has been recorded in our school portal. Our Admissions Office will contact you shortly to schedule a campus visit and placement assessment.
        </p>
        <div className="inline-block px-5 py-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 block">
            Application Reference Code
          </span>
          <span className="font-mono text-lg font-bold text-[#1b2a6b]">
            {referenceNumber}
          </span>
        </div>
        <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="apple-press inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.149.929 3.182 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.768-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.075-1.99-.462-1.657-.687-2.716-2.385-2.798-2.496-.082-.112-.669-.893-.669-1.704 0-.811.424-1.21.574-1.373.15-.163.328-.204.437-.204.11 0 .219.002.315.006.101.005.237-.038.37.283.136.329.465 1.137.505 1.22.041.082.068.179.014.288-.055.11-.082.179-.164.275-.082.095-.172.213-.246.286-.082.082-.167.172-.072.336.095.163.424.7.91 1.134.626.558 1.155.731 1.319.813.164.082.26.069.356-.041.096-.11.411-.479.52-.644.11-.164.219-.137.369-.082.15.055.958.452 1.122.534.164.082.274.123.315.192.041.069.041.397-.103.802z" />
            </svg>
            <span>Chat with Admissions on WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => setReferenceNumber(null)}
            className="apple-press px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold cursor-pointer transition-colors"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="apple-card rounded-2xl p-6 sm:p-10 bg-white space-y-8"
    >
      <div className="border-b border-slate-200/80 pb-5">
        <p className="text-xs font-bold uppercase tracking-wider text-[#9e3b4b] mb-1">
          Online Enrollment Portal
        </p>
        <h3 className="section-heading text-2xl sm:text-3xl font-bold text-[#1b2a6b]">
          Student Admission Application Form
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          Complete the form below for Preschool, Primary, or Junior High School admission. Fields marked with * are required.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-[#fbf3f4] border border-[#edd5d9] text-[#9e3b4b] text-sm flex items-center gap-2.5">
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
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1b2a6b]"
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
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1b2a6b]"
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
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1b2a6b]"
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
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1b2a6b]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Gender *
            </label>
            <select
              name="gender"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1b2a6b]"
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
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1b2a6b]"
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
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1b2a6b]"
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
            placeholder="Enter previous school name and last class completed (if applicable)"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1b2a6b]"
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
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1b2a6b]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Relationship to Child *
            </label>
            <select
              name="guardianRelation"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1b2a6b]"
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
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1b2a6b]"
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
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1b2a6b]"
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
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1b2a6b]"
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
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1b2a6b]"
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
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1b2a6b]"
          />
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
          <input
            type="checkbox"
            required
            className="mt-0.5 rounded border-slate-300 text-[#1b2a6b] focus:ring-[#1b2a6b]"
          />
          <span>
            I confirm that the information provided is accurate and agree to abide by the policies of El-Shadai School.
          </span>
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="apple-press inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#9e3b4b] hover:bg-[#842f3d] text-white font-bold text-sm shadow-sm cursor-pointer disabled:opacity-60 shrink-0"
        >
          <Send className="w-4 h-4" />
          <span>{submitting ? "Submitting Application..." : "Submit Application"}</span>
        </button>
      </div>
    </form>
  );
}
