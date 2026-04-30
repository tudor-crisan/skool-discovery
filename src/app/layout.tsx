import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tudorcrisan.dev"),
  title: "Wholesale Systems - Scale Beyond the Grind",
  description: "Custom software and automation for high-volume real estate wholesalers.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Wholesale Systems - Scale Beyond the Grind",
    description: "Custom software and automation for high-volume real estate wholesalers.",
    url: "https://tudorcrisan.dev", // Update this if there is a specific domain for this project
    siteName: "Wholesale Systems",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Wholesale Systems - Scale Beyond the Grind",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
