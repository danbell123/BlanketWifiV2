// AvatarList.tsx
import React, { useEffect, useState } from "react";
import { fetchWifiUserIdsBySegmentId } from "@/services/segmentsService";
import { fetchCustomerById } from "@/services/userService"; // Correct import paths
import { Customer } from "@/types/index"; // Correct import paths
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "@/components/ui/skeleton"
interface AvatarListProps {
  segmentId: string;
  maxVisible?: number;
}

// Define the type for state to handle an array of Customers or null values
const AvatarList: React.FC<AvatarListProps> = ({
  segmentId,
  maxVisible = 3,
}) => {
  // Set the state type to (Customer | null)[] to handle possible null values
  const [customers, setCustomers] = useState<(Customer | null)[]>([]);
  const [additionalCustomersAmmount, setAdditionalCustomersAmmount] =
    useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const idsResult = await fetchWifiUserIdsBySegmentId(segmentId);
        if (idsResult.data) {
          const customerPromises = idsResult.data
            .slice(0, maxVisible)
            .map((id) => fetchCustomerById(id));
          const customersData = await Promise.all(customerPromises);
          // Ensure you filter out null values if not needed or handle them appropriately
          setCustomers(customersData.map((item) => item.data).filter(Boolean));
          setAdditionalCustomersAmmount(idsResult.data.length - maxVisible);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [segmentId, maxVisible]);

  return (
    <div className="flex items-center">
      {/* TODO: Fix skeleton animation not working */}
      {loading ? (
        <div className="flex flex-row">
          <Avatar className="">
            <AvatarFallback>
              <Skeleton className="animate-pulse w-1 h-full rounded-full" />
            </AvatarFallback>
          </Avatar>
          <Avatar className="-ml-2">
            <AvatarFallback>
              <Skeleton className="animate-pulse w-1 h-full rounded-full" />
            </AvatarFallback>
          </Avatar>
          <Avatar className="-ml-3">
            <AvatarFallback >
              <Skeleton className="animate-pulse w-1 h-full rounded-full" />
            </AvatarFallback>
          </Avatar>
        </div>
      ) : (
        customers.map(
          (customer, index) =>
            customer && ( // Check for non-null customer before rendering
              <div className={index === 0 ? "" : "-m-2"}>
                <Avatar>
                  <AvatarImage
                    src={
                      customer.profilePictureURL
                    }
                  />
                  <AvatarFallback>
                    {customer.firstname[0] + customer.lastname[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
            ),
        )
      )}
      <span className="flex text-foreground items-center justify-center h-10 w-10 rounded-full text-sm font-medium">
        {additionalCustomersAmmount > 0 ? `+${additionalCustomersAmmount}` : ""}
      </span>
    </div>
  );
};

export default AvatarList;
