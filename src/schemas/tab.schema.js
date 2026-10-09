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

// validate body when adding item
export const addItemsBodySchema = z.object({
  items: z
    .array(items.strict())
    .min(1, "At least one item is required"),
});

export const updateItemsBodySchema = items
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "item must have at least one field",
  });

//schema for tabId
export const tabIdParamsSchema = z.object({
  tabId: debtorIdSchema,
});

// validate debtorId
export const tabParamsSchema = z.object({
  debtorId: debtorIdSchema,
});

// For creating new tab where all fields are required
export const tabBodySchema = z.object({
  tabActive: z.boolean().optional(),
  dateTaken: z.iso
    .datetime({ error: "Date taken is required" })
    .max(new Date()),
  items: z.array(items),
});

// For updating a tab where not all fields are required
export const tabUpdateBodySchema = tabBodySchema
  .omit({ items: true })
  .partial()
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

// add new tab - debtorId is required
export const tabForExistingDebtSchema = tabBodySchema.extend({
  debtorId: debtorIdSchema,
});

// create an array of tabs
export const tabsBodySchema = z.object({
  tabs: z
    .array(tabForExistingDebtSchema)
    .min(1, "At least one tab is required"),
});

// validate an array of tabs
export const deleteManyTabsSchema = z.object({
  tabIds: z.array(debtorIdSchema).min(1, "At least one tab ID is required"),
});
