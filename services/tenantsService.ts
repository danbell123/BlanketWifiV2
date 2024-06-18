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

interface TenantCheckResult {
  exists: boolean;
  isSetup: boolean | null; // isSetup will be null if the tenant doesn't exist
}

export async function checkTenantSetup(tenantId: string): Promise<TenantCheckResult> {
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
  const networkConfigJSON = networkDetails.networkConfig ? JSON.stringify(networkDetails.networkConfig) : null;

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
