import type { Metadata } from "next";
import { Montserrat, Cairo } from "next/font/google";
import localFont from "next/font/local";
import { LanguageProvider } from "./LanguageContext";
import FacebookPixel from "@/components/FacebookPixel";
import "./globals.css";

const saphile = localFont({
  src: "../../public/font/Saphile-Regular.otf",
  variable: "--font-serif",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  title: "Hollah | Premium Modest Fashion",
  description: "To be in The Best Hollah. Discover our premium collections of elegant Abayas, cape overlays, and community exclusives inspired by faith and elegance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${saphile.variable} ${montserrat.variable} ${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#28161D]">
        <FacebookPixel />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

