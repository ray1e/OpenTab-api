import { z } from "zod";
import mongoose from "mongoose";

const items = z.object({
  itemName: z.string().min(1, { message: "Item name is required" }),
  itemPrice: z
    .number()
    .min(0, { message: "Item price must be a positive number" }),
  itemQuantity: z
    .number()
    .min(1, { message: "Item quantity must be at least 1" }),
  itemActive: z.boolean().optional(),
});

const debtorIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid MongoDB ObjectId",
  });

export const tabBodySchema = z.object({
  tabActive: z.boolean().optional(),
  dateTaken: z.iso
    .datetime({ error: "Date taken is required" })
    .max(new Date()),
  items: z.array(items),
});

export const tabUpdateBodySchema = tabBodySchema
  .omit({ items: true })
  .partial()
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export const tabForExistingDebtSchema = tabBodySchema.extend({
  debtorId: debtorIdSchema,
});

export const tabsBodySchema = z.object({
  tabs: z
    .array(tabForExistingDebtSchema)
    .min(1, "At least one tab is required"),
});

export const tabParamsSchema = z.object({
  debtorId: debtorIdSchema,
});
