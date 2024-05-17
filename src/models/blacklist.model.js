import mongoose from "mongoose";

const BlacklistScheme = new mongoose.Schema(
    {
        token: {
            type: String, 
            require: true,
            ref:"User",
        },
    },
    { timestamps: true }
);

export default mongoose.model("blacklist", BlacklistScheme);