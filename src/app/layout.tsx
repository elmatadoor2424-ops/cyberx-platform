import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cyberx.agency"),
  title: "CyberX | سايبر إكس - القوة الرقمية للأنظمة والتسويق والذكاء الاصطناعي",
  description: "شركة CyberX الرائدة في تقديم الحلول الرقمية المتطورة، تطوير البرمجيات والأنظمة المخصصة، الفيديوهات السينمائية، الحملات الإعلانية الممولة عالية العائد، وباقات أتمتة الواتساب.",
  keywords: [
    "CyberX",
    "سايبر إكس",
    "تطوير مواقع",
    "أنظمة مطاعم وعيادات",
    "أتمتة واتساب",
    "حملات إعلانية ممولة",
    "فيديوهات سينمائية",
    "تسويق رقمي"
  ],
  authors: [{ name: "CyberX Tech Team" }],
  openGraph: {
    title: "CyberX | حلول رقمية تقود المستقبل",
    description: "فعل خصم 70% الحصري الآن مع كود CYBER70 واستفد من أحدث الحلول الرقمية والأنظمة الذكية.",
    type: "website",
    locale: "ar_SA",
    images: ["/images/hero_showcase.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0F172A",
};

import { CyberConfigProvider } from "@/context/CyberConfigContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#0B0F19] text-slate-100 min-h-screen selection:bg-[#00F0FF]/30 selection:text-[#00F0FF] antialiased">
        <CyberConfigProvider>
          {children}
        </CyberConfigProvider>
      </body>
    </html>
  );
}
