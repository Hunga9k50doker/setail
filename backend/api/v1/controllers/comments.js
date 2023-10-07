import Comment from "../models/comment.js";
import CardMessage from "../models/cardMessage.js";
import Blog from "../models/blog.js";

export const getComments = async (req, res) => {
  const { tourId, blogId } = req.body;
  try {
    let comments = [];
    if (tourId) comments = await Comment.find({ blogId });
    if (blogId) comments = await Comment.find({ tourId });
    if (!comments) {
      return res.status(200).json([]);
    }
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getCommentById = async (req, res) => {
  const { id } = req.params;
  try {
    const commentDetail = await Comment.findById(id);
    return res.status(200).json(commentDetail);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createComment = async (req, res) => {
  const comment = req.body;
  try {
    if (comment.tourId) {
      const tour = await CardMessage.findById(comment.tourId);
      if (!tour) {
        return res.status(404).json({ error: "Tour not found" });
      }
    }
    if (comment.blogId) {
      const blog = await Blog.findById(comment.blogId);
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }
    }

    const newComment = new Comment({
      ...comment,
      createdAt: new Date().toISOString(),
    });
    await newComment.save();
    return res.status(201).json({ message: "Create comment successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
