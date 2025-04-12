import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopNavBar from "@/app/components/layout/TopNavBar"
import { ThemeProvider } from "@/app/components/ThemeProvider"
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Portfolio Tracker",
  description: "Track your investments and assets with AI Portfolio Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
        <Head>
        {/* Next.js automatically serves the manifest from `app/manifest.ts` */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
            <TopNavBar />
            <main className="p-6">{children}</main>
          </ThemeProvider>
      </body>
    </html>
  );
}
