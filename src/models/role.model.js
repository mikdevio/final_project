import mongoose from "mongoose";
const Schema = mongoose.Schema;

const roleSchema = new Schema(
  {
    name: String,
    description: String,
    permissions: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Role", roleSchema);
