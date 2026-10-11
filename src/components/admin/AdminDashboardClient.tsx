"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Bell,
  Calendar,
  Images,
  Inbox,
  Settings,
  Users,
  Plus,
  Trash2,
  Edit3,
  Pin,
  Upload,
  CheckCircle2,
  ExternalLink,
  LogOut,
  Save,
  Sparkles,
  Phone,
  Mail,
  Loader2,
  X,
  Star,
  AlertCircle,
} from "lucide-react";

export interface AdminProps {
  initialSettings: any;
  initialNotices: any[];
  initialEvents: any[];
  initialGallery: any[];
  initialLeaders: any[];
  initialAdmissions: any[];
  initialMessages: any[];
  initialSubscribers: any[];
}

type TabKey =
  | "overview"
  | "notices"
  | "calendar"
  | "gallery"
  | "inbox"
  | "settings";

const NOTICE_CATEGORIES = ["Admissions", "Academic", "PTA", "Events", "General"];
const EVENT_CATEGORIES = [
  "Term Date",
  "Exam",
  "PTA",
  "Sports & Culture",
  "Holiday",
];
const GALLERY_CATEGORIES = [
  "Classroom Learning",
  "STEM & Projects",
  "Sports & Physical Education",
  "Creative Arts & Culture",
  "Teachers & Leadership",
  "Events & Celebrations",
];

export function AdminDashboardClient({
  initialSettings,
  initialNotices,
  initialEvents,
  initialGallery,
  initialLeaders,
  initialAdmissions,
  initialMessages,
  initialSubscribers,
}: AdminProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );
  const [busy, setBusy] = useState(false);

  // State mirrors for immediate UI responsiveness
  const [settings, setSettings] = useState(initialSettings);
  const [notices, setNotices] = useState(initialNotices);
  const [events, setEvents] = useState(initialEvents);
  const [gallery, setGallery] = useState(initialGallery);
  const [leaders, setLeaders] = useState(initialLeaders);
  const [admissions, setAdmissions] = useState(initialAdmissions);
  const [messages, setMessages] = useState(initialMessages);

  // Notice Editor State
  const [editingNoticeId, setEditingNoticeId] = useState<string | null>(null);
  const [noticeForm, setNoticeForm] = useState({
    title: "",
    category: "Admissions",
    excerpt: "",
    content: "",
    coverImage: "/images/school/DSC_0064.jpg",
    isPinned: false,
    published: true,
  });

  // Event Editor State
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    eventDate: new Date().toISOString().slice(0, 10),
    timeString: "8:00 AM – 2:30 PM",
    location: "El-Shadai Campus, Tema Newtown Manhean",
    category: "Term Date",
  });

  // Gallery Upload State
  const [galleryFilter, setGalleryFilter] = useState("All");
  const [galleryForm, setGalleryForm] = useState({
    title: "",
    caption: "",
    category: "Classroom Learning",
    imageUrl: "",
    featured: true,
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  // Leadership Form State
  const [editingLeaderId, setEditingLeaderId] = useState<string | null>(null);
  const [leaderForm, setLeaderForm] = useState({
    name: "",
    role: "",
    bio: "",
    imageUrl: "/images/school/leader-headteacher.jpg",
    sortOrder: 5,
  });

  // Inbox Subtab
  const [inboxSubtab, setInboxSubtab] = useState<"admissions" | "messages" | "newsletter">(
    "admissions"
  );

  function showNotification(text: string, type: "success" | "error" = "success") {
    setToast({ type, text });
    setTimeout(() => setToast(null), 4000);
  }

  async function handleFileUpload(file: File): Promise<string | null> {
    setUploadingImage(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/cms", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      showNotification("Photo uploaded successfully!");
      return data.url as string;
    } catch (err: unknown) {
      showNotification(
        err instanceof Error ? err.message : "Image upload failed",
        "error"
      );
      return null;
    } finally {
      setUploadingImage(false);
    }
  }

  async function cmsAction(entity: string, action: string, data: any) {
    setBusy(true);
    try {
      const res = await fetch("/api/admin/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entity, action, data }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Operation failed");
      router.refresh();
      return json;
    } finally {
      setBusy(false);
    }
  }

  // Save Site Settings / Urgent Banner
  async function handleSaveSettings(e?: React.FormEvent) {
    if (e) e.preventDefault();
    try {
      const res = await cmsAction("settings", "update", settings);
      setSettings(res.item);
      showNotification("Website settings & content updated live!");
    } catch (err: unknown) {
      showNotification(
        err instanceof Error ? err.message : "Could not save settings",
        "error"
      );
    }
  }

  // Notice CRUD
  async function handleSaveNotice(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (editingNoticeId) {
        const res = await cmsAction("notice", "update", {
          id: editingNoticeId,
          ...noticeForm,
        });
        setNotices((prev) =>
          prev.map((n) => (n.id === editingNoticeId ? res.item : n))
        );
        setEditingNoticeId(null);
        showNotification("Notice updated on the Notice Board!");
      } else {
        const res = await cmsAction("notice", "create", noticeForm);
        setNotices((prev) => [res.item, ...prev]);
        showNotification("New notice published to the Notice Board!");
      }
      setNoticeForm({
        title: "",
        category: "Admissions",
        excerpt: "",
        content: "",
        coverImage: "/images/school/DSC_0064.jpg",
        isPinned: false,
        published: true,
      });
    } catch (err: unknown) {
      showNotification(
        err instanceof Error ? err.message : "Failed to save notice",
        "error"
      );
    }
  }

  async function handleDeleteNotice(id: string) {
    if (!confirm("Delete this notice from the website?")) return;
    try {
      await cmsAction("notice", "delete", { id });
      setNotices((prev) => prev.filter((n) => n.id !== id));
      showNotification("Notice deleted.");
    } catch {
      showNotification("Could not delete notice", "error");
    }
  }

  async function handleToggleNoticePin(notice: any) {
    try {
      const res = await cmsAction("notice", "update", {
        id: notice.id,
        isPinned: !notice.isPinned,
      });
      setNotices((prev) =>
        prev.map((n) => (n.id === notice.id ? res.item : n))
      );
      showNotification(
        res.item.isPinned ? "Pinned to top of Notice Board!" : "Notice unpinned."
      );
    } catch {
      showNotification("Failed to update pin status", "error");
    }
  }

  // Calendar Event CRUD
  async function handleSaveEvent(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (editingEventId) {
        const res = await cmsAction("event", "update", {
          id: editingEventId,
          ...eventForm,
        });
        setEvents((prev) =>
          prev.map((ev) => (ev.id === editingEventId ? res.item : ev))
        );
        setEditingEventId(null);
        showNotification("Calendar date updated!");
      } else {
        const res = await cmsAction("event", "create", eventForm);
        setEvents((prev) => [...prev, res.item]);
        showNotification("New academic date added to the calendar!");
      }
      setEventForm({
        title: "",
        description: "",
        eventDate: new Date().toISOString().slice(0, 10),
        timeString: "8:00 AM – 2:30 PM",
        location: "El-Shadai Campus, Tema Newtown Manhean",
        category: "Term Date",
      });
    } catch {
      showNotification("Failed to save calendar event", "error");
    }
  }

  async function handleDeleteEvent(id: string) {
    if (!confirm("Remove this date from the academic calendar?")) return;
    try {
      await cmsAction("event", "delete", { id });
      setEvents((prev) => prev.filter((ev) => ev.id !== id));
      showNotification("Calendar date removed.");
    } catch {
      showNotification("Could not remove calendar date", "error");
    }
  }

  // Gallery CRUD
  async function handleAddGalleryPhoto(e: React.FormEvent) {
    e.preventDefault();
    if (!galleryForm.imageUrl) {
      showNotification("Please upload a photo or paste an image URL first.", "error");
      return;
    }
    try {
      const res = await cmsAction("gallery", "create", galleryForm);
      setGallery((prev) => [res.item, ...prev]);
      setGalleryForm({
        title: "",
        caption: "",
        category: "Classroom Learning",
        imageUrl: "",
        featured: true,
      });
      showNotification("Photo added to the School Gallery!");
    } catch {
      showNotification("Failed to add gallery photo", "error");
    }
  }

  async function handleDeleteGalleryPhoto(id: string) {
    if (!confirm("Remove this photo from the gallery?")) return;
    try {
      await cmsAction("gallery", "delete", { id });
      setGallery((prev) => prev.filter((g) => g.id !== id));
      showNotification("Photo removed from gallery.");
    } catch {
      showNotification("Could not delete photo", "error");
    }
  }

  async function handleToggleGalleryFeatured(item: any) {
    try {
      const res = await cmsAction("gallery", "update", {
        id: item.id,
        featured: !item.featured,
      });
      setGallery((prev) =>
        prev.map((g) => (g.id === item.id ? res.item : g))
      );
      showNotification(
        res.item.featured
          ? "Photo featured on Homepage!"
          : "Removed from Homepage featured."
      );
    } catch {
      showNotification("Could not update photo", "error");
    }
  }

  // Leader CRUD
  async function handleSaveLeader(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (editingLeaderId) {
        const res = await cmsAction("leader", "update", {
          id: editingLeaderId,
          ...leaderForm,
        });
        setLeaders((prev) =>
          prev.map((l) => (l.id === editingLeaderId ? res.item : l))
        );
        setEditingLeaderId(null);
        showNotification("Staff/Leadership profile updated!");
      } else {
        const res = await cmsAction("leader", "create", leaderForm);
        setLeaders((prev) => [...prev, res.item]);
        showNotification("New staff/leader profile added!");
      }
      setLeaderForm({
        name: "",
        role: "",
        bio: "",
        imageUrl: "/images/school/leader-headteacher.jpg",
        sortOrder: leaders.length + 1,
      });
    } catch {
      showNotification("Failed to save staff profile", "error");
    }
  }

  async function handleDeleteLeader(id: string) {
    if (!confirm("Remove this leadership profile?")) return;
    try {
      await cmsAction("leader", "delete", { id });
      setLeaders((prev) => prev.filter((l) => l.id !== id));
      showNotification("Profile removed.");
    } catch {
      showNotification("Failed to remove profile", "error");
    }
  }

  // Admission status update
  async function handleAdmissionStatus(id: string, status: string) {
    try {
      const res = await fetch("/api/admissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setAdmissions((prev) =>
        prev.map((a) => (a.id === id ? json.application : a))
      );
      showNotification(`Application marked as ${status}`);
    } catch {
      showNotification("Failed to update application status", "error");
    }
  }

  async function handleDeleteAdmission(id: string) {
    if (!confirm("Delete this admission application?")) return;
    try {
      await fetch(`/api/admissions?id=${id}`, { method: "DELETE" });
      setAdmissions((prev) => prev.filter((a) => a.id !== id));
      showNotification("Application deleted.");
    } catch {
      showNotification("Failed to delete application", "error");
    }
  }

  async function handleToggleMessageRead(msg: any) {
    try {
      const res = await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: msg.id, isRead: !msg.isRead }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error();
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? json.item : m))
      );
    } catch {
      showNotification("Could not update message", "error");
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  const filteredGallery =
    galleryFilter === "All"
      ? gallery
      : gallery.filter((g) => g.category === galleryFilter);

  const pendingAdmissionsCount = admissions.filter(
    (a) => a.status === "Pending"
  ).length;
  const unreadMessagesCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-900 flex flex-col">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-[#071636] text-white border-b border-white/10 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/images/school/logo.jpg"
              alt="El-Shadai Logo"
              className="w-10 h-10 rounded-xl object-cover border border-white/20"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-base sm:text-lg text-white">
                  El-Shadai CMS
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#fbbf24] text-slate-950">
                  Admin Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-300 hidden sm:block">
                No-Code Website Manager • Changes publish immediately
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              target="_blank"
              className="apple-press inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="apple-press inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-200 text-xs font-semibold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-[#0b2358] border-t border-white/10 overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 py-2">
            {[
              {
                id: "overview" as TabKey,
                label: "Overview & Top Banner",
                icon: LayoutDashboard,
              },
              {
                id: "notices" as TabKey,
                label: `Notice Board (${notices.length})`,
                icon: Bell,
              },
              {
                id: "calendar" as TabKey,
                label: `Calendar & Dates (${events.length})`,
                icon: Calendar,
              },
              {
                id: "gallery" as TabKey,
                label: `Photo Gallery (${gallery.length})`,
                icon: Images,
              },
              {
                id: "inbox" as TabKey,
                label: "Admissions & Inbox",
                icon: Inbox,
                badge: pendingAdmissionsCount + unreadMessagesCount,
              },
              {
                id: "settings" as TabKey,
                label: "Pages, Staff & Settings",
                icon: Settings,
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`apple-press flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    active
                      ? "bg-[#1559ed] text-white shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.badge ? (
                    <span className="px-1.5 py-0.5 rounded-full bg-[#fbbf24] text-slate-950 text-[10px] font-bold">
                      {tab.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm">
          <div
            className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border text-xs font-semibold ${
              toast.type === "error"
                ? "bg-red-950 text-red-100 border-red-700"
                : "bg-slate-900 text-white border-slate-700"
            }`}
          >
            {toast.type === "error" ? (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span>{toast.text}</span>
          </div>
        </div>
      )}

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {/* ==================== TAB 1: OVERVIEW & URGENT BANNER ==================== */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <button
                type="button"
                onClick={() => setActiveTab("notices")}
                className="apple-press bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs text-left hover:border-blue-300 transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#1559ed] flex items-center justify-center mb-3">
                  <Bell className="w-5 h-5" />
                </div>
                <p className="font-display font-bold text-2xl text-slate-900">
                  {notices.length}
                </p>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">
                  Published Notices
                </p>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("calendar")}
                className="apple-press bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs text-left hover:border-amber-300 transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                  <Calendar className="w-5 h-5" />
                </div>
                <p className="font-display font-bold text-2xl text-slate-900">
                  {events.length}
                </p>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">
                  Calendar Dates
                </p>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("gallery")}
                className="apple-press bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs text-left hover:border-emerald-300 transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                  <Images className="w-5 h-5" />
                </div>
                <p className="font-display font-bold text-2xl text-slate-900">
                  {gallery.length}
                </p>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">
                  Gallery Photos
                </p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("inbox");
                  setInboxSubtab("admissions");
                }}
                className="apple-press bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs text-left hover:border-purple-300 transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <p className="font-display font-bold text-2xl text-slate-900">
                  {admissions.length}
                </p>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">
                  Admission Applications
                </p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("inbox");
                  setInboxSubtab("messages");
                }}
                className="apple-press bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs text-left hover:border-rose-300 transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
                  <Inbox className="w-5 h-5" />
                </div>
                <p className="font-display font-bold text-2xl text-slate-900">
                  {messages.length}
                </p>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">
                  Parent Inquiries
                </p>
              </button>
            </div>

            {/* Quick Actions Bar */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <h2 className="font-display font-bold text-xl text-slate-900 mb-1">
                What would you like to update today?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mb-5">
                Click any button below to add announcements, calendar dates, or campus photos without writing any code.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("notices")}
                  className="apple-press inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#1559ed] text-white text-xs font-semibold shadow-sm hover:bg-[#0b3ea8] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Post a New Notice
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("calendar")}
                  className="apple-press inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 text-slate-950 text-xs font-bold shadow-sm hover:bg-amber-400 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  Add Academic Calendar Date
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("gallery")}
                  className="apple-press inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 text-white text-xs font-semibold shadow-sm hover:bg-emerald-700 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  Upload Photos to Gallery
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("settings")}
                  className="apple-press inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 text-slate-800 text-xs font-semibold hover:bg-slate-200 cursor-pointer"
                >
                  <Settings className="w-4 h-4" />
                  Edit Phone Numbers, Text &amp; Staff
                </button>
              </div>
            </div>

            {/* Instant Urgent Top Announcement Bar Editor */}
            <form
              onSubmit={handleSaveSettings}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1559ed]">
                    <Sparkles className="w-3.5 h-3.5" /> Website Top Ribbon
                  </span>
                  <h3 className="font-display font-bold text-xl text-slate-900 mt-0.5">
                    Urgent Announcement Banner
                  </h3>
                  <p className="text-xs text-slate-500">
                    This banner appears at the very top of every page on the website for important announcements.
                  </p>
                </div>
                <label className="inline-flex items-center gap-2.5 cursor-pointer bg-slate-100 px-4 py-2.5 rounded-2xl">
                  <input
                    type="checkbox"
                    checked={Boolean(settings.urgentBannerActive)}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        urgentBannerActive: e.target.checked,
                      })
                    }
                    className="w-4 h-4 accent-[#1559ed] rounded"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    {settings.urgentBannerActive ? "Banner Active" : "Banner Hidden"}
                  </span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Banner Announcement Text
                  </label>
                  <input
                    type="text"
                    value={settings.urgentBannerText || ""}
                    onChange={(e) =>
                      setSettings({ ...settings, urgentBannerText: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                    placeholder="e.g., Admissions Open for 2026/2027 — Apply Online Today!"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Action Link (Optional)
                  </label>
                  <input
                    type="text"
                    value={settings.urgentBannerLink || ""}
                    onChange={(e) =>
                      setSettings({ ...settings, urgentBannerLink: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                    placeholder="/admission or /notice"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={busy}
                className="apple-press inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#071636] hover:bg-[#1559ed] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" />
                Save Top Banner
              </button>
            </form>
          </div>
        )}

        {/* ==================== TAB 2: NOTICE BOARD MANAGER ==================== */}
        {activeTab === "notices" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Notice Form */}
            <form
              onSubmit={handleSaveNotice}
              className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4 sticky top-32"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display font-bold text-xl text-slate-900">
                  {editingNoticeId ? "Edit Notice" : "Publish New Notice"}
                </h2>
                {editingNoticeId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingNoticeId(null);
                      setNoticeForm({
                        title: "",
                        category: "Admissions",
                        excerpt: "",
                        content: "",
                        coverImage: "/images/school/DSC_0064.jpg",
                        isPinned: false,
                        published: true,
                      });
                    }}
                    className="text-xs text-slate-500 hover:text-slate-800 inline-flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" /> Cancel Edit
                  </button>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Notice Title *
                </label>
                <input
                  type="text"
                  required
                  value={noticeForm.title}
                  onChange={(e) =>
                    setNoticeForm({ ...noticeForm, title: e.target.value })
                  }
                  placeholder="e.g., Mid-Term Break & Resumption Notice"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={noticeForm.category}
                    onChange={(e) =>
                      setNoticeForm({ ...noticeForm, category: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                  >
                    {NOTICE_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer px-3.5 py-2.5 rounded-xl bg-amber-50 border border-amber-200 w-full">
                    <input
                      type="checkbox"
                      checked={noticeForm.isPinned}
                      onChange={(e) =>
                        setNoticeForm({ ...noticeForm, isPinned: e.target.checked })
                      }
                      className="w-4 h-4 accent-amber-600"
                    />
                    <span className="text-xs font-bold text-amber-900">
                      Pin to Top
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Short Summary (Displayed on Cards) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={noticeForm.excerpt}
                  onChange={(e) =>
                    setNoticeForm({ ...noticeForm, excerpt: e.target.value })
                  }
                  placeholder="Brief 1-2 sentence overview for parents..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Announcement Details *
                </label>
                <textarea
                  rows={6}
                  required
                  value={noticeForm.content}
                  onChange={(e) =>
                    setNoticeForm({ ...noticeForm, content: e.target.value })
                  }
                  placeholder="Write the full notice message here..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Cover Photo (Upload or URL)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={noticeForm.coverImage}
                    onChange={(e) =>
                      setNoticeForm({ ...noticeForm, coverImage: e.target.value })
                    }
                    className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  />
                  <label className="apple-press px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold cursor-pointer inline-flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const url = await handleFileUpload(file);
                        if (url) {
                          setNoticeForm((prev) => ({ ...prev, coverImage: url }));
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={busy || uploadingImage}
                className="apple-press w-full py-3.5 rounded-2xl bg-[#1559ed] hover:bg-[#0b3ea8] text-white font-semibold text-xs shadow-lg shadow-blue-600/20 transition-colors cursor-pointer"
              >
                {editingNoticeId ? "Save Changes to Notice" : "Publish Notice Now"}
              </button>
            </form>

            {/* Existing Notices List */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-display font-bold text-lg text-slate-900">
                All Notices on Notice Board ({notices.length})
              </h3>
              {notices.map((notice) => (
                <div
                  key={notice.id}
                  className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row gap-4 justify-between"
                >
                  <div className="flex gap-4">
                    <img
                      src={notice.coverImage || "/images/school/DSC_0064.jpg"}
                      alt={notice.title}
                      className="w-20 h-20 rounded-2xl object-cover shrink-0 bg-slate-100"
                    />
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1559ed] text-[10px] font-bold uppercase">
                          {notice.category}
                        </span>
                        {notice.isPinned && (
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                            Pinned
                          </span>
                        )}
                        <span className="text-[11px] text-slate-400">
                          {new Date(notice.publishedAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-base text-slate-900">
                        {notice.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                        {notice.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-end gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleToggleNoticePin(notice)}
                      className={`apple-press px-3 py-1.5 rounded-xl text-xs font-semibold inline-flex items-center gap-1 cursor-pointer ${
                        notice.isPinned
                          ? "bg-amber-100 text-amber-900"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      <Pin className="w-3 h-3" />
                      {notice.isPinned ? "Unpin" : "Pin"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingNoticeId(notice.id);
                        setNoticeForm({
                          title: notice.title,
                          category: notice.category,
                          excerpt: notice.excerpt,
                          content: notice.content,
                          coverImage:
                            notice.coverImage || "/images/school/DSC_0064.jpg",
                          isPinned: Boolean(notice.isPinned),
                          published: Boolean(notice.published),
                        });
                      }}
                      className="apple-press px-3 py-1.5 rounded-xl bg-blue-50 text-[#1559ed] hover:bg-blue-100 text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" /> Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteNotice(notice.id)}
                      className="apple-press px-3 py-1.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB 3: ACADEMIC CALENDAR & DATES ==================== */}
        {activeTab === "calendar" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Add / Edit Date Form */}
            <form
              onSubmit={handleSaveEvent}
              className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4 sticky top-32"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display font-bold text-xl text-slate-900">
                  {editingEventId ? "Edit Calendar Date" : "Add Academic Date"}
                </h2>
                {editingEventId && (
                  <button
                    type="button"
                    onClick={() => setEditingEventId(null)}
                    className="text-xs text-slate-500 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Event / Term Date Title *
                </label>
                <input
                  type="text"
                  required
                  value={eventForm.title}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, title: e.target.value })
                  }
                  placeholder="e.g., First Term Resumption / PTA Meeting"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={eventForm.eventDate}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, eventDate: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={eventForm.category}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, category: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                  >
                    {EVENT_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Time (Optional)
                  </label>
                  <input
                    type="text"
                    value={eventForm.timeString}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, timeString: e.target.value })
                    }
                    placeholder="8:00 AM – 2:30 PM"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Venue / Location
                  </label>
                  <input
                    type="text"
                    value={eventForm.location}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, location: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={3}
                  value={eventForm.description}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, description: e.target.value })
                  }
                  placeholder="Details for parents and students..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={busy}
                className="apple-press w-full py-3.5 rounded-2xl bg-[#1559ed] hover:bg-[#0b3ea8] text-white font-semibold text-xs shadow-lg shadow-blue-600/20 transition-colors cursor-pointer"
              >
                {editingEventId ? "Update Calendar Date" : "Add Date to Calendar"}
              </button>
            </form>

            {/* Calendar Events List */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-display font-bold text-lg text-slate-900">
                Upcoming School Calendar Dates ({events.length})
              </h3>
              {events.map((ev) => {
                const d = new Date(ev.eventDate);
                return (
                  <div
                    key={ev.id}
                    className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#071636] text-white flex flex-col items-center justify-center shrink-0">
                        <span className="text-[10px] font-bold uppercase text-[#fbbf24]">
                          {d.toLocaleDateString("en-GB", { month: "short" })}
                        </span>
                        <span className="font-display font-bold text-lg leading-none">
                          {d.getDate()}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#1559ed]">
                          {ev.category}
                        </span>
                        <h4 className="font-display font-bold text-base text-slate-900">
                          {ev.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {ev.timeString} • {ev.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingEventId(ev.id);
                          setEventForm({
                            title: ev.title,
                            description: ev.description || "",
                            eventDate: new Date(ev.eventDate)
                              .toISOString()
                              .slice(0, 10),
                            timeString: ev.timeString || "",
                            location: ev.location || "",
                            category: ev.category || "Term Date",
                          });
                        }}
                        className="apple-press p-2 rounded-xl bg-blue-50 text-[#1559ed] hover:bg-blue-100 cursor-pointer"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteEvent(ev.id)}
                        className="apple-press p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================== TAB 4: PHOTO GALLERY MANAGER ==================== */}
        {activeTab === "gallery" && (
          <div className="space-y-8">
            {/* Upload New Photo Box */}
            <form
              onSubmit={handleAddGalleryPhoto}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs"
            >
              <h2 className="font-display font-bold text-xl text-slate-900 mb-1">
                Upload New Photo to School Gallery
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Select a picture from your computer or phone. It will be uploaded directly and shown in the Gallery.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Upload Dropzone */}
                <div className="md:col-span-4">
                  <label className="flex flex-col items-center justify-center h-44 rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50/50 hover:bg-blue-50 transition-colors cursor-pointer p-4 text-center relative overflow-hidden">
                    {galleryForm.imageUrl ? (
                      <img
                        src={galleryForm.imageUrl}
                        alt="Preview"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : uploadingImage ? (
                      <div className="flex flex-col items-center gap-2 text-[#1559ed]">
                        <Loader2 className="w-7 h-7 animate-spin" />
                        <span className="text-xs font-bold">
                          Uploading photo...
                        </span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-[#1559ed] mb-2" />
                        <span className="text-xs font-bold text-slate-800">
                          Click to Choose Photo
                        </span>
                        <span className="text-[11px] text-slate-500 mt-1">
                          JPG, PNG, WebP (Max 4.5MB)
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const url = await handleFileUpload(file);
                        if (url) {
                          setGalleryForm((prev) => ({
                            ...prev,
                            imageUrl: url,
                            title:
                              prev.title ||
                              file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
                          }));
                        }
                      }}
                    />
                  </label>
                </div>

                {/* Fields */}
                <div className="md:col-span-8 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Photo Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={galleryForm.title}
                        onChange={(e) =>
                          setGalleryForm({ ...galleryForm, title: e.target.value })
                        }
                        placeholder="e.g., Science Lab Practical Session"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Album / Category
                      </label>
                      <select
                        value={galleryForm.category}
                        onChange={(e) =>
                          setGalleryForm({
                            ...galleryForm,
                            category: e.target.value,
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                      >
                        {GALLERY_CATEGORIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Caption / Description (Optional)
                    </label>
                    <input
                      type="text"
                      value={galleryForm.caption}
                      onChange={(e) =>
                        setGalleryForm({ ...galleryForm, caption: e.target.value })
                      }
                      placeholder="Short description of what is happening in the photo..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={galleryForm.featured}
                        onChange={(e) =>
                          setGalleryForm({
                            ...galleryForm,
                            featured: e.target.checked,
                          })
                        }
                        className="w-4 h-4 accent-[#1559ed]"
                      />
                      <span className="text-xs font-semibold text-slate-700">
                        Feature this photo on Homepage
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={busy || uploadingImage}
                      className="apple-press inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#1559ed] hover:bg-[#0b3ea8] text-white text-xs font-semibold shadow-md cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      Add Photo to Gallery
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Filter & Grid */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Manage Gallery Photos ({filteredGallery.length})
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {["All", ...GALLERY_CATEGORIES].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setGalleryFilter(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ${
                        galleryFilter === cat
                          ? "bg-[#1559ed] text-white"
                          : "bg-white text-slate-600 border border-slate-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredGallery.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs group flex flex-col justify-between"
                  >
                    <div className="relative h-44 bg-slate-100">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-900/75 text-white text-[10px] font-semibold backdrop-blur-xs">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-3.5 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-bold text-xs text-slate-900 truncate">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate">
                          {item.caption || "El-Shadai Campus"}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleToggleGalleryFeatured(item)}
                          title="Toggle Homepage Featured"
                          className={`p-1.5 rounded-lg cursor-pointer ${
                            item.featured
                              ? "bg-amber-100 text-amber-600"
                              : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          <Star className="w-3.5 h-3.5 fill-current" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteGalleryPhoto(item.id)}
                          title="Delete Photo"
                          className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 5: ADMISSIONS & INBOX ==================== */}
        {activeTab === "inbox" && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl border border-slate-200 w-fit">
              <button
                type="button"
                onClick={() => setInboxSubtab("admissions")}
                className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                  inboxSubtab === "admissions"
                    ? "bg-[#1559ed] text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Online Admission Applications ({admissions.length})
              </button>
              <button
                type="button"
                onClick={() => setInboxSubtab("messages")}
                className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                  inboxSubtab === "messages"
                    ? "bg-[#1559ed] text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Contact Form Messages ({messages.length})
              </button>
              <button
                type="button"
                onClick={() => setInboxSubtab("newsletter")}
                className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                  inboxSubtab === "newsletter"
                    ? "bg-[#1559ed] text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Newsletter Subscribers ({initialSubscribers.length})
              </button>
            </div>

            {inboxSubtab === "admissions" && (
              <div className="space-y-4">
                {admissions.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                    <p className="font-display font-bold text-lg text-slate-800">
                      No Online Admission Applications Yet
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      When parents submit the online application on{" "}
                      <code>/admission</code>, their details will appear here automatically.
                    </p>
                  </div>
                ) : (
                  admissions.map((app) => (
                    <div
                      key={app.id}
                      className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col lg:flex-row justify-between gap-6"
                    >
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800">
                            {app.referenceNumber}
                          </span>
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                              app.status === "Admitted"
                                ? "bg-emerald-100 text-emerald-800"
                                : app.status === "Reviewed"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {app.status}
                          </span>
                          <span className="text-xs text-slate-400">
                            Submitted{" "}
                            {new Date(app.createdAt).toLocaleDateString("en-GB")}
                          </span>
                        </div>

                        <h3 className="font-display font-bold text-xl text-slate-900">
                          {app.studentFirstName} {app.studentLastName}{" "}
                          <span className="text-sm font-normal text-slate-500">
                            ({app.gender}, DOB: {app.dateOfBirth})
                          </span>
                        </h3>

                        <p className="text-xs font-semibold text-[#1559ed]">
                          Applying For: {app.levelApplying} — {app.gradeClass}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-slate-600 pt-2">
                          <p>
                            <strong>Guardian:</strong> {app.guardianName} (
                            {app.guardianRelation})
                          </p>
                          <p>
                            <strong>Phone:</strong> {app.guardianPhone}
                          </p>
                          <p>
                            <strong>Address:</strong> {app.residentialAddress}
                          </p>
                          {app.previousSchool && (
                            <p>
                              <strong>Previous School:</strong> {app.previousSchool}
                            </p>
                          )}
                        </div>
                        {app.medicalNotes && (
                          <p className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl">
                            <strong>Notes:</strong> {app.medicalNotes}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-wrap lg:flex-col items-end justify-between gap-2 shrink-0">
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${app.guardianPhone}`}
                            className="apple-press px-3 py-2 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-semibold inline-flex items-center gap-1.5"
                          >
                            <Phone className="w-3.5 h-3.5" /> Call Parent
                          </a>
                          <select
                            value={app.status}
                            onChange={(e) =>
                              handleAdmissionStatus(app.id, e.target.value)
                            }
                            className="px-3 py-2 rounded-xl bg-slate-100 text-xs font-bold text-slate-800 border border-slate-200"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Reviewed">Reviewed</option>
                            <option value="Admitted">Admitted</option>
                            <option value="Waitlisted">Waitlisted</option>
                          </select>
                          <button
                            type="button"
                            onClick={() => handleDeleteAdmission(app.id)}
                            className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {inboxSubtab === "messages" && (
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                    <p className="font-display font-bold text-lg text-slate-800">
                      No Contact Messages Yet
                    </p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`bg-white rounded-3xl p-6 border shadow-xs flex flex-col sm:flex-row justify-between gap-4 ${
                        msg.isRead ? "border-slate-200/80" : "border-blue-400"
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {!msg.isRead && (
                            <span className="px-2 py-0.5 rounded-full bg-[#1559ed] text-white text-[10px] font-bold">
                              NEW
                            </span>
                          )}
                          <span className="text-xs font-bold text-slate-900">
                            {msg.subject}
                          </span>
                          <span className="text-xs text-slate-400">
                            • {new Date(msg.createdAt).toLocaleDateString("en-GB")}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-slate-600">
                          From: {msg.name} ({msg.email}{" "}
                          {msg.phone ? `• ${msg.phone}` : ""})
                        </p>
                        <p className="text-sm text-slate-700 mt-2 whitespace-pre-line">
                          {msg.message}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 self-start">
                        <button
                          type="button"
                          onClick={() => handleToggleMessageRead(msg)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-semibold text-slate-700 cursor-pointer"
                        >
                          {msg.isRead ? "Mark Unread" : "Mark Read"}
                        </button>
                        <a
                          href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                          className="px-3 py-1.5 rounded-xl bg-blue-50 text-[#1559ed] text-xs font-semibold inline-flex items-center gap-1"
                        >
                          <Mail className="w-3.5 h-3.5" /> Reply
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {inboxSubtab === "newsletter" && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200">
                <h3 className="font-display font-bold text-lg text-slate-900 mb-4">
                  Parent Newsletter Subscribers ({initialSubscribers.length})
                </h3>
                {initialSubscribers.length === 0 ? (
                  <p className="text-xs text-slate-500">No subscribers yet.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {initialSubscribers.map((sub: any) => (
                      <div
                        key={sub.id}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 flex items-center justify-between"
                      >
                        <span>{sub.email}</span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(sub.createdAt).toLocaleDateString("en-GB")}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 6: SITE SETTINGS & LEADERSHIP ==================== */}
        {activeTab === "settings" && (
          <div className="space-y-10">
            {/* School General Settings & Copy Form */}
            <form
              onSubmit={handleSaveSettings}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="font-display font-bold text-xl text-slate-900">
                    Website Text, Contact Phones &amp; Headteacher Welcome
                  </h2>
                  <p className="text-xs text-slate-500">
                    Edit any school information below and click Save to update the entire website.
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={busy}
                  className="apple-press inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#1559ed] hover:bg-[#0b3ea8] text-white text-xs font-semibold shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  Save All Website Settings
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    School Name
                  </label>
                  <input
                    type="text"
                    value={settings.schoolName || ""}
                    onChange={(e) =>
                      setSettings({ ...settings, schoolName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    School Motto
                  </label>
                  <input
                    type="text"
                    value={settings.motto || ""}
                    onChange={(e) =>
                      setSettings({ ...settings, motto: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Homepage Hero Title
                  </label>
                  <input
                    type="text"
                    value={settings.heroTitle || ""}
                    onChange={(e) =>
                      setSettings({ ...settings, heroTitle: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Homepage Hero Subtitle
                  </label>
                  <input
                    type="text"
                    value={settings.heroSubtitle || ""}
                    onChange={(e) =>
                      setSettings({ ...settings, heroSubtitle: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                  />
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary Phone
                  </label>
                  <input
                    type="text"
                    value={settings.phonePrimary || ""}
                    onChange={(e) =>
                      setSettings({ ...settings, phonePrimary: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Secondary Phone
                  </label>
                  <input
                    type="text"
                    value={settings.phoneSecondary || ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        phoneSecondary: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Official Email
                  </label>
                  <input
                    type="text"
                    value={settings.emailInfo || ""}
                    onChange={(e) =>
                      setSettings({ ...settings, emailInfo: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Campus Address
                  </label>
                  <input
                    type="text"
                    value={settings.address || ""}
                    onChange={(e) =>
                      setSettings({ ...settings, address: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                  />
                </div>
              </div>

              {/* Headteacher Welcome & About */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Headteacher Full Name
                  </label>
                  <input
                    type="text"
                    value={settings.headteacherName || ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        headteacherName: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm mb-3"
                  />
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Headteacher Welcome Message
                  </label>
                  <textarea
                    rows={4}
                    value={settings.headteacherMessage || ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        headteacherMessage: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    About Us Summary Story
                  </label>
                  <textarea
                    rows={7}
                    value={settings.aboutSummary || ""}
                    onChange={(e) =>
                      setSettings({ ...settings, aboutSummary: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                  />
                </div>
              </div>
            </form>

            {/* Leadership & Staff Team Manager */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <form
                onSubmit={handleSaveLeader}
                className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4"
              >
                <h3 className="font-display font-bold text-lg text-slate-900">
                  {editingLeaderId
                    ? "Edit Leadership Profile"
                    : "Add Leadership / Staff Member"}
                </h3>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={leaderForm.name}
                    onChange={(e) =>
                      setLeaderForm({ ...leaderForm, name: e.target.value })
                    }
                    placeholder="e.g., Mrs. Elisabeth Afua Quarshie Ackwornu"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Role / Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={leaderForm.role}
                    onChange={(e) =>
                      setLeaderForm({ ...leaderForm, role: e.target.value })
                    }
                    placeholder="e.g., Headteacher / Computing Teacher"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Short Bio
                  </label>
                  <textarea
                    rows={3}
                    value={leaderForm.bio}
                    onChange={(e) =>
                      setLeaderForm({ ...leaderForm, bio: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Portrait Photo
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={leaderForm.imageUrl}
                      onChange={(e) =>
                        setLeaderForm({ ...leaderForm, imageUrl: e.target.value })
                      }
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                    />
                    <label className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold cursor-pointer inline-flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5" /> Upload
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const url = await handleFileUpload(file);
                          if (url) {
                            setLeaderForm((prev) => ({ ...prev, imageUrl: url }));
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={busy}
                  className="apple-press w-full py-3 rounded-2xl bg-[#1559ed] text-white text-xs font-semibold cursor-pointer"
                >
                  {editingLeaderId ? "Update Profile" : "Add Staff Member"}
                </button>
              </form>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {leaders.map((leader) => (
                  <div
                    key={leader.id}
                    className="bg-white rounded-3xl p-4 border border-slate-200 flex items-center gap-4 justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={leader.imageUrl}
                        alt={leader.name}
                        className="w-14 h-14 rounded-2xl object-cover object-top"
                      />
                      <div>
                        <p className="font-bold text-xs text-slate-900">
                          {leader.name}
                        </p>
                        <p className="text-[11px] font-semibold text-[#1559ed]">
                          {leader.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingLeaderId(leader.id);
                          setLeaderForm({
                            name: leader.name,
                            role: leader.role,
                            bio: leader.bio || "",
                            imageUrl: leader.imageUrl,
                            sortOrder: leader.sortOrder || 1,
                          });
                        }}
                        className="p-2 rounded-xl bg-blue-50 text-[#1559ed] cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteLeader(leader.id)}
                        className="p-2 rounded-xl bg-red-50 text-red-600 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
