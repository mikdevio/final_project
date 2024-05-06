import fs from "fs";
import path from "path";
import mongoose from "mongoose";

import * as settings from "../settings.js";

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
      data: { 
              type: Buffer,
              default: fs.readFileSync(settings.__product_default)
            },
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

