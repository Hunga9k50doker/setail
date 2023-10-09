import mongoose from "mongoose";

const product = mongoose.Schema({
  img: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  subTitle: { type: String },
  description: { type: String },
  cost: { type: Number, default: 0, require: true },
  img__grid: { type: Array },
  rating: { type: Number, default: 0 },
  count_rating: { type: Number, default: 0 },
  category: {
    type: String,
    default: "",
  },
  sku: {
    type: String,
    default: "",
    unique: true,
  },
  weight: { type: Number, default: 0 },
  sale: { type: Number, default: "" },
  dismensions: { type: String, default: "" },
  avaliable: { type: Boolean, default: true },
  tag: { type: Array, default: [] },
  amount_sale: { type: Number, default: 0 },
  links: {
    type: Map,
    of: String,
    default: {},
  },
  createdAt: { type: Date, default: new Date() },
  updateddAt: { type: Date, default: new Date() },
});

const Products = mongoose.model("Products", product);

export default Products;
