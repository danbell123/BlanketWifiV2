import { createClient } from "../utils/supabase/client";
import { Activity } from "@/types/index";

interface FetchResult<T> {
  data: T | null;
  error: Error | null;
}

// Function to fetch all visits (connections)
export async function fetchVisits(
  userId: string,
  offset: number,
  limit: number,
): Promise<FetchResult<Activity[]>> {
  const supabase = createClient(); // Creating a Supabase client instance

  try {
    const { data: visits, error } = await supabase
      .from("connections") // Specifying the table
      .select("*") // Selecting all columns
      .eq("wifi_user_id", userId) // Filtering by user ID
      .order("timestamp", { ascending: false }) // Ordering by timestamp
      .range(offset, offset + limit - 1); // Pagination

    if (error) throw error; // If there's an error, throw to catch block

    return { data: visits, error: null }; // Returning fetched data and null for error
  } catch (error) {
    console.error("Error fetching visits:", error); // Logging error to console
    return { data: null, error: error as Error }; // Returning null for data and the error
  }
}
