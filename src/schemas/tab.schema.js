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

export const tabBodySchema = z.object({
  tabActive: z.boolean().optional(),
  dateTaken: z.iso
    .datetime({ error: "Date taken is required" })
    .max(new Date()),
  tabTotal: z.number().optional(),
  items: z.array(items),
});

export const tabParamsSchema = z.object({
  debtorId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid MongoDB ObjectId",
  }),
});
