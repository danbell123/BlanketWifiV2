import { createClient } from "../utils/supabase/client";
import { z } from "zod";
import yourDetailsSchema from "@/types/setupForms/yourDetailsSchema";
import businessDetailsSchema from "@/types/setupForms/businessDetailsSchema";
import plansSchema from "@/types/setupForms/plansSchema";
import networkSchema from "@/types/setupForms/networkSchema";
import SetupFormData from "@/types/setupForms/setupFormData";
import { Tenant } from "@/types/tenant";
import { isSet } from "util/types";

interface FetchResult<T> {
  data: T | null;
  error: Error | null;
}

interface TenantSetupCheckResult {
  exists: boolean;
  isSetup: boolean | null; // isSetup will be null if the tenant doesn't exist
}

interface TenantActiveCheckResult {
  exists: boolean;
  res: boolean | null; // isSetup will be null if the tenant doesn't exist
}

export async function checkTenantSetup(tenantId: string): Promise<TenantSetupCheckResult> {
  const supabase = createClient();

  if (!tenantId) {
    throw new Error("Tenant ID must be provided");
  }

  // Query the tenant based on tenant_id
  const { data, error } = await supabase
    .from("tenants")
    .select("is_setup")
    .eq("tenant_id", tenantId)
    .single(); // Using .single() as we expect at most one record for a given tenant_id

  if (error) {
    // Handle possible errors, such as no matching tenant being found
    console.error("Error fetching tenant:", error.message);
    return { exists: false, isSetup: null };
  }

  if (data) {
    // If data is returned, check the is_setup field
    return { exists: true, isSetup: data.is_setup };
  } else {
    // If no data is returned, the tenant does not exist
    return { exists: false, isSetup: null };
  }
}

export async function checkTenantActive(tenantId: string): Promise<TenantActiveCheckResult> {
  const supabase = createClient();

  if (!tenantId) {
    throw new Error("Tenant ID must be provided");
  }

  // Query the tenant based on tenant_id
  const { data, error } = await supabase
    .from("tenants")
    .select("is_active")
    .eq("tenant_id", tenantId)
    .single(); // Using .single() as we expect at most one record for a given tenant_id

  if (error) {
    // Handle possible errors, such as no matching tenant being found
    console.error("Error fetching tenant:", error.message);
    return { exists: false, res: null };
  }

  if (data) {
    // If data is returned, check the is_setup field
    return { exists: true, res: data.is_active };
  } else {
    // If no data is returned, the tenant does not exist
    return { exists: false, res: null };
  }
}

export async function fetchTenantProfile(tenantId: string): Promise<FetchResult<Tenant>> {
  const supabase = createClient();

  if (!tenantId) {
    throw new Error("Tenant ID must be provided");
  }

  // Query the tenant based on tenant_id
  const { data, error } = await supabase
    .from("tenants")
    .select("*")
    .eq("tenant_id", tenantId)
    .single(); // Using .single() as we expect at most one record for a given tenant_id

  if (error) {
    // Handle possible errors, such as no matching tenant being found
    console.error("Error fetching tenant:", error.message);
    return { data: null, error };
  }

  if (data) {
    // If data is returned, return it as the tenant profile
    return { data, error: null };
  } else {
    // If no data is returned, the tenant does not exist
    return { data: null, error: null };
  }
}

export async function addTenantProfile(formData: SetupFormData): Promise<void> {
  const supabase = createClient(); // Ensure the client is initialized

  // Fetch the authenticated user
  const { data: userData, error: authError } = await supabase.auth.getUser();
  if (authError || !userData.user) {
    console.error("User not authenticated:", authError);
    throw new Error("Authentication required");
  }

  // Extract the user ID as tenant_id from the authenticated user details
  const tenantId = userData.user.id; // Assuming the user's ID corresponds to tenant_id
  if (!tenantId) {
    throw new Error("No tenant ID available");
  }

  const { details, businessDetails, planDetails, networkDetails } = formData;

  // Serialize networkConfig to JSON string if it exists
  const networkConfigJSON = networkDetails.networkConfig ? JSON.stringify(networkDetails.networkConfig) : {};

  const dataToInsert = {
    is_setup: true,
    tenant_id: tenantId,
    firstname: details.firstname,
    secondname: details.secondname,
    telephone: details.telephone,
    gender: details.gender,
    dob: details.dob,
    howDidYouHearAboutUs: details.howDidYouHearAboutUs,
    businessName: businessDetails.businessName,
    avgCustomers: businessDetails.avgCustomers,
    addressLine1: businessDetails.addressLine1,
    addressLine2: businessDetails.addressLine2,
    city: businessDetails.city,
    postcode: businessDetails.postcode,
    county: businessDetails.county,
    industry: businessDetails.industry,
    planLevel: planDetails.level,
    networkDetails: networkDetails.setupName,
    networkConfig: networkConfigJSON,
  };

  console.log("Data to insert:", dataToInsert);

  // Use upsert to either create a new row or update the existing one
  const { data, error } = await supabase
    .from("tenants")
    .upsert(dataToInsert, { onConflict: "tenant_id" }); // Specify the conflict column to be tenant_id

  if (error) {
    console.error("Failed to add or update tenant profile:", error.message);
    throw error;  // Re-throw the error for external handling
  } else {
    console.log("Tenant profile added or updated successfully");
  }
}

export async function addTenantEmptyProfile(tenantID: string): Promise<void> {

  const dataToInsert = {
    tenant_id: tenantID,
    is_setup: false,
    is_active: false,
  };

  console.log("Empty Data to insert:", dataToInsert);
  const supabase = createClient(); // Ensure the client is initialized

  // Use upsert to either create a new row or update the existing one
  const { data, error } = await supabase
    .from("tenants")
    .insert(dataToInsert); 

  if (error) {
    console.error("Failed to add or update tenant profile:", error.message);
    throw error;  // Re-throw the error for external handling
  } else {
    console.log("Tenant profile added or updated successfully");
  }
}

export async function updateTenantProfile(formData: any, schema: z.ZodType<any>): Promise<void> {
  const supabase = createClient(); // Ensure the client is initialized

  // Fetch the authenticated user
  const { data: userData, error: authError } = await supabase.auth.getUser();
  if (authError || !userData.user) {
    console.error("User not authenticated:", authError);
    throw new Error("Authentication required");
  }

  const tenantId = userData.user.id; // Assuming the user's ID corresponds to tenant_id
  if (!tenantId) {
    throw new Error("No tenant ID available");
  }

  // Validate formData using the provided schema
  const result = schema.safeParse(formData);
  if (!result.success) {
    console.error("Validation failed:", result.error);
    throw new Error("Validation failed");
  }

  const updateData = result.data; // Data is now guaranteed to conform to the schema

  console.log("Data to update:", updateData);

  // Update the row using upsert
  const { data, error } = await supabase
    .from("tenants")
    .upsert({ tenant_id: tenantId, ...updateData }, { onConflict: "tenant_id" });

  if (error) {
    console.error("Failed to update tenant profile:", error.message);
    throw error;  // Re-throw the error for external handling
  } else {
    console.log("Tenant profile updated successfully");
  }
}
