import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: String,
  img: String,
  name: String,
  avatar: String,
  role: { type: Number, default: 0 },
  createdAt: { type: Date, default: new Date() },
  updateddAt: { type: Date, default: new Date() },
  socialLinks: {
    type: Array,
    default: [
      { facebook: "" },
      { twitter: "" },
      { instagram: "" },
      { printest: "" },
    ],
  },
});
const User = mongoose.model("User", userSchema);
export default User;
