// Importing necessary utilities from your project's structure
import { createClient } from "../utils/supabase/client";
import { Customer } from "@/types/index"; // Ensure this path is correct based on your project setup

// Defining a type for the response of fetching operations to manage data and errors
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
