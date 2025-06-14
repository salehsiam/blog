import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import NextAuthProvider from "@/NextAuthProvider";
import GeminiWidget from "@/components/GeminiWidget";
import Footer from "@/components/Footer";

// Load the fonts
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata = {
  title: "Blog — AI Powered Blogging",
  description: "Create smarter blogs using AI and RTK Query",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body
        className="antialiased"
        cz-shortcut-listen="true"
        data-new-gr-c-s-check-loaded="14.1239.0"
        data-gr-ext-installed=""
      >
        <NextAuthProvider>
          <Navbar />
          {children}
          {/* <GeminiWidget /> */}
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
