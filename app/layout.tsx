import React from 'react';
import dynamic from 'next/dynamic';
import { GeistSans } from "geist/font/sans";
import "./globals.css";

const Navbar = dynamic(() => import('../components/navbar/Navbar'), { ssr: false });  // Import Navbar without server-side rendering

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Blanket Wifi",
  description: "The fastest way to build apps with Next.js and Supabase",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <Navbar />
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}

export default RootLayout;
