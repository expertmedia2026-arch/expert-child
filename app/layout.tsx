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
  title: "Expert Child",
  description: "Sign in to the Expert Child portal as a parent or an admin.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-[100vh] max-h-[100vh] overflow-hidden antialiased`}
    >
      <body className="flex h-[100vh] max-h-[100vh] flex-col overflow-hidden">
        {children}
      </body>
    </html>
  );
}
