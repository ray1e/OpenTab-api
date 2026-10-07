import { Schema, model } from "mongoose";

const debtorSchema = new Schema({
  name: {
    type: String,
    required: [true, "customer name is required"],
    trim: true,
    minLength: [2, "customer name has to be at least 2 characters"],
    maxLength: [50, "customer name has to be less than characters"],
  },
}, {timestamps: true});

const Debtor = model("Debtor", debtorSchema);
export default Debtor;