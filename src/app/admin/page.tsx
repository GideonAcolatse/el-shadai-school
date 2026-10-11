import React from "react";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  getSiteSettings,
  getNotices,
  getUpcomingEvents,
  getGalleryItems,
  getLeaders,
} from "@/lib/cms";
import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin CMS Dashboard | El-Shadai School",
};

export default async function AdminPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    redirect("/admin/login");
  }

  const [
    settings,
    notices,
    events,
    gallery,
    leaders,
    admissions,
    messages,
    subscribers,
  ] = await Promise.all([
    getSiteSettings(),
    prisma.notice.findMany({
      orderBy: [{ isPinned: "desc" }, { publishedAt: "desc" }],
    }).catch(() => getNotices()),
    prisma.schoolEvent.findMany({
      orderBy: { eventDate: "asc" },
    }).catch(() => getUpcomingEvents()),
    prisma.galleryItem.findMany({
      orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
    }).catch(() => getGalleryItems()),
    prisma.leaderMember.findMany({
      orderBy: { sortOrder: "asc" },
    }).catch(() => getLeaders()),
    prisma.admissionApplication.findMany({
      orderBy: { createdAt: "desc" },
    }).catch(() => []),
    prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    }).catch(() => []),
    prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: "desc" },
    }).catch(() => []),
  ]);

  return (
    <AdminDashboardClient
      initialSettings={settings}
      initialNotices={notices}
      initialEvents={events}
      initialGallery={gallery}
      initialLeaders={leaders}
      initialAdmissions={admissions}
      initialMessages={messages}
      initialSubscribers={subscribers}
    />
  );
}
