import { z } from "zod";

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

export const tabSchema = z.object({
  //debtorId: z.guid().trim(),
  tabActive: z.boolean().optional(),
  dateTaken: z.iso
    .datetime({ error: "Date taken is required" })
    .max(new Date()),
  tabTotal: z.number().optional(),
  items: z.array(items),
});
