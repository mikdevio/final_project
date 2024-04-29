import mongoose from "mongoose";
const Schema = mongoose.Schema;

const saleSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "Customer" },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
      },
    ],
    subTotal: Number,
    totalAmount: Number,
    taxAmount: Number,
    discountAmount: Number,
    payWith: Number,
    payChange: Number
  },
  { timestamps: true }
);

export default mongoose.model("Sale", saleSchema);
