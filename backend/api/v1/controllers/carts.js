import Products from "../models/product.js";
import Cart from "../models/cart.js";
import mongoose from "mongoose";
import Paginate from "./paginate.js";

export const getCarts = async (req, res) => {
  const { userId, page, itemsPerPage } = req.query;
  try {
    let carts = [],
      result = {};
    if (userId) {
      carts = await Cart.findOne({ userId });
      result = Paginate(carts.products, page, itemsPerPage || 25);
    } else {
      carts = await Cart.find();
      result = Paginate(carts, page, itemsPerPage || 25);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createCart = async (req, res) => {
  const cart = req.body;
  try {
    const product = await Products.findById(cart.product._id);
    if (!product) {
      return res.status(204).json({ message: "Product not found!" });
    } else if (!product.avaliable) {
      return res.status(204).json({ message: "Product not avaliable!" });
    } else {
      product.amount_sale += cart.count;
      await product.save();
    }
    //search user id has or no
    const cartResult = await Cart.findOne({ userId: cart.userId });

    if (!cartResult) {
      //create new cart for user
      const newCart = new Cart({
        count: cart.count,
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
        (item) => item.product._id === cart.product._id
      );
      if (productIndex > -1) {
        cartResult.products[productIndex].quantity += cart.count;
      } else {
        cartResult.products.push({
          product: cart.product,
          quantity: cart.count,
          total: cart.total,
        });
      }
      cartResult.count += cart.count;
      await cartResult.save();
      return res.status(201).json({ message: "Create cart successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCart = async (req, res) => {
  const { id } = req.params;
  const { quantity, userId } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No cart with id: ${id}`);
    const cart = await Cart.findOne({ userId });
    const product = await Products.findById(id);

    if (!cart) return res.status(404).send(`No cart with id: ${id}`);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    } else if (!product.avaliable) {
      return res.status(404).json({ message: "Product not avaliable!" });
    } else {
      const productIndex = cart.products.findIndex(
        (item) => item.product._id === id
      );
      if (productIndex > -1) {
        cart.count =
          cart.count + Number(quantity) - cart.products[productIndex].quantity; //update new count
        cart.products[productIndex].total =
          cart.products[productIndex].total +
          Number(quantity) * cart.products[productIndex].product.cost -
          cart.products[productIndex].total; //update new count
        cart.products[productIndex].quantity = quantity;
      } else {
        return res
          .status(404)
          .json({ message: "Product not found in your cart!" });
      }
      await cart.save();
      return res.status(201).json({ message: "Update cart successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCart = async (req, res) => {
  const { productId, userId } = req.query;
  try {
    if (!mongoose.Types.ObjectId.isValid(productId))
      return res.status(404).send(`No cart with id: ${productId}`);

    const cartUser = await Cart.findOne({ userId });
    if (!cartUser) return res.status(404).send(`No find user`);

    cartUser.products = cartUser.products.filter((item) => {
      return item.product._id !== productId;
    });
    await cartUser.save();
    res.status(200).json({ message: "Remove successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
