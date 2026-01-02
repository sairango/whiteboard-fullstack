import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.statics.registerUser = async function (userData) {
  userData.email = userData.email.toLowerCase();

  const exists = await this.findOne({ email: userData.email });
  if (exists) throw new Error("User already exists");

  const user = new this(usrData);
  await user.save();

  return user;
};

const User = mongoose.model("User", userSchema);

export default User;
