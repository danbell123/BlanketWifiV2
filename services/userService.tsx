import { createClient } from "../utils/supabase/client";
import {
  Customer,
  Segment,
  CustomerVisits,
  CustomerFullData,
} from "@/types/index";

interface FetchResult<T> {
  data: T | null;
  error: Error | null;
}

// Function to fetch all customers from the 'wifiUsers' table
export async function fetchCustomers(): Promise<FetchResult<Customer[]>> {
  const supabase = createClient(); // Creating a Supabase client instance

  try {
    const { data: customers, error } = await supabase
      .from("wifiUsers") // Specifying the table and type
      .select("*"); // Selecting all columns

    if (error) throw error; // If there's an error, throw to catch block

    return { data: customers, error: null }; // Returning fetched data and null for error
  } catch (error) {
    console.error("Error fetching customers:", error); // Logging error to console
    return { data: null, error: error as Error }; // Returning null for data and the error
  }
}

// Function to fetch a single customer by ID from the 'wifiUsers' table
export async function fetchCustomerById(
  customerId: string,
): Promise<FetchResult<Customer>> {
  const supabase = createClient(); // Reusing the creation of a Supabase client

  console.log("Fetching customer with ID:", customerId); // Logging the customer ID

  try {
    const { data: customer, error } = await supabase
      .from("wifiUsers") // Specifying the table and type
      .select("*") // Selecting all columns
      .eq("wifi_user_id", customerId) // Filtering to match the given customer ID
      .single(); // Ensuring only one record is returned

    if (error) throw error; // If there's an error, throw to catch block

    return { data: customer, error: null }; // Returning the fetched customer and null for error
  } catch (error) {
    console.error(`Error fetching customer with ID ${customerId}:`, error); // Logging specific error
    return { data: null, error: error as Error }; // Returning null for data and the error
  }
}

// Function to fetch segments by customer ID from the 'segmentMembers' table
async function fetchSegmentsByCustomerId(
  customerId: string,
): Promise<FetchResult<Segment[]>> {
  const supabase = createClient();

  try {
    const { data: segments, error } = await supabase
      .from("segmentMembers")
      .select("segments(*)")
      .eq("wifi_user_id", customerId);

    if (error) throw error;

    return { data: segments.map((s: any) => s.segments), error: null }; // Assuming the data is nested
  } catch (error) {
    console.error(
      `Error fetching segments for customer ID ${customerId}:`,
      error,
    );
    return { data: null, error: error as Error };
  }
}

// Function to get the default customer visits structure
function getDefaultCustomerVisits(customerId: string): CustomerVisits {
  return {
    wifi_user_id: customerId,
    total_visits: 0,
    last_30_days_visits: 0,
    last_7_days_visits: 0,
    last_visit: new Date(0),
    first_visit: new Date(0),
  };
}

// Function to fetch visits by customer ID from the 'connections' table
export async function fetchVisitsByCustomerId(
  customerId: string,
): Promise<FetchResult<CustomerVisits>> {
  const supabase = createClient();

  try {
    const { data: visits, error } = await supabase
      .from("connections")
      .select("timestamp")
      .eq("wifi_user_id", customerId);

    if (error) throw error;

    if (!visits || visits.length === 0) {
      return { data: getDefaultCustomerVisits(customerId), error: null };
    }

    const totalVisits = visits.length;
    const now = new Date();
    const last30Days = new Date(now);
    last30Days.setDate(now.getDate() - 30);
    const last7Days = new Date(now);
    last7Days.setDate(now.getDate() - 7);

    const last30DaysVisits = visits.filter(
      (visit) => new Date(visit.timestamp) > last30Days,
    ).length;
    const last7DaysVisits = visits.filter(
      (visit) => new Date(visit.timestamp) > last7Days,
    ).length;

    const timestamps = visits.map((visit) =>
      new Date(visit.timestamp).getTime(),
    );
    const lastVisit = new Date(Math.max(...timestamps));
    const firstVisit = new Date(Math.min(...timestamps));

    return {
      data: {
        wifi_user_id: customerId,
        total_visits: totalVisits,
        last_30_days_visits: last30DaysVisits,
        last_7_days_visits: last7DaysVisits,
        last_visit: lastVisit,
        first_visit: firstVisit,
      },
      error: null,
    };
  } catch (error) {
    console.error(
      `Error fetching visits for customer ID ${customerId}:`,
      error,
    );
    return {
      data: getDefaultCustomerVisits(customerId),
      error: error as Error,
    };
  }
}

// Function to fetch the full details of a customer
export async function fetchCustomerFullDetails(
  customer: Customer,
): Promise<FetchResult<CustomerFullData>> {
  const supabase = createClient();

  try {
    // Fetch the segments and visits in parallel
    const [segmentsResult, visitsResult] = await Promise.all([
      fetchSegmentsByCustomerId(customer.wifi_user_id),
      fetchVisitsByCustomerId(customer.wifi_user_id),
    ]);

    // Check for errors in the fetched data
    if (segmentsResult.error) throw segmentsResult.error;
    if (visitsResult.error) throw visitsResult.error;

    // Construct the full customer data
    const customerFullData: CustomerFullData = {
      customer,
      segments: segmentsResult.data || [],
      visits: visitsResult.data,
    };

    return { data: customerFullData, error: null };
  } catch (error) {
    console.error(
      `Error fetching full details for customer ${customer.wifi_user_id}:`,
      error,
    );
    return { data: null, error: error as Error };
  }
}
