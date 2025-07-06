import mongoose from "mongoose";

const LeetburnsUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    requests: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.models.users ||
  mongoose.model("users", LeetburnsUserSchema);
