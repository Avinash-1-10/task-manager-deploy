import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define the schema for the User collection
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    token: {
      type: String,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt timestamps
);

// Middleware to hash the password before saving the user
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

// Create the User model using the defined schema
const User = mongoose.model("User", userSchema);

export default User;
