"use client";

import React, { useEffect, useState } from "react";
import "../globals.css";
import { columns } from "@/components/columns/customer-columns";
import { DataTable } from "@/components/DataTable";
import { Customer } from "@/types/index";
import { fetchCustomers } from "@/services/userService";
import { PageHeader } from "@/components/PageHeader";
import loaderSimple from "@/components/loading/fullPageLoading";
import LoaderSimple from "@/components/loading/fullPageLoading";

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
        title="Customers"
        description="Explore a detailed listing of everyone who has connected to your WiFi network. Manage and analyze customer interactions to enhance service and engagement directly from this page."
        primaryButton={{
          label: "New Segment",
          onClick: () => console.log("Clicked!"),
        }}
        secondaryButton={{
          label: "Learn More",
          onClick: () => console.log("Export Clicked!"),
          variant: "secondary",
        }}
      />
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <DataTable columns={columns} data={customers} searchableFields={["firstname", "lastname"]}/>
      </div>
    </div>
  );
}

export default Index;
