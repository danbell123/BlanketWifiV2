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

export async function fetchVisitCount(
  userId: string,
  from?: Date,
  to?: Date,
): Promise<FetchResult<number>> {
  const supabase = createClient(); // Creating a Supabase client instance

  try {
    let query = supabase
      .from("connections") // Specifying the table
      .select("id") // Selecting only the ID
      .eq("wifi_user_id", userId); // Filtering by user ID

    if (from && to) {
      query = query.range(from.getTime(), to.getTime()); // Convert from and to to numbers
    }

    const { data, error } = await query;

    if (error) throw error; // If there's an error, throw to catch block

    return { data: data?.length || 0, error: null }; // Returning count or 0, and null for error
  } catch (error) {
    console.error("Error fetching visit count:", error); // Logging error to console
    return { data: 0, error: error as Error }; // Returning 0 for data and the error
  }
}

