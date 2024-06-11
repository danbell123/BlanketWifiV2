'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { GeistSans } from "geist/font/sans";
import TopNav from '@/components/topnavbar/TopNavBar';
import { createClient } from '@/utils/supabase/client'
import './globals.css';  
import { Toaster } from '@/components/ui/sonner';
import { fetchTenantById } from '@/services/tenantsService';
import SetupPopup from '@/components/setup/SetupPopup';

const Navbar = dynamic(() => import('../components/navbar/Navbar'), { ssr: false });

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false); // State to track Navbar expansion
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSetup, setIsSetup] = useState(false); // State to track if the user has completed the setup process
  const supabase = createClient();

  const checkAuth = async () => {
    const user = await supabase.auth.getUser();
    if (!user.data.user?.id) {
      console.log('User not authenticated');
      setIsAuthenticated(false);
    } else {
      console.log('User authenticated');
      setIsAuthenticated(true);
    }
  }

  const checkSetup = async () => {
    const user = await supabase.auth.getUser();
    console.log("User: ",user);
    fetchTenantById(user.data.user?.id).then((res) => {
      console.log("Res: ",res);
      if (res.data?.isSetup) {
        setIsSetup(true);
        console.log('User has completed setup');
      } else {
        setIsSetup(false);
        console.log('User has not completed setup');
      }
    }
    );
  }

  checkAuth();
  checkSetup();

  return (
    <html lang="en" className={GeistSans.className}>
      <body>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        {isAuthenticated ? 
          <div className="flex flex-row justify-end min-h-screen bg-background text-foreground">
            <Navbar isExpanded={isExpanded} onToggle={() => setIsExpanded(!isExpanded)} /> 
            <main style={{ width: isExpanded ? 'calc(100% - 250px)' : 'calc(100% - 72px)' }} className={`transition-width justify-end duration-300`}>
              <TopNav />
              <div className="p-6">
                {!isSetup && 
                  <SetupPopup />
                }
                <>
                  {children}
                </>
              </div>
            </main>
          </div>
          : 
          <>
            <div className={`flex flex-col w-full h-full justify-center items-center`}>
              {children}
            </div>
          </>
          } 

      <Toaster />
      </body>
    </html>
  );
}

export default RootLayout;
