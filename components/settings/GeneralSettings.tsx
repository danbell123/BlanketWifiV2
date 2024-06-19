"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import yourDetailsSchema from "@/types/setupForms/yourDetailsSchema";
import { Tenant } from "@/types/tenant";
import { fetchTenantProfile, updateTenantProfile } from "@/services/tenantsService";
import { createClient } from "@/utils/supabase/client";


// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"

const fields: Array<{ name: keyof Tenant, label: string, type?: React.HTMLInputTypeAttribute }> = [
    { name: 'firstname', label: 'First Name' },
    { name: 'secondname', label: 'Second Name' },
    { name: 'telephone', label: 'Telephone' },
    { name: 'gender', label: 'Gender' },
    { name: 'dob', label: 'Date of Birth', type: 'date' },
    { name: 'howDidYouHearAboutUs', label: 'How did you hear about us?' },
];


export default function GeneralSettings() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tenant, setTenant] = useState<Tenant | null>(null);
    const supabase = createClient();

    // Setup the form with react-hook-form
    const form = useForm<Tenant>({
        resolver: zodResolver(yourDetailsSchema),
        mode: 'onBlur',
        defaultValues: tenant ? tenant : undefined
    });

    useEffect(() => {
        async function loadTenant() {
            setIsLoading(true);
            const { data, error } = await supabase.auth.getUser();
            if (error || !data.user) {
                toast.error("Failed to fetch user");
                setError("Failed to load user");
                setIsLoading(false);
                return;
            }
            const result = await fetchTenantProfile(data.user.id);
            if (result.error) {
                toast.error("Failed to fetch tenant profile");
                setError("Failed to load tenant profile");
            } else if (result.data) {
                setTenant(result.data);
                form.reset(result.data); // Pre-fill the form with fetched data
            } else {
                toast.error("No data available to reset the form");
                setError("Failed to load data to reset the form");
            }
            setIsLoading(false);
        }

        loadTenant();
    }, [form.reset]);

    const onSubmit = async (data: Tenant) => {
        console.log('Submitted Data:', data);
        try {
            await updateTenantProfile(data, yourDetailsSchema);
            toast.success("Update successful")

        } catch (error) {
            toast.error("Failed to update profile");
            setError('Error updating profile');
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <div className="flex flex-row gap-12">
                    <div className="w-1/3">
                        <h2 className="text-lg font-semibold">General Settings</h2>
                        <p className="text-sm text-card-foreground">
                            Configure the basic details of your tenant.
                        </p>
                    </div>
                    <div className="bg-card p-4 w-2/3 rounded space-y-8">
                        {fields.map(({ name, label, type = 'text' }) => (
                            <FormField
                                control={form.control}
                                name={name}
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel>{label}</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type={type}
                                                value={(field.value instanceof Date ? field.value.toISOString().substring(0, 10) : field.value) || ''}
                                            />
                                        </FormControl>
                                        {fieldState.error && (
                                            <FormMessage>{fieldState.error.message}</FormMessage>
                                        )}
                                    </FormItem>
                                )}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex flex-row justify-end">
                    <Button type="submit" variant={'outline'}>
                        Save Changes
                    </Button>
                </div>
            </form>
        </Form>
    );
}
