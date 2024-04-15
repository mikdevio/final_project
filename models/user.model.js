import bcrypt from "bcrypt";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;

// Schema definition
const userSchema = new Schema(
  {
    first_name: {
      type: String, 
      required:"Your first name is requiered", 
      max: 25,
    },
    last_name: {
      type: String,
      required: "Your lastname is requiered",
      max: 25,
    },
    email: {
      type: String,
      required: "Your email is required",
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: "Your password is required",
      select: false,
      max: 25,
    },
    img: {
      data: Buffer,
      contentType: String
    },
    role: { 
      type: Schema.Types.ObjectId, 
      ref: "Role", 
    }
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  let user = this;

  // If password is not modified or new got to next
  if (!user.isModified("password")) return next();

  try {
    // Generating a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      // If error go to next
      if (err) return next();

      bcrypt.hash(user.password, salt, (err, hash) => {
        // If error go to next
        if (err) return next();
        user.password = hash;
        next();
      });
    });
  } catch (error) {
    console.log(error);
  }
});

userSchema.pre("insertMany", async function(next, docs) {
  try {

    for(const doc of docs){
      const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
      doc.password = await bcrypt.hash(doc.password, salt);
    };
  } catch (error) {
    console.log(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = function (passwordToValidate) {
  return bcrypt.compare(passwordToValidate, this.password);
};

export default mongoose.model("User", userSchema);
