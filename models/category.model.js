import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: String,
    description: String,
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
