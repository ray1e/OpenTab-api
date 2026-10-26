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
    tabPaid: z.enum(["true", "false"]).optional(),
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(10),
  })
  .refine((data) => !(data.tabPaid && data.include !== "tabs"), {
    message: "'tabPaid' filter requires 'include=tabs'",
    path: ["tabPaid"],
  })
  .strict();
