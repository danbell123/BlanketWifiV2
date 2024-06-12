"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import registrationSchema from "@/types/registrationSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [isComplete, setIsComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof registrationSchema>> = async (
    data,
  ) => {
    setLoading(true); // Start loading before the request
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    setLoading(false); // Stop loading after the request completes

    if (error) {
      toast.error(error.message);
    } else {
      setIsComplete(true);
      toast.success(
        "Registration successful, please check your email to verify your account",
      );
    }
  };

  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Register</h2>
        <p className="text-sm">
          Already have an account?
          <span
            onClick={onSwitchToLogin}
            className="text-primary cursor-pointer hover:underline pl-1"
          >
            Login
          </span>
        </p>
      </div>
      {isComplete ? (
        <div className="flex flex-row bg-green-800 p-2 gap-2 rounded-xl">
          <span className="material-icons text-3xl text-green-500">
            check_circle
          </span>
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-lg">Thank you for registering!</p>
            <p className="text-base text-card-foreground">
              Please check your email to verify your account.
            </p>
          </div>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordCheck"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Submit"}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default RegisterForm;
