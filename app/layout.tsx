"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
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
  const [isSetup, setIsSetup] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const initialize = async () => {
      await checkAuth();
      setLoading(false);
    };

    const checkAuth = async () => {
      console.log("Checking Auth Status");
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
        await checkSetup(data.user.id);
      }
    };

    const checkSetup = async (tenantId: string) => {
      console.log("Checking Setup Status");
      try {
        const { exists, isSetup } = await checkTenantSetup(tenantId);
        console.log("Check Setup Status: ", exists, isSetup);

        if (!exists) {
          await addTenantEmptyProfile(tenantId);
        }

        setIsSetup(isSetup !== null ? isSetup : false);
        await checkActive(tenantId);

        console.log("Setup Status. Exists:", exists, "isSetup:", isSetup);
      } catch (error) {
        console.error("Failed to check setup status:", error);
        setIsSetup(false);
      }
    };

    const checkActive = async (tenantId: string) => {
      console.log("Checking Active Status");
      try {
        const { res } = await checkTenantActive(tenantId);
        setIsActive(res !== null ? res : false);
      } catch (error) {
        console.error("Failed to check active status:", error);
        setIsActive(false);
      }
    };

    initialize();

    console.log("USER CONFIG: isAuthenticated: ", isAuthenticated, "isSetup: ", isSetup, "isActive: ", isActive);

    document.body.classList.add('dark');

  }, []); // Ensure these are only run once on mount

  if (loading) {
    return (
      <html>
        <body>
          <div className="flex flex-col w-full h-screen justify-center items-center bg-card">
            <div className="h-full w-full bg-background bg-grid-white/[0.1] relative flex items-center justify-center">
              <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
              <p>Loading...</p>
            </div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html>
      <body>
        <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
        />
        <div className={GeistSans.className}>
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
                  {children}
                </div>
              </div>
            </div>
          ) : (
            <div className={`flex flex-col w-full h-screen justify-center items-center bg-card`}>
              <div className="h-full w-full bg-background bg-grid-white/[0.1] relative flex items-center justify-center">
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                {children}
              </div>
            </div>
          )}
          <Toaster richColors/>
          <div id="modal-root"></div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
