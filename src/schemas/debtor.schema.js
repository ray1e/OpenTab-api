import { z } from "zod";

export const debtorBodySchema = z.object({
  name: z
    .string()
    .min(1, { message: "Debtor name is required" })
    .max(50, { message: "Debtor name must be less than 50 characters" })
    .trim(),
});

export const debtorQuerySchema = z
  .object({
    include: z.enum(["tabs"]).optional(),
  })
  .strict();
