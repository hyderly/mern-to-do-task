import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: "String",
      required: [true, "Please Enter Name"],
    },
    email: {
      type: "String",
      required: [true, "Please Enter Email"],
    },
    password: {
      type: "String",
      required: [true, "Please Enter Password"],
    },
  },
  { timestamp: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


userSchema.methods.matchPassword = async function(enteredPassword){
  return bcrypt.compare(enteredPassword, this.password);
}

// Sign Token and return
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const UserModel = mongoose.model("user", userSchema);