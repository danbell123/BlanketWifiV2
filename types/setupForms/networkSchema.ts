import { z } from "zod";

const unifiConfig = z.object({
  username: z.string().optional(),
  password: z.string().optional(),
  controllerUrl: z.string().optional(),
  controllerIP: z.string().optional(),
});

const omadaConfig = z.object({
  username: z.string().optional(),
  password: z.string().optional(),
  omadaUrl: z.string().optional(),
});

const networkSchema = z.object({
  setupName: z.string(),
  networkConfig: z.union([unifiConfig, omadaConfig]).optional(), // This will handle different network configurations.
});

export default networkSchema;

