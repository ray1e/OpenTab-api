import { z } from "zod";

export const tabSchema = z.object({
  tabActive: z.boolean().optional(),
  dateTaken: z.date({ error: "Date taken is required" }).max(new Date()),
  tabTotal: z.number().optional(),
  items: z.array({
    itemName: z.string().min(1, { message: "Item name is required" }),
    itemPrice: z
      .number()
      .min(0, { message: "Item price must be a positive number" }),
    itemQuantity: z
      .number()
      .min(1, { message: "Item quantity must be at least 1" }),
  }),
});
