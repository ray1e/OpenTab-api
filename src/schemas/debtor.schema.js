import { z } from "zod";

export const debtorSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Debtor name is required" })
    .max(50, { message: "Debtor name must be less than 50 characters" })
    .trim(),
});
