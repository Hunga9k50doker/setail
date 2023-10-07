import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  tourId: { type: String, required: true },
  blogId: { type: String, required: true },
  user: {
    name: { type: String, required: true },
    id: { type: String, required: true },
    avatar: { type: String },
  },
  description: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  updateddAt: { type: Date, default: new Date() },
});
const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
