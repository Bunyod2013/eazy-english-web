import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { ConvexClientProvider } from "@/components/convex-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import localFont from "next/font/local";
import "./globals.css";

const fredoka = localFont({
  src: [
    {path: "../public/fonts/FredokaOne-Regular.ttf", weight: "1000", style: "normal"},
  ],
  variable: "--font-fredoka",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://eazy-english.uz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "EazyEnglish - Ingliz tilini o'yin orqali o'rganing | Eazy English UZ",
    template: "%s | EazyEnglish",
  },
  description:
    "EazyEnglish (Eazy English UZ) — Ingliz tilini o'yin orqali o'rganing. Bepul. Qiziqarli. Samarali. Kuniga 15 daqiqa. EasyEnglish UZ — learn English through gamified lessons, free, fun, and effective.",
  keywords: [
    "eazyenglish",
    "eazyenglishuz",
    "eazy english",
    "eazy english uz",
    "easyenglish",
    "easyenglishuz",
    "easy english uz",
    "easy english",
    "ingliz tili",
    "ingliz tili o'rganish",
    "learn english",
    "english o'rganish",
    "ingliz tili online",
    "bepul ingliz tili",
    "english learning app",
    "uzbekistan english",
    "ingliz tili dasturi",
    "o'yin orqali o'rganish",
    "gamified english",
    "EazyEnglish",
  ],
  authors: [{ name: "EazyEnglish" }],
  creator: "EazyEnglish",
  publisher: "EazyEnglish",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    alternateLocale: ["en_US", "ru_RU"],
    url: siteUrl,
    siteName: "EazyEnglish",
    title: "EazyEnglish - Ingliz tilini o'yin orqali o'rganing",
    description:
      "Ingliz tilini o'yin orqali o'rganing. Bepul. Qiziqarli. Samarali. Kuniga 15 daqiqa.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EazyEnglish - Ingliz tilini o'yin orqali o'rganing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EazyEnglish - Ingliz tilini o'yin orqali o'rganing",
    description:
      "Ingliz tilini o'yin orqali o'rganing. Bepul. Qiziqarli. Samarali.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/eazyenglish-logo.png",
    apple: "/eazyenglish-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body
        className={`${fredoka.className} ${geistMono.variable} antialiased`}
      >
        <ConvexClientProvider>{children}</ConvexClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
