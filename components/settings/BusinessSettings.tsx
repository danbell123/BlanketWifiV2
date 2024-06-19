"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import businessDetailsSchema from "@/types/setupForms/businessDetailsSchema";
import { Tenant } from "@/types/tenant";
import { fetchTenantProfile, updateTenantProfile } from "@/services/tenantsService";
import { createClient } from "@/utils/supabase/client";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function BusinessSettings() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tenant, setTenant] = useState<Tenant | null>(null);
    const supabase = createClient();

    // Setup the form with react-hook-form
    const form = useForm<Tenant>({
        resolver: zodResolver(businessDetailsSchema),
        mode: 'onBlur'
    });

    useEffect(() => {
        async function loadTenant() {
            setIsLoading(true);
            const { data, error } = await supabase.auth.getUser();
            if (error || !data.user) {
                console.error("Failed to fetch user:", error);
                setError("Failed to load user");
                setIsLoading(false);
                return;
            }
            const result = await fetchTenantProfile(data.user.id);
            if (result.error) {
                console.error("Failed to fetch tenant profile:", result.error);
                setError("Failed to load tenant profile");
            } else if (result.data) {
                setTenant(result.data);
                form.reset(result.data); // Pre-fill the form with fetched data
            } else {
                console.error("No data available to reset the form");
                setError("Failed to load data to reset the form");
            }
            setIsLoading(false);
        }

        loadTenant();
    }, [form.reset]);

    const onSubmit = async (data: Tenant) => {
        console.log('Submitted Data:', data);
        try {
            await updateTenantProfile(data, businessDetailsSchema);
            console.log('Tenant business profile updated successfully!');
        } catch (error) {
            console.error('Error updating tenant business profile:', error);
            setError('Error updating business profile');
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                <div className="flex flex-row gap-12 w-full">
                    <div className="w-1/3">
                        <h2 className="text-lg font-semibold">Business Settings</h2>
                        <p className="text-sm text-card-foreground">
                            Configure the detailed aspects of your business.
                        </p>
                    </div>
                    <div className="bg-card p-4 w-2/3 rounded space-y-4">
                        <FormField
                            control={form.control}
                            name="businessName"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Business Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage>{fieldState.error?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="avgCustomers"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Average Customers</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage>{fieldState.error?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="addressLine1"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Address Line 1</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage>{fieldState.error?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="addressLine2"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Address Line 2</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage>{fieldState.error?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage>{fieldState.error?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="postcode"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Postcode</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage>{fieldState.error?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="county"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>County</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage>{fieldState.error?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="industry"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Industry</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage>{fieldState.error?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-end">
                    <Button
                        variant="outline"
                        type="submit"
                        disabled={isLoading}
                        className="w-min"
                    >
                        {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

