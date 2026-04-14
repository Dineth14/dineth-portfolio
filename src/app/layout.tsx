import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Dineth Perera — EE Researcher & IEEE Author",
  description:
    "Electrical & Electronic Engineering undergraduate at University of Peradeniya. IEEE IGARSS 2026 author. UrbanMamba. Founder of raceday.lk.",
  themeColor: "#07090F",
  openGraph: {
    title: "Dineth Perera — EE Researcher & IEEE Author",
    description:
      "Electrical & Electronic Engineering undergraduate at University of Peradeniya. IEEE IGARSS 2026 author. UrbanMamba. Founder of raceday.lk.",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dineth Perera — EE Researcher & IEEE Author",
    description:
      "Electrical & Electronic Engineering undergraduate at University of Peradeniya. IEEE IGARSS 2026 author. UrbanMamba. Founder of raceday.lk.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" style={{ scrollBehavior: "smooth" }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#07090F" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="min-h-full flex flex-col bg-[#07090F] text-[#E2DDD4]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
