"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

const SPRING_CRITICAL = {
  type: "spring" as const,
  damping: 30,
  stiffness: 350,
  mass: 0.8,
};

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Admissions Inquiry");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject,
          message,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }
      setSubmitted(true);
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please call our administration office directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={SPRING_CRITICAL}
        className="bg-[#f0f3fa] border border-slate-200 rounded-2xl p-8 text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-[#1b2a6b] text-white flex items-center justify-center mx-auto mb-5 shadow-md">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-bold text-2xl text-[#1b2a6b] mb-2">
          Message Received
        </h3>
        <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
          Thank you for reaching out to El-Shadai School. Our administrative team in Tema Newtown Manhean will respond to your inquiry shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setName("");
            setEmail("");
            setPhone("");
            setMessage("");
          }}
          className="apple-press mt-6 px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-[#1b2a6b] text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errorMsg && (
        <div className="p-4 rounded-xl bg-[#fbf3f4] border border-[#edd5d9] text-[#9e3b4b] text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Your Full Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Mr. Kwesi Mensah"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#1b2a6b]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Phone / WhatsApp Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+233 24 000 0000"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#1b2a6b]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="parent@example.com"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#1b2a6b]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Subject *
          </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#1b2a6b]"
          >
            <option value="Admissions Inquiry">Admissions Inquiry</option>
            <option value="Tuition & Bursary">Tuition &amp; Payment Plans</option>
            <option value="Schedule Campus Visit">Schedule a Campus Visit</option>
            <option value="Academic / Student Welfare">Academic / Student Welfare</option>
            <option value="General Inquiry">General Inquiry</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Your Message *
        </label>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can our administration team assist you and your child?"
          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#1b2a6b] resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="apple-press w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#9e3b4b] hover:bg-[#842f3d] text-white font-semibold text-sm shadow-sm transition-colors cursor-pointer disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending Message...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Message to Administration
          </>
        )}
      </button>
    </form>
  );
}
