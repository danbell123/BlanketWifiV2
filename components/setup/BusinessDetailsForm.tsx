"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import businessDetailsSchema from "@/types/setupForms/businessDetailsSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";

interface BusinessDetailsFormProps {
  onSubmit: SubmitHandler<z.infer<typeof businessDetailsSchema>>;
  onBack: () => void;  // Prop for handling back navigation
  initialData?: z.infer<typeof businessDetailsSchema>; // Prop for setting initial values
}

export default function BusinessDetailsForm({ onSubmit, onBack, initialData }: BusinessDetailsFormProps) {
  const form = useForm<z.infer<typeof businessDetailsSchema>>({
    resolver: zodResolver(businessDetailsSchema),
    defaultValues: initialData || {},
});

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-row gap-8">
            <div className="w-1/2">
                <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Business Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Your business name" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="w-1/2">
            <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Industry</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., Retail" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            </div>
        </div>
        <FormField
          control={form.control}
          name="avgCustomers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Average Customers</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 100 per day" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addressLine1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 1</FormLabel>
              <FormControl>
                <Input placeholder="123 Business St" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addressLine2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 2 (optional)</FormLabel>
              <FormControl>
                <Input placeholder="Building, Suite, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-8">
            <div className="w-1/2">
            <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
                <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                    <Input placeholder="City" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            </div>
            <div className="w-1/2">
            <FormField
            control={form.control}
            name="postcode"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Postcode</FormLabel>
                <FormControl>
                    <Input placeholder="Postcode" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            </div>
        </div>
        <FormField
          control={form.control}
          name="county"
          render={({ field }) => (
            <FormItem>
              <FormLabel>County</FormLabel>
              <FormControl>
                <Input placeholder="County" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 mt-4">
          <Button onClick={onBack} variant="secondary" type="button">
            Back
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Submitting...' : 'Next'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
