import mongoose from "mongoose";
const Schema = mongoose.Schema;


const productsListSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  quantity: Number,
}, {_id: false});

const saleSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "Customer" },
    products: [ productsListSchema ],
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