import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: String,
  img: String,
  name: String,
  createdAt: { type: Date, default: new Date() },
});
const User = mongoose.model("User", userSchema);
export default User;
