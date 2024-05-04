import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

import * as settings from "../settings.js";

const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;

const customerSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    tax_number: String,
    email: String,
    phone: String,
    password: String,
    img: {
      data: {
        type: Buffer,
         // FIXME: Improve path for default image
        default: fs.readFileSync(path.join(settings.__dirname, "public/assets/img/perfile_default.png")),
      },
      contentType: String
    }
  },
  { timestamps: true }
);

customerSchema.pre("save", function (next) {
  let customer = this;

  // If password is not modified or new got to next
  if (!customer.isModified("password")) return next();

  // Generating a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    // If error go to next
    if (err) return next();

    bcrypt.hash(customer.password, salt, (err, hash) => {
      // If error go to next
      if (err) return next();
      customer.password = hash;
      next();
    });
  });
});

customerSchema.pre("insertMany", async function(next, docs){
  try {
    for(const doc of docs){
      const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
      doc.password = await bcrypt.hash(doc.password, salt);
    }
  } catch (error) {
    console.log(error);
  }

});

// Method to compare password
customerSchema.methods.comparePassword = (passwordToValidate, cb) => {
  bcrypt.compare(passwordToValidate, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

export default mongoose.model("Customer", customerSchema);
