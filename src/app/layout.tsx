import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ScrollProgress } from "@/components/navigation/ScrollProgress";
import { ThreeBackgroundCanvas } from "@/components/canvas/ThreeBackgroundCanvas";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Islam Samy — Technology & Business Portfolio | Solutions Architect",
  description:
    "Executive portfolio of Islam Samy — Founder & Lead AI / BI Solutions Architect specializing in Distributed Systems, Real-Time Lakehouses, and Enterprise Machine Learning.",
  keywords: [
    "Islam Samy",
    "Solutions Architect",
    "AI Architect",
    "BI Developer",
    "Distributed Systems",
    "Lakehouse",
    "OPERA PMS",
    "Enterprise Analytics",
  ],
  authors: [{ name: "Islam Samy" }],
  icons: {
    icon: "/images/artboard-mark.png",
    apple: "/images/artboard-mark.png",
  },
  openGraph: {
    title: "Islam Samy — Principal AI Engineer & Full-Stack Solutions Architect",
    description:
      "Executive portfolio, technical advisory, high-performance distributed systems, and real-time enterprise AI solutions.",
    type: "website",
    locale: "en_US",
    siteName: "Islam Samy Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Islam Samy — Principal AI Engineer & Full-Stack Solutions Architect",
    description:
      "Executive portfolio, technical advisory, high-performance distributed systems, and real-time enterprise AI solutions.",
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
      className={`dark ${inter.variable} ${jetbrainsMono.variable} ${plusJakartaSans.variable}`}
    >
      <head>
        {/* Anti-FOUC Blocking Theme Initializer: executes synchronously before render */}
        <script
          id="islam-theme-anti-fouc"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k='islam_theme_v1';var s=localStorage.getItem(k)||localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var isDark=s==='dark'||(!s&&m)||(s==='system'&&m);var el=document.documentElement;if(isDark){el.classList.add('dark');el.style.colorScheme='dark';}else{el.classList.remove('dark');el.style.colorScheme='light';}}catch(e){}})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.cdnfonts.com" />
        <link rel="preload" href="/fonts/NexaBold.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/NexaLight.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link href="https://fonts.cdnfonts.com/css/nexa-bold" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
      </head>
      <body className="bg-background text-on-surface min-h-screen antialiased transition-colors duration-300 selection:bg-primary-container selection:text-on-primary-container relative">
        <ThemeProvider defaultTheme="dark">
          {/* Global Animated Three.js Cybernetic Constellation & Grid Background across all pages */}
          <ThreeBackgroundCanvas className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />
          <ScrollProgress />
          <div className="relative z-10 flex flex-col min-h-screen bg-transparent">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
