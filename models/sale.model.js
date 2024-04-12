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
    discountAmount: Number
  },
  { timestamps: true }
);

const Sale = mongoose.model("Sale", saleSchema);

export default Sale;
