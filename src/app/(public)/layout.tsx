import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSiteSettings, getUpcomingEvents } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, events] = await Promise.all([
    getSiteSettings(),
    getUpcomingEvents(1),
  ]);

  const nextEvent = events[0] ?? null;
  const formattedNextDate = nextEvent
    ? new Date(nextEvent.eventDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      })
    : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        schoolName={settings.schoolName}
        motto={settings.motto}
        phonePrimary={settings.phonePrimary}
        urgentBannerActive={settings.urgentBannerActive}
        urgentBannerText={settings.urgentBannerText}
        urgentBannerLink={settings.urgentBannerLink}
        nextEventTitle={nextEvent?.title}
        nextEventDate={formattedNextDate}
      />
      <main className="flex-1">{children}</main>
      <Footer
        schoolName={settings.schoolName}
        motto={settings.motto}
        address={settings.address}
        phonePrimary={settings.phonePrimary}
        phoneSecondary={settings.phoneSecondary}
        emailInfo={settings.emailInfo}
        emailAdmissions={settings.emailAdmissions}
        facebookUrl={settings.facebookUrl}
      />
    </div>
  );
}
