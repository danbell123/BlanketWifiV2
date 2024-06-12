'use client';

import { Segment } from "@/types/segment";
import { fetchSegmentById } from "@/services/segmentsService";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import PageTabs from "@/components/PageTabs";
import CustomersTab from "./CustomersTab";
import SettingsTab from "./SettingsTab";

function SegmentOverview() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [segment, setSegment] = useState<Segment | null>(null);

    const pathname = usePathname();
    const segmentID = pathname.split("/").pop() as string;

    useEffect(() => {
        const loadSegment = async () => {
            setIsLoading(true);
            const result = await fetchSegmentById(segmentID);
            if (result.error) {
                console.error("Failed to fetch segment:", result.error);
                setError("Failed to load segment data");
            } else if (!result.data) {
                console.error("No data returned for segment:", segmentID);
                setError("No segment found with that ID");
            } else {
                setSegment(result.data);
            }
            setIsLoading(false);
        };

        loadSegment();
    }, [segmentID]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!segment) {
        return <div>No segment data available.</div>;
    }

    const tabItems = [
        {
          title: "Customers",
          value: "customers",
          component: <CustomersTab SegmentId={segmentID} />,
        }, // Correct usage
        { title: "Automated Pulses", value: "autopulses", component: <Button /> },
        {
          title: "Settings",
          value: "settings",
          component: (
            <SettingsTab segment={segment} />
          ),
        },
      ];
    
      return (
        <div className="flex flex-col gap-8">
          <PageHeader
            title={segment.name}
            description={segment.description || undefined}
            backLink={{ url: "/segments", label: "All Segments" }} // Custom label for the back link
            primaryButton={{
              label: "Send Pulse",
              onClick: () => console.log("Clicked!"),
            }}
            secondaryButton={{
              label: "Add To Segment",
              onClick: () => console.log("Export Clicked!"),
              variant: "secondary",
            }}
          />
          <PageTabs tabItems={tabItems} />
        </div>
      );
}

export default SegmentOverview;
