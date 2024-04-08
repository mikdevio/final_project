const path = require("path");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const customerSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    tax_number: String,
    email: String,
    phone: String,
    password: String,
    img: {
      data: Buffer,
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

// Method to compare password
customerSchema.methods.comparePassword = (passwordToValidate, cb) => {
  bcrypt.compare(passwordToValidate, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
