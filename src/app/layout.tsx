import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import { ScrollProgress } from "@/components/navigation/ScrollProgress";
import { GlobalBackgroundClient } from "@/components/canvas/GlobalBackgroundClient";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://islamsamy.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Islam Samy — ERP Systems, Data Engineering, Software & Online Systems, Power BI & AI/ML Solutions",
    template: "%s | Islam Samy — Enterprise Solutions Architect",
  },
  description:
    "Custom ERP Systems, Data Engineering & Real-Time Lakehouses, Software Engineering & Online Web Systems, Power BI Data Analysis Dashboards, and AI & Machine Learning solutions tailored for all industries. حلول مخصصة لأنظمة ERP، هندسة البيانات، تطوير المواقع والأنظمة الإلكترونية، تحليل البيانات وPower BI، والذكاء الاصطناعي لجميع القطاعات.",
  keywords: [
    // English — Core 5 Solution Fields
    "Islam Samy",
    "Custom ERP Systems",
    "Enterprise ERP Architecture",
    "Manufacturing ERP",
    "Hospitality ERP",
    "Data Engineering",
    "Real-Time Data Lakehouse",
    "ETL & CDC Pipelines",
    "ClickHouse & Apache Kafka",
    "Software Engineering",
    "Online Systems Development",
    "Full-Stack Web Development",
    "Next.js & Supabase Platforms",
    "E-Commerce & Booking Systems",
    "Data Analysis & Power BI",
    "Executive Power BI Dashboards",
    "Business Intelligence & DAX",
    "AI & Machine Learning",
    "Autonomous AI Agents",
    "RAG AI Pipelines",
    "Workflow Automation & n8n",
    // Arabic — Core 5 Solution Fields & Multi-Industry SEO
    "إسلام سامي",
    "أنظمة تخطيط موارد المؤسسات ERP",
    "تطوير أنظمة ERP مخصصة للمصانع والشركات",
    "هندسة البيانات ومستودعات البيانات",
    "هندسة البرمجيات وتطوير الأنظمة الإلكترونية",
    "تصميم وتطوير المواقع والمنصات الإلكترونية",
    "تحليل البيانات ولوحات معلومات Power BI",
    "الذكاء الاصطناعي وتعلم الآلة",
    "وكلاء الذكاء الاصطناعي وأتمتة الأعمال n8n",
    "حلول برمجية وبيانات مخصصة لجميع القطاعات",
  ],
  authors: [{ name: "Islam Samy", url: SITE_URL }],
  creator: "Islam Samy",
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-US": SITE_URL,
      "ar-EG": SITE_URL,
      "ar-SA": SITE_URL,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/250LOGO.png",
    apple: "/images/250LOGO.png",
  },
  openGraph: {
    title: "Islam Samy — Custom ERP, Data Engineering, Software & Web Systems, Power BI & AI/ML",
    description:
      "Tailored ERP Systems, Data Engineering pipelines, Full-Stack Online Systems, Power BI Dashboards, and AI/ML Agents customized for Hospitality, Manufacturing, E-Commerce, FinTech, Healthcare & B2B. حلول تقنية وبيانات مخصصة لجميع القطاعات.",
    url: SITE_URL,
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_EG", "ar_SA"],
    siteName: "Islam Samy — Enterprise Solutions & Data Engineering",
  },
  twitter: {
    card: "summary_large_image",
    title: "Islam Samy — ERP Systems, Data Engineering, Software & Web, Power BI & AI/ML",
    description:
      "Production-grade ERP, Data Engineering, Full-Stack Online Systems, Power BI Dashboards, and AI/ML solutions customized for every industry.",
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
      suppressHydrationWarning
      className="dark"
    >
      <head>
        {/* Anti-FOUC Blocking Theme Initializer: executes synchronously before render */}
        <script
          id="islam-theme-anti-fouc"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k='islam_theme_v1';var s=localStorage.getItem(k)||localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var isDark=s==='dark'||(!s&&m)||(s==='system'&&m);var el=document.documentElement;if(isDark){el.classList.add('dark');el.style.colorScheme='dark';}else{el.classList.remove('dark');el.style.colorScheme='light';}}catch(e){}})();`,
          }}
        />
        {/* Anti-FOUC Blocking Language Initializer */}
        <script
          id="islam-language-anti-fouc"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k='islam_language_v1';var l=localStorage.getItem(k);if(!l&&navigator.language&&navigator.language.indexOf('ar')===0){l='ar';}var isRTL=l==='ar';var el=document.documentElement;el.setAttribute('lang',l||'en');el.setAttribute('dir',isRTL?'rtl':'ltr');if(isRTL){el.classList.add('rtl');el.classList.remove('ltr');}else{el.classList.add('ltr');el.classList.remove('rtl');}}catch(e){}})();`,
          }}
        />
        {/* SEO Structured Data: Schema.org Person & ProfessionalService */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://islamsamy.com/#person",
                  "name": "Islam Samy",
                  "jobTitle": "Data Engineer & ERP Systems Architect for Factories & Institutions",
                  "description": "Data Engineer & ERP Systems Architect building Operations-Research-driven resource management systems (ERP) for factories and institutions, with autonomous AI agents, workflow automations, and guaranteed ROI upon contracting.",
                  "knowsAbout": [
                    "Operations Research (OR) & Industrial Optimization",
                    "Enterprise Resource Planning (ERP) for Factories & Institutions",
                    "Data Engineering & Distributed Systems",
                    "Autonomous AI Agents",
                    "Workflow Automation & n8n",
                    "Business Intelligence & Power BI",
                    "Full-Stack Web Development",
                    "ClickHouse & Apache Kafka",
                    "PLC Telemetry & OPERA PMS Integration"
                  ],
                  "sameAs": [
                    "https://www.linkedin.com/in/islam-samy-3b72061a9/",
                    "https://github.com/islam-samy"
                  ]
                },
                {
                  "@type": "ProfessionalService",
                  "@id": "https://islamsamy.com/#service",
                  "name": "Islam Samy — Data & Enterprise Architecture Advisory",
                  "description": "High-impact consulting and implementation for Custom ERP Systems, AI Agents, Enterprise Automation, Real-Time Lakehouses, and Web Platforms.",
                  "provider": {
                    "@id": "https://islamsamy.com/#person"
                  },
                    "serviceType": [
                      "ERP Systems Engineering (أنظمة تخطيط موارد المؤسسات)",
                      "Data Engineering & Real-Time Lakehouses (هندسة البيانات)",
                      "Software Engineering & Online Web Systems (هندسة البرمجيات والأنظمة الإلكترونية)",
                      "Data Analysis & Power BI Dashboards (تحليل البيانات ولوحات Power BI)",
                      "AI, Machine Learning & Autonomous Agents (الذكاء الاصطناعي وتعلم الآلة)"
                    ],
                    "areaServed": ["Egypt", "Saudi Arabia", "UAE", "MENA", "Europe", "Global"],
                    "availableLanguage": ["English", "Arabic"],
                    "hasOfferCatalog": {
                      "@type": "OfferCatalog",
                      "name": "Custom Enterprise Technology Solutions for All Industries",
                      "itemListElement": [
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "ERP Systems — Manufacturing, Hospitality & Multi-Branch Operations" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Data Engineering — Kafka CDC, ClickHouse Lakehouses & Automated ETL" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Software Engineering & Online Systems — Full-Stack Web Apps, E-Commerce & Portals" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Data Analysis & Power BI — Executive KPI Dashboards, DAX & Predictive EDA" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI & Machine Learning — RAG Agents, Churn/Fraud Models & n8n Automation" } }
                      ]
                    }
                }
              ]
            })
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.cdnfonts.com" />
        <link rel="preload" href="/fonts/NexaBold.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/NexaLight.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link href="https://fonts.cdnfonts.com/css/nexa-bold" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet" />
      </head>
      <body
        suppressHydrationWarning
        className="bg-background text-on-surface min-h-screen antialiased transition-colors duration-300 selection:bg-primary-container selection:text-on-primary-container relative"
      >
        <ThemeProvider defaultTheme="dark">
          <LanguageProvider defaultLanguage="en">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:rounded-xl focus:bg-primary focus:text-on-primary focus:font-semibold focus:shadow-lg"
            >
              Skip to main content
            </a>
            {/* Global Animated Three.js Cybernetic Constellation & Grid Background (Code-split) */}
            <GlobalBackgroundClient />
            <ScrollProgress />
            <div className="relative z-10 flex flex-col min-h-screen bg-transparent">
              {children}
            </div>
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
