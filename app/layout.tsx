import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer";
import NavBar from "./components/navbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Padel Chiajna",
  description:
    "Descoperă terenul de padel din Chiajna, Ilfov! Oferim închiriere de terenuri, cursuri pentru toate nivelurile, echipament complet și turnee competitive. Rezervă-ți acum locul pe cel mai modern teren de padel din zonă!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <NavBar></NavBar>
        {children}
        <Footer></Footer>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
