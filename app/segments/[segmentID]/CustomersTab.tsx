"use client";

import React, { useEffect, useState } from "react";
import { columns } from "@/components/columns/customer-columns";
import { DataTable } from "@/components/DataTable";
import { Customer } from "@/types/index";
import { fetchWifiUsersBySegmentId } from "@/services/segmentsService";

interface CustomersTabProps {
  SegmentId: string;
}

function CustomersTab({ SegmentId }: CustomersTabProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCustomers() {
      setIsLoading(true);
      const result = await fetchWifiUsersBySegmentId(SegmentId);
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
    return <div>Loading...</div>; // Loading indicator
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message if there is an error
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <DataTable columns={columns} data={customers} />
      </div>
    </div>
  );
}

export default CustomersTab;
