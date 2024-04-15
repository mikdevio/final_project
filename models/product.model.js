import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: String,
    price: Number,
    cost: Number,
    tax: Number,
    discount: Number,
    description: String,
    quantity: Number,
    img: {
      data: Buffer,
      contentType: String,
    },
    category: { 
      type: Schema.Types.ObjectId, 
      ref: "Category"
      }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
