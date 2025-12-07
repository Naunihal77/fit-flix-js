import "./globals.css";
import "@/styles/home.css";  // ← add this

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

const mont = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "TRIBE Fitness Studio - Find Your Tribe",
  description: "Community-driven fitness studio experience",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={mont.className}>
        {children}
      </body>
    </html>
  );
}
