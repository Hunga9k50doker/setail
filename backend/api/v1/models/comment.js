import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  tourId: {
    type: String,
    required: function () {
      return !(this.blogId || this.productId);
    },
  },
  blogId: {
    type: String,
    required: function () {
      return !(this.tourId || this.productId);
    },
  },
  productId: {
    type: String,
    required: function () {
      return !(this.tourId || this.blogId);
    },
  },
  rating: { type: Number, default: 0 },
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    _id: { type: String, required: true },
    avatar: { type: String },
  },
  description: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  updateddAt: { type: Date, default: new Date() },
});
const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
