import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.Mixed,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, default: 1 },
      total: { type: Number },
    },
  ],
  userId: { type: String, required: true },
  count: { type: Number, required: true, default: 1 },
  total: { type: Number },
  createdAt: { type: Date, default: new Date() },
  updateddAt: { type: Date, default: new Date() },
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
