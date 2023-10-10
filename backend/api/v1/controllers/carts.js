import Products from "../models/product.js";
import Cart from "../models/cart.js";
import mongoose from "mongoose";
import Paginate from "./paginate.js";

export const getCarts = async (req, res) => {
  // api for admin get all carts
  const { page, itemsPerPage } = req.query;
  try {
    const carts = await Cart.find();
    const result = Paginate(carts, page, itemsPerPage || 25);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCartByUserId = async (req, res) => {
  const { userId, page, itemsPerPage } = req.query;
  try {
    const carts = await Cart.find({ userId });
    const result = Paginate(carts, page, itemsPerPage);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCartById = async (req, res) => {
  const { id } = req.params;
  try {
    const cartDetail = await Cart.findById(id);
    return res.status(200).json(cartDetail);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createCart = async (req, res) => {
  const cart = req.body;
  try {
    const product = await Products.findById(cart.product._id);
    if (!product) {
      return res.status(204).json({ error: "Product not found!" });
    } else if (!product.avaliable) {
      return res.status(204).json({ error: "Product not avaliable!" });
    } else {
      product.amount_sale += cart.count;
      await product.save();
    }
    //search user id has or no
    const cartResult = await Cart.findOne({ userId: cart.userId });

    if (!cartResult) {
      //create new cart for user
      const newCart = new Cart({
        count: cart.quantity,
        userId: cart.userId,
        products: [
          {
            product: cart.product,
            quantity: cart.count,
            total: cart.total,
          },
        ],
        createdAt: new Date().toISOString(),
      });
      await newCart.save();
      return res.status(201).json({ message: "Create cart successfully" });
    } else {
      //update cart for user
      const productIndex = cartResult.products.findIndex(
        (item) => item.product == cart.productId
      );
      if (productIndex > -1) {
        cartResult.products[productIndex].quantity += cart.quantity;
      } else {
        cartResult.products.push({ ...cart.product });
      }
      cartResult.count += cart.quantity;
      await cartResult.save();
      return res.status(201).json({ message: "Create cart successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCart = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No cart with id: ${id}`);
    const cart = await Cart.findById(id);
    const product = await Products.findById(cart.productId);
    if (!product) {
      return res.status(204).json({ error: "Product not found!" });
    } else if (!product.avaliable) {
      return res.status(204).json({ error: "Product not avaliable!" });
    } else {
      product.amount_sale += quantity;
      await product.save();
    }
    const updatedCart = { ...cart, quantity: quantity };

    const result = await CartMessage.findByIdAndUpdate(id, updatedCart, {
      new: true,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCart = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No cart with id: ${id}`);
    await CartMessage.findByIdAndRemove(id);
    res.status(200).json({ message: "Remove successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
