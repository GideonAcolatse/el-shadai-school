import React from "react";
import { getSiteSettings } from "@/lib/cms";
import { ContactForm } from "@/components/forms/ContactForm";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
  ExternalLink,
  Navigation,
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Contact Us | El-Shadai School — Tema Newtown Manhean",
  description:
    "Get in touch with El-Shadai School in Tema Newtown Manhean, Ghana. Call +233 (0) 244 72 1828 or +233 (0) 244 13 4854, or send us a message online.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-24">
      {/* Hero Banner */}
      <section className="relative bg-[#071636] text-white pt-16 pb-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: "url(/images/school/DSC_0064.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071636]/90 via-[#071636]/95 to-[#071636]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#fbbf24] text-xs font-bold uppercase tracking-widest mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            We’d Love to Hear From You
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white max-w-3xl mx-auto">
            Contact El-Shadai School
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
            Whether you are inquiring about Preschool, Primary, or Junior High admissions, scheduling a campus tour, or speaking with our administration, we are here to help.
          </p>
        </div>
      </section>

      {/* Contact Cards + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        {/* 4 Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-lg shadow-slate-900/5">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#1559ed] flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5" />
            </div>
            <h2 className="font-display font-bold text-base text-slate-900">
              Campus Location
            </h2>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              {settings.address}
            </p>
            <a
              href="https://maps.google.com/?q=Tema+Newtown+Manhean+Ghana"
              target="_blank"
              rel="noopener noreferrer"
              className="apple-press inline-flex items-center gap-1 text-xs font-semibold text-[#1559ed] mt-3"
            >
              Open in Google Maps <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-lg shadow-slate-900/5">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <Phone className="w-5 h-5" />
            </div>
            <h2 className="font-display font-bold text-base text-slate-900">
              Direct Phone Lines
            </h2>
            <div className="mt-2 space-y-1 text-xs font-semibold text-slate-700">
              <a
                href={`tel:${settings.phonePrimary.replace(/[^+\d]/g, "")}`}
                className="block hover:text-[#1559ed] transition-colors"
              >
                {settings.phonePrimary}
              </a>
              <a
                href={`tel:${settings.phoneSecondary.replace(/[^+\d]/g, "")}`}
                className="block hover:text-[#1559ed] transition-colors"
              >
                {settings.phoneSecondary}
              </a>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Call or WhatsApp during school hours
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-lg shadow-slate-900/5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Mail className="w-5 h-5" />
            </div>
            <h2 className="font-display font-bold text-base text-slate-900">
              Official Email
            </h2>
            <div className="mt-2 space-y-1 text-xs font-semibold text-slate-700">
              <a
                href={`mailto:${settings.emailInfo}`}
                className="block hover:text-[#1559ed] transition-colors break-all"
              >
                {settings.emailInfo}
              </a>
              <a
                href={`mailto:${settings.emailAdmissions}`}
                className="block hover:text-[#1559ed] transition-colors break-all"
              >
                {settings.emailAdmissions}
              </a>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Admissions &amp; general correspondence
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-lg shadow-slate-900/5">
            <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h2 className="font-display font-bold text-base text-slate-900">
              Administration Hours
            </h2>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Monday – Friday: <strong className="text-slate-900">7:00 AM – 4:00 PM</strong>
            </p>
            <p className="text-[11px] text-slate-400 mt-2">
              Closed on Weekends &amp; Public Holidays
            </p>
          </div>
        </div>

        {/* Main Grid: Form + Campus Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl shadow-slate-900/5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1559ed]">
              Send an Inquiry
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mt-1 mb-2">
              Message Our Administration
            </h2>
            <p className="text-sm text-slate-600 mb-6">
              Fill out the form below and your message will go directly to the school administration inbox.
            </p>
            <ContactForm />
          </div>

          {/* Campus Map & Visual Location Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xl shadow-slate-900/5 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1559ed]">
                    Visit Our Campus
                  </span>
                  <h3 className="font-display font-bold text-lg text-slate-900">
                    Tema Newtown Manhean
                  </h3>
                </div>
                <span className="w-9 h-9 rounded-xl bg-blue-50 text-[#1559ed] flex items-center justify-center">
                  <Navigation className="w-4 h-4" />
                </span>
              </div>

              {/* Embedded Interactive Google Map */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 h-64 bg-slate-100 relative">
                <iframe
                  title="El-Shadai School Tema Newtown Manhean Map"
                  src="https://www.google.com/maps?q=Tema+Newtown+Manhean,+Ghana&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Saved Original Campus Map Image Preview */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3.5">
                <img
                  src="/images/school/campus-map.jpg"
                  alt="Tema Newtown Manhean Campus Reference Map"
                  className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                />
                <div>
                  <p className="text-xs font-bold text-slate-900">
                    Schedule an In-Person Tour
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Parents and guardians are warmly welcome to visit our campus in Tema Newtown Manhean to meet our teachers and tour our classrooms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
