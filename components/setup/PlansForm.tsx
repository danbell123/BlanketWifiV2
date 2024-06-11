"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import plansSchema from "@/types/setupForms/plansSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


interface PlansFormProps {
  onSubmit: SubmitHandler<z.infer<typeof plansSchema>>;
  onBack: () => void;
}

export default function PlansForm({ onSubmit, onBack }: PlansFormProps) {
  const form = useForm<z.infer<typeof plansSchema>>({
    resolver: zodResolver(plansSchema),
  });

  return (
    <>
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
                <FormLabel>Select Plan Level</FormLabel>
                <FormControl>
                    <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    >
                        <div className="flex flex-row gap-2 w-full justify-between">
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex flex-col w-full border border-border border-dashed rounded p-4 gap-4">
                                        <div className="flex flex-row gap-2 items-center w-full">
                                            <RadioGroupItem value="1" />
                                            <h2 className="text-lg font-semibold text-left w-full">Level 1</h2>
                                        </div>
                                        <div className="flex flex-row gap-2 justify-start w-full ">
                                            <span className="material-icons text-2xl text-card-foreground">sms</span>
                                            <p className="text-center text-sm text-card-foreground">100 SMS</p>
                                        </div>
                                        <div className="flex flex-row gap-2 justify-start w-full ">
                                            <span className="material-icons text-2xl text-card-foreground">email</span>
                                            <p className="text-center text-sm text-card-foreground">1000 Emails</p>
                                        </div>
                                        <div className="flex flex-row gap-2 justify-start w-full">
                                            <span className="material-icons text-2xl text-card-foreground">schedule</span>
                                            <p className="text-center text-sm text-card-foreground">3 Automated Emails</p>
                                        </div>
                                        <div className="flex flex-row gap-2 justify-start w-full">
                                            <p className="text-center text-base text-foreground">£25 / month</p>
                                        </div>
                                    </div>
                                </FormControl>
                            </FormItem>
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex flex-col w-full border border-border border-dashed rounded p-4 gap-4">
                                        <div className="flex flex-row gap-2 items-center w-full">
                                            <RadioGroupItem value="2" />
                                            <h2 className="text-lg font-semibold text-left w-full">Level 2</h2>
                                        </div>
                                        <div className="flex flex-row gap-2 justify-start w-full ">
                                            <span className="material-icons text-2xl text-card-foreground">sms</span>
                                            <p className="text-center text-sm text-card-foreground">100 SMS</p>
                                        </div>
                                        <div className="flex flex-row gap-2 justify-start w-full ">
                                            <span className="material-icons text-2xl text-card-foreground">email</span>
                                            <p className="text-center text-sm text-card-foreground">1000 Emails</p>
                                        </div>
                                        <div className="flex flex-row gap-2 justify-start w-full">
                                            <span className="material-icons text-2xl text-card-foreground">schedule</span>
                                            <p className="text-center text-sm text-card-foreground">3 Automated Emails</p>
                                        </div>
                                        <div className="flex flex-row gap-2 justify-start w-full">
                                            <p className="text-center text-base text-foreground">£25 / month</p>
                                        </div>
                                    </div>
                                </FormControl>
                            </FormItem>
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex flex-col w-full border border-border border-dashed rounded p-4 gap-4">
                                        <div className="flex flex-row gap-2 items-center w-full">
                                            <RadioGroupItem value="3" />
                                            <h2 className="text-lg font-semibold text-left w-full">Level 3</h2>
                                        </div>
                                        <div className="flex flex-row gap-2 justify-start w-full ">
                                            <span className="material-icons text-2xl text-card-foreground">sms</span>
                                            <p className="text-center text-sm text-card-foreground">100 SMS</p>
                                        </div>
                                        <div className="flex flex-row gap-2 justify-start w-full ">
                                            <span className="material-icons text-2xl text-card-foreground">email</span>
                                            <p className="text-center text-sm text-card-foreground">1000 Emails</p>
                                        </div>
                                        <div className="flex flex-row gap-2 justify-start w-full">
                                            <span className="material-icons text-2xl text-card-foreground">schedule</span>
                                            <p className="text-center text-sm text-card-foreground">3 Automated Emails</p>
                                        </div>
                                        <div className="flex flex-row gap-2 justify-start w-full">
                                            <p className="text-center text-base text-foreground">£25 / month</p>
                                        </div>
                                    </div>
                                </FormControl>
                            </FormItem>
                        </div>
                    </RadioGroup>
                </FormControl>
                <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-4">
          <Button type="button" variant="secondary" onClick={onBack}>Back</Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Submitting...' : 'Next'}
          </Button>
        </div>
      </form>
    </Form>
    </>
  );
}
