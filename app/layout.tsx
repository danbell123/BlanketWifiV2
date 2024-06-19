"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { GeistSans } from "geist/font/sans";
import TopNav from "@/components/topnavbar/TopNavBar";
import { createClient } from "@/utils/supabase/client";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { checkTenantSetup, checkTenantActive, addTenantEmptyProfile } from "@/services/tenantsService";
import SetupPopup from "@/components/setup/SetupPopup";

const Navbar = dynamic(() => import("../components/navbar/Navbar"), {
  ssr: false,
});

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSetup, setIsSetup] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        console.log("User not authenticated");
        setIsAuthenticated(false);
      } else {
        console.log("User authenticated");
        setIsAuthenticated(true);
        checkSetup(data.user.id);
      }
    };

    const checkSetup = async (tenantId: string) => {
      try {
        const { exists, isSetup } = await checkTenantSetup(tenantId);
        console.log("Check Setup Status: ", exists, isSetup);
        if (exists && isSetup !== null) {
          setIsSetup(isSetup);
          checkActive(tenantId);
        } if (!exists) {
          addTenantEmptyProfile(tenantId);
        }
        else {
          setIsSetup(false);
        }
      } catch (error) {
        console.error("Failed to check setup status:", error);
        setIsSetup(false);
      }
    };

    const checkActive = async (tenantId: string) => {
      try {
        const { res } = await checkTenantActive(tenantId);
        if (res !== null) {
          setIsActive(res);
        } else {
          setIsActive(false);
        }
      } catch (error) {
        console.error("Failed to check active status:", error);
        setIsActive(false);
      }
    };

    checkAuth(); // CHECK AUTH --> CHECK SETUP --> CHECK ACTIVE
    console.log("USER CONFIG: isAuthenticated: ", isAuthenticated, "isSetup: ", isSetup, "isActive: ", isActive);
  }, []); // Ensure these are only run once on mount

  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        {isAuthenticated ? (
          <div className="flex flex-row justify-end min-h-screen bg-background text-foreground">
            <Navbar
              isExpanded={isExpanded}
              onToggle={() => setIsExpanded(!isExpanded)}
            />
            <div
              style={{
                width: isExpanded ? "calc(100% - 250px)" : "calc(100% - 72px)",
              }}
              className={`transition-width justify-end duration-300 px-12 py-6`}
            >
              <TopNav />
              <div className="">
                {!isActive && <SetupPopup isActive={isActive} isSetup={isSetup} />}
                <>{children}</>
              </div>
            </div>
          </div>
        ) : (
            <div
              className={`flex flex-col w-full h-full justify-center items-center`}
            >
              {children}
            </div>
        )}

        <Toaster richColors/>
        <div id="modal-root"></div>
      </body>
    </html>
  );
};

export default RootLayout;
