import Comment from "../models/comment.js";
import CardMessage from "../models/cardMessage.js";
import Blog from "../models/blog.js";
import Product from "../models/product.js";
import mongoose from "mongoose";
import Paginate from "./paginate.js";

export const getComments = async (req, res) => {
  const { tourId, blogId, productId, page } = req.query;
  try {
    let comments = [];
    if (tourId) comments = await Comment.find({ blogId });
    if (blogId) comments = await Comment.find({ tourId });
    if (productId) comments = await Comment.find({ productId });
    const result = Paginate(comments, page, 2, true);
    return res.status(200).json(result);
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

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No comment with id: ${id}`);
    await Comment.findByIdAndRemove(id);
    res.status(200).json({ message: "Remove successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

    if (comment.productId) {
      const product = await Product.findById(comment.productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
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

export const updateComment = async (req, res) => {
  const comment = req.body;
  try {
    if (comment.tourId) {
      const tour = await CardMessage.findByIdAndUpdate(
        comment.tourId,
        comment,
        { new: true }
      );
      if (!tour) {
        return res.status(404).json({ error: "Tour not found" });
      }
    }
    if (comment.blogId) {
      const blog = await Blog.findByIdAndUpdate(comment.blogId, comment, {
        new: true,
      });
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }
    }

    if (comment.productId) {
      const product = await Product.findByIdAndUpdate(
        comment.productId,
        comment,
        { new: true }
      );
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
    }
    return res.status(201).json({ message: "Update comment successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
