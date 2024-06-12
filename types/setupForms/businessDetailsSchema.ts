import { z } from "zod";

const businessDetailsSchema = z.object({
  businessName: z
    .string()
    .min(1, { message: "Business name is required" })
    .max(50, { message: "Business name must be no longer than 50 characters" }),
  avgCustomers: z.string().min(1, { message: "This field is required" }),
  addressLine1: z
    .string()
    .min(1, { message: "Address line 1 is required" })
    .max(100, {
      message: "Address line 1 must be no longer than 100 characters",
    }),
  addressLine2: z
    .string()
    .max(100, {
      message: "Address line 2 must be no longer than 100 characters",
    })
    .optional(),
  city: z
    .string()
    .min(1, { message: "City is required" })
    .max(50, { message: "City must be no longer than 50 characters" }),
  postcode: z.string().regex(/^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/, {
    message: "Invalid UK postcode",
  }),
  county: z
    .string()
    .max(50, { message: "County must be no longer than 50 characters" })
    .optional(),
  industry: z
    .string()
    .min(1, { message: "Industry is required" })
    .max(100, { message: "Industry must be no longer than 100 characters" }),
});

export default businessDetailsSchema;
