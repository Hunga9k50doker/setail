import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userId: { type: String, required: true },
  cardId: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String },
  avatar: { type: String },
  description: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  updateddAt: { type: Date, default: new Date() },
});
const User = mongoose.model("User", userSchema);
export default User;
