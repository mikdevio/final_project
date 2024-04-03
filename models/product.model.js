const mongoose = require("mongoose");
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
      contentType: String
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
