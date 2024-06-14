"use client";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Button } from "@/components/ui/button"; // Adjust the import path to your project's structure
import { DataTable } from "@/components/DataTable"; // Adjust the import path to your project's structure
import { columns } from "@/components/columns/customer-columns-sm-checkboxes"; // Adjust the import path to your project's structure
import { Customer, CustomerFullData, CustomerVisits } from "@/types/index";
import { fetchWifiUsersBySegmentId } from "@/services/segmentsService"; // Adjust the import path to your project's structure
import { fetchCustomerFullDetails } from "@/services/userService"; // Adjust the import path to your project's structure

interface ManageSegmentCustomersPopupProps {
  isOpen: boolean;
  onClose: () => void;
  segmentId: string; // Assuming you need the segment ID to manage customers
}

const ManageSegmentCustomersPopup: React.FC<
  ManageSegmentCustomersPopupProps
> = ({ isOpen, onClose, segmentId }) => {
  const [customersFullData, setCustomersFullData] = useState<
    CustomerFullData[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      loadCustomers();
    }
  }, [isOpen, segmentId]);

  const loadCustomers = async () => {
    setIsLoading(true);
    const result = await fetchWifiUsersBySegmentId(segmentId); // Adjust the function call to match your project's structure
    if (result.error) {
      console.error("Failed to fetch customers:", result.error);
      setError("Failed to load customers");
    } else {
      const customers = result.data || [];
      const fullDataPromises = customers.map((customer) =>
        fetchCustomerFullDetails(customer),
      );
      const fullDataResults = await Promise.all(fullDataPromises);

      const fullData = fullDataResults
        .map((res) => res.data)
        .filter((data) => data !== null) as CustomerFullData[];
      setCustomersFullData(fullData);
    }
    setIsLoading(false);
  };

  if (!isOpen) return null;

  if (error) {
    return <div>Error: {error}</div>; // Display error message if there is an error
  }

  if (isLoading) {
    return <div>Loading...</div>; // Loading indicator
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-card rounded-lg p-4 w-2/3 mx-24">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Add and Remove Customers From Segment
          </h2>
          <button onClick={onClose} className="text-card-foreground">
            <span className="material-icons">close</span>
          </button>
        </div>
        <div>
          <DataTable columns={columns} data={customersFullData} />
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement,
  );
};

export default ManageSegmentCustomersPopup;
