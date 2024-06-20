"use client";

import React, { useEffect, useState } from "react";
import "../globals.css";
import { columns } from "@/components/columns/customer-columns";
import { DataTable } from "@/components/DataTable";
import { Customer } from "@/types/index";
import { fetchCustomers } from "@/services/userService";
import { PageHeader } from "@/components/PageHeader";
import LoaderSimple from "@/components/loading/fullPageLoading";
import { Card } from "@/components/ui/card";
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { BorderBeam } from "@/components/ui/border-beam"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

function Index() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCustomers() {
      setIsLoading(true);
      const result = await fetchCustomers();
      if (result.error) {
        console.error("Failed to fetch customers:", result.error);
        setError("Failed to load customers");
      } else {
        setCustomers(result.data || []);
      }
      setIsLoading(false);
    }

    loadCustomers();
  }, []);

  if (isLoading) {
    return <LoaderSimple />; // Loading indicator
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message if there is an error
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="WiFi Portal"
        description="Adjust the look and feel, update your preferences, and ensure your portal reflects your brand and meets your needs. Make your WiFi experience unique and user-friendly with just a few clicks."
        primaryButton={{
          label: "Edit Design",
          onClick: () => console.log("Clicked!"),
        }}
        secondaryButton={{
            label: "Edit Configuration",
            onClick: () => console.log("Clicked!"),
        }}
      />
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <Card className="w-full bg-grid-white/[0.05]">
            <div className="flex flex-row gap-8 p-8 w-full">
                <div className="w-[750px]">
                    <AspectRatio ratio={16 / 9}>
                        <div className="w-full h-full border rounded-lg relative p-2 bg-card">
                            <BorderBeam colorFrom="hsl(var(--primary))" colorTo="hsl(var(--popover-foreground))" borderWidth={2}/>
                            <Button variant={"outline"} size={"sm"} className="size-9 absolute right-2 bottom-2">
                                <span className="material-icons text-foreground" style={{ fontSize: "16px" }}>edit</span>
                            </Button>
                        </div>
                    </AspectRatio>
                </div>
                <div className="w-1/3 flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm text-foreground">Status:</p>
                        <div className="flex flex-wrap h-min gap-2">
                            <Badge variant={"outline"} className="text-green-400 gap-1">
                                <span className="material-icons" style={{ fontSize: "12px" }}>check</span>
                                Active
                            </Badge>
                            <Badge variant={"outline"} className="text-green-400 gap-1">
                                <span className="material-icons" style={{ fontSize: "12px" }}>lock</span>
                                Secure
                            </Badge>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm text-foreground">
                            Last Updated:
                        </p>
                        <p className="text-sm text-popover-foreground">2 days ago</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm text-foreground">Integration:</p>
                        <p className="text-sm text-popover-foreground">UniFi</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm text-foreground">IP:</p>
                        <p className="text-sm text-popover-foreground">192.930.323.123:9000</p>
                    </div>
                </div>
            </div>
        </Card>
      </div>
    </div>
  );
}

export default Index;
