import { createClient } from '../utils/supabase/client';

interface Tenant {
    tenant_id: string | null;
    isSetup: boolean;
}

interface FetchResult<T> {
    data: T | null;
    error: Error | null;
}

export async function fetchTenantById(tenantId: string): Promise<FetchResult<Tenant>> {
    if (!tenantId) {
        return { data: null, error: new Error('No tenant ID provided') };
    }

    const supabase = createClient();

    // Attempt to fetch the tenant
    const { data: existingTenant, error: fetchError } = await supabase
        .from('tenants')
        .select('*')
        .eq('tenant_id', tenantId)
        .single();

    if (fetchError && fetchError.code !== "PGRST116") { // Error code for no tenant found. If no tenants found we are adding a new tenant 
        return { data: null, error: fetchError };
    }

    if (existingTenant) {
        // Tenant exists, return the data
        return { data: existingTenant, error: null };
    } else {
        // Tenant does not exist, create a new one
        try {
            await addTenantProfile(tenantId);
            // After adding, re-fetch to get the new tenant record
            const { data: newTenant, error: refetchError } = await supabase
                .from('tenants')
                .select('*')
                .eq('tenant_id', tenantId)
                .single();
                
            if (refetchError) {
                return { data: null, error: refetchError };
            }

            return { data: newTenant, error: null };
        } catch (error) {
            return { data: null, error: error };
        }
    }
}


export async function addTenantProfile(tenantId: string): Promise<void> {
    console.log("Adding tenant profile for tenant ID:", tenantId);
    const supabase = createClient();
    const { error } = await supabase
        .from('tenants')
        .insert([{ tenant_id: tenantId, is_setup: false }])
        .single();  // Insert the tenant as a single record

    if (error) {
        console.error("Failed to add tenant profile:", error.message);
        throw error;  // Optionally re-throw the error or handle it as needed
    }
}
