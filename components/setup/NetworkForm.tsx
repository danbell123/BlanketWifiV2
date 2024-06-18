"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { z } from "zod";
import networkSchema from "@/types/setupForms/networkSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NetworkFormProps {
  onSubmit: SubmitHandler<z.infer<typeof networkSchema>>;
  onBack: () => void;
  initialData?: z.infer<typeof networkSchema>;
}

export default function NetworkForm({ onSubmit, onBack, initialData }: NetworkFormProps) {
  const form = useForm<z.infer<typeof networkSchema>>({
    resolver: zodResolver(networkSchema),
    defaultValues: initialData || {},
  });

  const setupName = useWatch({
    control: form.control,
    name: "setupName",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="setupName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Network Setup</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your current setup" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="noSetup">No Setup / Normal WiFi</SelectItem>
                    <SelectItem value="unifi">Unifi</SelectItem>
                    <SelectItem value="omada" disabled={true}>Omada - <span className="italic">Coming Soon!</span></SelectItem>
                    <SelectItem value="meraki" disabled={true}>Meraki - <span className="italic">Coming Soon!</span></SelectItem>
                    <SelectItem value="aruba" disabled={true}>Aruba - <span className="italic">Coming Soon!</span></SelectItem>
                    <SelectItem value="mikrotik" disabled={true}>MikroTik - <span className="italic">Coming Soon!</span></SelectItem>
                    <SelectItem value="ruckus" disabled={true}>Ruckus - <span className="italic">Coming Soon!</span></SelectItem>
                    <SelectItem value="cambium" disabled={true}>Cambium - <span className="italic">Coming Soon!</span></SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {setupName === "unifi" && (
          <>
            <FormField
              control={form.control}
              name="networkConfig.username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <Input {...field} placeholder="Enter your username" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="networkConfig.password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input {...field} type="password" placeholder="Enter your password" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="networkConfig.controllerUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Controller URL</FormLabel>
                  <Input {...field} placeholder="Enter controller URL" />
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <div className="flex gap-4 mt-4">
          <Button onClick={onBack} variant="secondary" type="button">
            Back
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Submitting..." : "Next"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
