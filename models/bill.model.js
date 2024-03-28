const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billSchema = new Schema(
  {
    sale: { type: Schema.Types.ObjectId, ref: "Sale" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    paymentMethod: String,
  },
  { timestamps: true }
);

const Bill = mongoose.model("Bill", billSchema);

module.exports = Bill;
