import fs from "fs";
import path from "path";
import mongoose from "mongoose";

import { __dirname } from "../settings.js";

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
               // FIXME: Improve path for default image
              default: fs.readFileSync(path.join(__dirname, "public/assets/img/product_default.png"))
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

