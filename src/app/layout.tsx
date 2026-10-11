import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "El-Shadai School | Let Your Light Shine | Tema, Ghana",
    template: "%s | El-Shadai School",
  },
  description:
    "Providing quality private education across Preschool, Primary, and Junior High School in Tema Newtown Manhean, Ghana. Nurturing future leaders with knowledge, discipline, and integrity.",
  keywords: [
    "El-Shadai School",
    "Tema Newtown Manhean",
    "School in Tema Ghana",
    "Preschool Tema",
    "Primary School Tema",
    "Junior High School Tema",
    "Private School Ghana",
  ],
  icons: {
    icon: "/images/school/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased selection:bg-[#1b2a6b]/15 selection:text-[#1b2a6b]">
        {children}
      </body>
    </html>
  );
}
