import { z } from "zod";

const yourDetailsSchema = z.object({
  firstname: z
    .string()
    .min(1, { message: "Firstname is required" })
    .max(50, { message: "Firstname must be no longer than 50 characters" }),
  secondname: z
    .string()
    .min(1, { message: "Secondname is required" })
    .max(50, { message: "Secondname must be no longer than 50 characters" }),
  telephone: z
    .string()
    .min(10, { message: "Telephone number must be at least 10 digits" })
    .max(15, { message: "Telephone number must be no longer than 15 digits" })
    .regex(/^\+?[0-9]+$/, { message: "Invalid telephone number" }),
  gender: z.string().min(1, { message: "Gender is required" }), // Changed from z.enum() to z.string()
  dob: z.string().refine(
    (dob) => {
      // Ensure the date is in the past
      return new Date(dob) <= new Date();
    },
    { message: "Invalid date of birth" },
  ),
  howDidYouHearAboutUs: z
    .string()
    .min(1, { message: "This field is required" }), // Changed from z.enum() to z.string()
});

export default yourDetailsSchema;
