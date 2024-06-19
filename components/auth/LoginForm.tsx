"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "@/types/loginSchema";
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
import { z } from "zod";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { useRouter } from "next/navigation"; // Import useRouter

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Get the router object
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const signIn: SubmitHandler<z.infer<typeof loginSchema>> = async (data) => {
    setLoading(true); // Start loading
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    setLoading(false); // Stop loading

    if (error) {
      toast.error(error.message || "Could not authenticate user");
    } else {
      toast.success("Login successful");
      router.push('/dashboard'); // Redirect to the dashboard or desired path after login
    }
  };

  return (
    <BackgroundGradient className="p-1">
      <div className="flex flex-col gap-8 h-min bg-card border p-10 rounded-2xl">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Login</h2>
          <p className="text-sm text-card-foreground">
            Don't have an account?
            <span
              onClick={onSwitchToRegister}
              className="text-primary cursor-pointer hover:underline pl-1"
            >
              Register
            </span>
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(signIn)} className="space-y-8">
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
            <div className="flex flex-row justify-between items-center">
              <Button type="submit" disabled={loading}>
                {loading ? "Loggin in..." : "Log In"}
              </Button>
            </div>
          </form>
        </Form>
        <Button variant={"link"} size={"sm"} onClick={() => router.push('/forgot-password')}>
                Forgot Password?
              </Button>
      </div>
    </BackgroundGradient>
  );
};

export default LoginForm;
