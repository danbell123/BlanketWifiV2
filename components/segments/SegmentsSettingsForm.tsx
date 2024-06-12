import React, { useEffect, useState } from "react";
import { Segment, segmentSchema } from "@/types/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { updateSegment } from "@/services/segmentsService";
import { toast } from "sonner";
import ManualCustomerSelectionBox from "./ManualCustomerSelectionBox";

interface SegmentsSettingsFormProps {
  segment: Segment;
}

function SegmentsSettingsForm({ segment }: SegmentsSettingsFormProps) {
  const [isDirty, setIsDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof segmentSchema>>({
    resolver: zodResolver(segmentSchema),
    defaultValues: {
      tenant_id: segment.tenant_id,
      segment_id: segment.segment_id,
      name: segment.name,
      description: segment.description || "",
      colour: segment.colour || "#FFFFFF", // Default to white if no colour is provided
      type: segment.type,
      rule: segment.rule,
      created_at: new Date(segment.created_at),
      updated_at: new Date(segment.updated_at),
    },
  });

  const { formState: { isDirty: formIsDirty }, handleSubmit, control, reset } = form;

  useEffect(() => {
    setIsDirty(formIsDirty);
  }, [formIsDirty]);

  async function onSubmit(values: z.infer<typeof segmentSchema>) {
    setIsLoading(true);
    try {
      const result = await updateSegment({
        segmentId: segment.segment_id,
        updatedData: values,
      });

      if (result.error) {
        toast("Failed to update segment.");
      } else {
        toast("Segment updated successfully.");
        reset(values); // Reset the form with the updated values
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div className="flex flex-row gap-12">
          <div className="w-1/3">
            <h2 className="text-lg font-semibold">General Settings</h2>
            <p className="text-sm text-card-foreground">Configure the basic details of your segment.</p>
          </div>
          <div className="bg-card p-4 w-2/3 rounded space-y-8">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Segment Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Segment Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name of your segment.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormDescription>
                    This is the description of your segment.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="colour"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Segment Colour</FormLabel>
                  <FormControl>
                    <div className="flex flex-row gap-2 items-center">
                      <input
                        type="color"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="rounded-none h-full p-0 border-none"
                        style={{ width: '2.5rem' }}
                      />
                      <Input placeholder="Segment Colour" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Colour of your segment in hex format.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex flex-row gap-12">
          <div className="w-1/3">
            <h2 className="text-lg font-semibold">Customer Selection</h2>
            <p className="text-sm text-card-foreground pb-4">Segments can be set to automatically add customers based upon their activity. Manual customer selection is also available.</p>
            <p className="text-sm text-card-foreground">If a customer no longer meets the rule they will be removed from the segment.</p>
          </div>
          <div className="bg-card p-4 w-2/3 rounded space-y-4">
            <FormField
              control={control}
              name="type"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a segment type" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="auto">Automated</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormDescription>
                        This is the type of your segment.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
              )}
            />
            {form.watch("type") === "manual" && (
                <ManualCustomerSelectionBox segment_id={segment.segment_id}/>
                
            )}
          </div>
        </div>
        
        <div className="flex flex-row justify-end ">
            <Button variant="outline" type="submit" disabled={!isDirty || isLoading} className="w-min">
            {isLoading ? "Saving..." : "Save Settings"}
            </Button>
        </div>
      </form>
    </Form>
  );
}

export default SegmentsSettingsForm;
