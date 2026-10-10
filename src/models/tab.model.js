import { Timestamp } from "mongodb";
import { Schema, model } from "mongoose";

const tabSchema = new Schema({
  debtorId: {
    type: Schema.Types.ObjectId,
    ref: "Debtor",
    required: true,
    index: true,
  },
  dateTaken: { type: Date, required: true },
  tabPaid: { type: Boolean, required: true, default: false },
  datePaid: { type: Date },
  tabTotal: { type: Number, default: 0, required: true },
  items: [
    {
      itemName: { type: String, required: true },
      itemPrice: { type: Number, required: true },
      itemQuantity: { type: Number, required: true },
      itemPaid: { type: Boolean, required: true, default: false },
      datePaid: {type: Date}
    },
  ],
}, {timestamps: true});

const Tab = model("Tab", tabSchema);
export default Tab;