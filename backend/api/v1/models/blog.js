import mongoose from "mongoose";
const blogSchema = mongoose.Schema({
  tourId: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    username: String,
    socialLinks: {
      type: Array,
      default: [
        { facebook: "" },
        { twitter: "" },
        { instagram: "" },
        { printest: "" },
      ],
    },
  },
  type: { type: String, default: "" },
  numComments: { type: Number, default: 0 },
  description: { type: String, default: "" },
  createdAt: { type: Date, default: new Date() },
  updateddAt: { type: Date, default: new Date() },
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
