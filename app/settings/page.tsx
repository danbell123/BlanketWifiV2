"use client";

import React, { useEffect, useState } from "react";
import LoaderSimple from "@/components/loading/fullPageLoading";
import SettingsNavItem from "@/components/navbar/SettingsNavItem";
import AppearanceSettings from "@/components/settings/AppearanceSettings";
import GeneralSettings from "@/components/settings/GeneralSettings";
import BusinessSettings from "@/components/settings/BusinessSettings";

function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  if (isLoading) {
    return <LoaderSimple />; // Loading indicator
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message if there is an error
  }

  const menuItems = [
    {
      name: "General",
      id: 1,
    },
    {
      name: "Account & Security",
      id: 2,
    },
    {
      name: "Appearance",
      id: 3,
    },
    {
        name: "Usage",
        id: 4,
    },
    {
        name: "Reviews",
        id: 5,
    },
    {
        name: "Network",
        id: 6
    }
    ];



  return (
    <div className="flex flex-row h-full">
      <div className="flex w-1/4 h-full flex-col gap-20 border-r-2">
        <div className="flex flex-col gap-4 p-4">
          <div className="text-xl font-bold">Settings</div>
          {menuItems.map((item) => (
              <SettingsNavItem
                key={item.id}
                item={item}
                selected={selected === item.id}
                setSelected={setSelected}
              />
            ))}
        </div>
      </div>
      <div className="flex w-full h-full p-8">
        {selected === 1 && 
            <div className="flex flex-col gap-8 w-full">
                <GeneralSettings />
                <BusinessSettings />
            </div>}
        {selected === 2 && <div>Account & Security</div>}
        {selected === 3 && <AppearanceSettings />}
      </div>
    </div>
  );
}

export default Index;
