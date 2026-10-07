import { Schema, model } from "mongoose";

const tabSchema = new Schema({
  debtorId: {
    type: Schema.Types.ObjectId,
    ref: "Debtor",
    required: true,
    index: true,
  },
  tabActive: { type: Boolean, required: true, default: true },
  dateTaken: { type: Date, required: true },
  tabTotal: { type: Number, default: 0, required: true },
  items: [
    {
      itemName: { type: String, required: true },
      itemPrice: { type: Number, required: true },
      itemQuantity: { type: Number, required: true },
      itemActive: { type: Boolean, required: true, default: true },
    },
  ],
});

const Tab = model("Tab", tabSchema);
export default Tab;