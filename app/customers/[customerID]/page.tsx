"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // New hooks for Next.js 14
import {
  fetchCustomerById,
  fetchCustomerFullDetails,
} from "@/services/userService"; // Ensure path is correct
import { Customer, CustomerFullData } from "@/types/index"; // Ensure path and types are correct
import CustomerTimeline from "@/components/CustomerTimeline";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import LoaderSimple from "@/components/loading/fullPageLoading";

function CustomerProfile() {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [customerFullData, setCustomerFullData] =
    useState<CustomerFullData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pathname = usePathname();
  const customerID = pathname.split("/").pop(); // Gets the last segment of the path

  useEffect(() => {
    if (customerID) {
      console.log("Initiating fetch for customer ID:", customerID);

      const loadCustomer = async () => {
        setIsLoading(true);
        const result = await fetchCustomerById(customerID);
        if (result.error) {
          console.error("Failed to fetch customer:", result.error);
          setError("Failed to load customer data");
          setIsLoading(false);
          return;
        }

        if (!result.data) {
          console.error("No data returned for customer:", customerID);
          setError("No customer found with that ID");
          setIsLoading(false);
          return;
        }

        setCustomer(result.data);

        const fullDataResult = await fetchCustomerFullDetails(result.data);
        if (fullDataResult.error) {
          console.error(
            "Failed to fetch customer full data:",
            fullDataResult.error,
          );
          setError("Failed to load customer full data");
        } else {
          setCustomerFullData(fullDataResult.data);
        }

        setIsLoading(false);
      };

      loadCustomer();
    }
  }, [customerID]);

  if (isLoading) {
    return <LoaderSimple />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!customer) {
    return <div>No customer data available.</div>;
  }

  return (
    <div className="flex flex-col gap-8 h-screen overflow-hidden">
      <PageHeader
        title={`${customer.firstname} ${customer.lastname}`}
        description={
          <div className="flex flex-row gap-4 pt-1">
            <div className="flex flex-row gap-2">
              <span
                className="material-icons text-card-foreground mt-1"
                style={{ fontSize: "20px" }}
              >
                email
              </span>
              <p className="text-base text-foreground">{customer.email}</p>
            </div>
            <div className="flex flex-row gap-2">
              <span
                className="material-icons text-card-foreground mt-1"
                style={{ fontSize: "20px" }}
              >
                phone
              </span>
              <p className="text-base text-foreground">{customer.tel}</p>
            </div>
          </div>
        }
        profilePictureURL={customer.profilePictureURL} // Pass the image URL here
        backLink={{ url: "/customers", label: "All Customers" }} // Custom label for the back link
        customerFirstName={customer.firstname}
        customerLastName={customer.lastname}
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

      <div className="flex flex-row flex-1 gap-12 overflow-hidden">
        <div className="flex flex-col gap-4 w-1/3">
          <div className="flex w-full flex-col gap-4 bg-card p-4 rounded-lg border">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row justify-between align-middle">
                <h2 className="text-base font-semibold align-middle">
                  Segments
                </h2>
                <Button
                  variant="secondary"
                  size="sm"
                  className="p-1 h-min"
                  onClick={() => console.log("Add to Segment clicked!")}
                >
                  <span
                    className="material-icons text-card-foreground"
                    style={{ fontSize: "18px" }}
                  >
                    add
                  </span>
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {customerFullData?.segments.map((segment) => (
                  <Badge key={segment.segment_id} variant="outline">
                    {segment.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-4 bg-card p-4 rounded-lg border">
            <div className="flex flex-col gap-4">
              <h2 className="text-base font-semibold">Visits</h2>
              {customerFullData?.visits ? (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col">
                    <p className="text-sm text-popover-foreground">
                      Total Visits:
                    </p>
                    <p className="text-base text-foreground">
                      {customerFullData.visits.total_visits}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm text-popover-foreground">
                      Last Visit:
                    </p>
                    <p className="text-base text-foreground">
                      {customerFullData.visits.last_visit.toDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm text-popover-foreground">
                      First Visit:
                    </p>
                    <p className="text-base text-foreground">
                      {customerFullData.visits.first_visit.toDateString()}
                    </p>
                  </div>
                </div>
              ) : (
                <div>No visits data available.</div>
              )}
            </div>
          </div>
          <div className="flex w-full flex-col gap-4 bg-card p-4 rounded-lg text-base border">
            <div className="flex flex-col gap-4">
              <div className="flex items-center">
                <span
                  className="material-icons mr-2 text-card-foreground"
                  style={{ fontSize: "20px" }}
                >
                  cake
                </span>
                <p className="text-sm text-popover-foreground">
                  {customer.dob instanceof Date
                    ? customer.dob.toDateString()
                    : customer.dob}
                </p>
              </div>
              <div className="flex items-center text-popover-foreground">
                <span
                  className="material-icons mr-2 text-card-foreground"
                  style={{ fontSize: "20px" }}
                >
                  wc
                </span>
                <p className="text-sm  capitalize">{customer.gender}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 overflow-auto mb-4">
          {customerID && <CustomerTimeline customerId={customerID} />}
        </div>
      </div>
    </div>
  );
}

export default CustomerProfile;
