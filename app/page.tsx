import { LandingPage } from "@/components/landing-page";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "EazyEnglish",
      url: "https://eazy-english.uz",
      description:
        "Ingliz tilini o'yin orqali o'rganing. Bepul. Qiziqarli. Samarali.",
      inLanguage: ["uz", "en", "ru"],
    },
    {
      "@type": "SoftwareApplication",
      name: "EazyEnglish",
      url: "https://app.eazy-english.uz",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "Gamified English learning platform for Uzbek speakers. Learn English through interactive exercises, AI-powered lessons, and streak challenges.",
    },
    {
      "@type": "Organization",
      name: "EazyEnglish",
      url: "https://eazy-english.uz",
      logo: "https://eazy-english.uz/eazyenglish-logo.png",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingPage />
    </>
  );
}
