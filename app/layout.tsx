'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { GeistSans } from "geist/font/sans";
import TopNav from '@/components/topnavbar/TopNavBar';
import './globals.css';  

const Navbar = dynamic(() => import('../components/navbar/Navbar'), { ssr: false });

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false); // State to track Navbar expansion

  return (
    <html lang="en" className={GeistSans.className}>
      <body className="flex flex-row justify-end min-h-screen bg-background text-foreground">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

        <Navbar isExpanded={isExpanded} onToggle={() => setIsExpanded(!isExpanded)} />
        <main style={{ width: isExpanded ? 'calc(100% - 250px)' : 'calc(100% - 72px)' }} className={`transition-width justify-end duration-300`}>
          <TopNav />
          <div className="p-6">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}

export default RootLayout;
