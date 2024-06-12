import { z } from "zod";

export type Segment = {
  tenant_id: string;
  segment_id: string;
  name: string;
  description: string | null;
  colour: string;
  type: "manual" | "auto";
  rule: JSON;
  created_at: Date;
  updated_at: Date;
};

export const segmentSchema = z.object({
  tenant_id: z.string(),
  segment_id: z.string(),
  name: z.string().min(1, { message: "Name is required" }).max(255, { message: "Name must be less than 255 characters" }),
  description: z.string().nullable().optional(),
  colour: z
    .string()
    .regex(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/, { message: "Invalid hex colour code" })
    .min(1, { message: "Colour is required" }),
  type: z.enum(["manual", "auto"], { errorMap: () => ({ message: "Type must be either 'manual' or 'auto'" }) }),
  rule: z.any(), // Replace with a more specific schema if you have one for the JSON structure
  created_at: z.date(),
  updated_at: z.date(),
});
