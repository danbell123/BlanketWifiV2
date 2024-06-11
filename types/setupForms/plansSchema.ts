import { z } from "zod";

const plansSchema = z.object({
  level: z.enum(['1', '2', '3'], { message: "Invalid level selected" })
});

export default plansSchema;
