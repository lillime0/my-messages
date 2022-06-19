import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter an email"],
      lowercase: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "Please enter a valid email"
      }
    },
    message: {
      type: String,
      required: [true, "Please enter a message"],
      trim: true,
      minlength: [10, "Message cannot be less than 10 characters"],
      maxlength: [1000, "Message cannot be more than 1000 characters"]
    }
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
