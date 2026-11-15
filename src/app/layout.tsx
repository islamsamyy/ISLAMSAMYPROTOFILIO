import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import { ScrollProgress } from "@/components/navigation/ScrollProgress";
import { ThreeBackgroundCanvas } from "@/components/canvas/ThreeBackgroundCanvas";

export const metadata: Metadata = {
  title: "Islam Samy — Lead Data Engineer | Custom ERP Systems, AI Agents, Automations & Full-Stack Web Development",
  description:
    "Senior Data Engineer & Enterprise Solutions Architect with 10+ years of technical rigor. Specialist in custom ERP system development, autonomous AI agents, n8n workflow automations, real-time data analysis, and scalable Next.js web applications.",
  keywords: [
    "Islam Samy",
    "Data Engineer",
    "Custom ERP System Developer",
    "ERP Architecture",
    "Autonomous AI Agents",
    "Workflow Automation Specialist",
    "n8n Automation",
    "Executive Data Analysis",
    "Power BI Specialist",
    "Full-Stack Web Development",
    "Next.js Solutions Architect",
    "Real-Time Lakehouse",
    "OPERA PMS ERP Integration",
    "ETL Pipeline Engineering",
    "Enterprise Software Solutions"
  ],
  authors: [{ name: "Islam Samy" }],
  icons: {
    icon: "/images/250LOGO.png",
    apple: "/images/250LOGO.png",
  },
  openGraph: {
    title: "Islam Samy — Lead Data Engineer | ERP Systems, AI Agents & Web Architecture",
    description:
      "Enterprise portfolio of Islam Samy: Custom ERP engineering, autonomous multi-agent systems, zero-overhead workflow automations, real-time data lakehouses, and full-stack web platforms.",
    type: "website",
    locale: "en_US",
    siteName: "Islam Samy - Data Engineering & Enterprise Solutions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Islam Samy — Lead Data Engineer | ERP Systems, AI Agents & Web Architecture",
    description:
      "Enterprise portfolio of Islam Samy: Custom ERP engineering, autonomous multi-agent systems, zero-overhead workflow automations, real-time data lakehouses, and full-stack web platforms.",
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
                  "jobTitle": "Lead Data Engineer & Enterprise Solutions Architect",
                  "description": "Expert Data Engineer specializing in custom ERP system design, autonomous AI agents, workflow automations, executive data analytics, and modern full-stack web development.",
                  "knowsAbout": [
                    "Enterprise Resource Planning (ERP)",
                    "Data Engineering & Distributed Systems",
                    "Autonomous AI Agents",
                    "Workflow Automation & n8n",
                    "Business Intelligence & Power BI",
                    "Full-Stack Web Development",
                    "ClickHouse & Apache Kafka",
                    "OPERA PMS & System Integration"
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
                    "Custom ERP System Engineering",
                    "Workflow Automation & Process Optimization",
                    "Autonomous AI Agent Implementation",
                    "Executive Business Intelligence & Data Analysis",
                    "Full-Stack Web Platform Development"
                  ]
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
            {/* Global Animated Three.js Cybernetic Constellation & Grid Background across all pages */}
            <ThreeBackgroundCanvas className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />
            <ScrollProgress />
            <div className="relative z-10 flex flex-col min-h-screen bg-transparent">
              {children}
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
