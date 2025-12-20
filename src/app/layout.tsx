import "./globals.css";
import "@/styles/home.css"; 

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
// 1. Import your Header component (ensure the path matches where you saved it)
import Header from "@/components/Header"; 

const mont = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "FitFlix - Complete Fitness ecosystem",
  description: "Premium Gyms | Personalized Training | Nutrition Plans | Community Support",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={mont.className}>
        {/* 2. Place the Header here */}
        <Header />
        
        {/* The current page content renders here */}
        {children}
      </body>
    </html>
  );
}