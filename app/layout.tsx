import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { createClient } from "./utils/supabase/server";
import NavBar from "./components/navbar/navbar";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    console.log("Error occurred", { error });
  }

  console.log(data, "layout");

  return (
    <html lang="en" className="h-full bg-gray-50">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <NavBar />

        {children}
        <Footer></Footer>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
