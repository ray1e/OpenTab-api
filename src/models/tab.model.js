import { Schema, model } from "mongoose";

const tabSchema = new Schema(
  {
    debtorId: {
      type: Schema.Types.ObjectId,
      ref: "Debtor",
      required: true,
      index: true,
    },
    dateTaken: { type: Date, required: true },
    tabTotal: { type: Number, default: 0 },
    tabPaid: { type: Boolean, required: true, default: false },
    datePaid: { type: Date },
    items: [
      {
        itemName: { type: String, required: true },
        itemPrice: { type: Number, required: true },
        itemQuantity: { type: Number, required: true },
        itemPaid: { type: Boolean, required: true, default: false },
        datePaid: { type: Date },
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Tab = model("Tab", tabSchema);

export default Tab;
