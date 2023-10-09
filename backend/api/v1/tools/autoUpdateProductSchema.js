import mongoose from "mongoose";
import Products from "../models/product.js";

Products.updateMany(
  {},
  { $set: { "links.slug": "/shop/products/$title" } },
  { multi: true }
)
  .then(() => {
    console.log("Links updated successfully.");
  })
  .catch((error) => {
    console.error("Error updating links:", error);
  });
