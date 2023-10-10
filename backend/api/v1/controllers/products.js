import Products from "../models/product.js";
import mongoose from "mongoose";
import { uploadFile } from "./firebase.js";
import Paginate from "./paginate.js";

export const getProducts = async (req, res) => {
  const { sort, page, tag, itemsPerPage, category, name, price, min, max } =
    req.query;
  let product = await Products.find();
  try {
    if (sort === "date") {
      product = product.sort((a, b) => b.createdAt - a.createdAt);
    } else if (sort === "popular") {
      product = product.sort((a, b) => b.amount_sale - a.amount_sale);
    } else if (sort === "rating") {
      product = product.sort((a, b) => b.rating - a.rating);
    } else if (sort === "highprice") {
      product = product.sort((a, b) => {
        const salePriceA = a.cost - (a.cost * (a.sale || 1)) / 100;
        const salePriceB = b.cost - (b.cost * (b.sale || 1)) / 100;
        return salePriceB - salePriceA;
      });
    } else if (sort === "lowprice") {
      product = product.sort((a, b) => {
        const salePriceA = a.cost - (a.cost * (a.sale || 1)) / 100;
        const salePriceB = b.cost - (b.cost * (b.sale || 1)) / 100;
        return salePriceA - salePriceB;
      });
    }

    if (tag) {
      product = product.filter((ele) => ele.tag.includes(tag));
    }

    if (price) {
      product = product.filter((ele) => ele.cost === price);
    } else if (min && max) {
      product = product.filter((ele) => ele.cost <= max && ele.cost >= min);
    }

    if (name) {
      const regex = new RegExp(name, "i");
      product = product.filter((ele) => regex.test(ele.title));
    }

    if (category) product = product.filter((ele) => ele.category === category);

    const result = Paginate(product, page, itemsPerPage);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const searchProduct = async (req, res) => {
  const { destination, time, type } = req.query;
  const query = {};
  if (destination) {
    const destinationRegex = new RegExp(destination, "i");
    query.title = { $regex: destinationRegex };
  }

  if (time) {
    const month = parseInt(time);
    const startDate = new Date(
      Date.UTC(new Date().getFullYear(), month - 1, 1)
    );
    const endDate = new Date(
      Date.UTC(new Date().getFullYear(), month, 0, 23, 59, 59, 999)
    );

    query.calendar = {
      $gte: startDate,
      $lte: endDate,
    };
  }
  if (type) {
    query.type = type;
  }

  try {
    const product = await Products.find(query);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const ProductDetail = await Products.findById(id);
    if (!ProductDetail)
      return res.status(404).json({ message: "Product not found" });
    return res.status(200).json(ProductDetail);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  const Product = req.body;
  const newProduct = new Products({
    ...Product,
    img: Product.img.name,
    img__grid: [],
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  if (newProduct) {
    await uploadFile({ ...Product.img, folder: "products" })
      .then((response) => {
        newProduct.img = response.url;
      })
      .catch((err) => {
        return res.status(500).json({ message: "Upload image failed!" });
      });
    await Promise.all(
      Product.img__grid.map(async (ele) => {
        return await uploadFile({ ...ele, folder: "products" })
          .then((response) => {
            if (response.url) newProduct.img__grid.push(response.url);
          })
          .catch((err) => {
            return res.status(500).json({ message: "Upload image failed!" });
          });
      })
    );

    await newProduct
      .save()
      .then(() => {
        return res.status(201).json(newProduct);
      })
      .catch((err) => {
        if (err.code === 11000) {
          return res.status(500).json({ message: "Name tour already exists" });
        }
        return res.status(500).json({ message: err.message });
      });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    subTitle,
    sku,
    sale,
    img,
    img__grid,
    category,
    dismensions,
    cost,
    avaliable,
    tag,
  } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Product with id: ${id}`);
    const updatedPost = {
      title,
      subTitle,
      sku,
      sale,
      img,
      img__grid,
      category,
      dismensions,
      cost,
      avaliable,
      tag,
      _id: id,
    };

    if (img?.name) {
      await uploadFile({ ...img, folder: "products" })
        .then((response) => {
          if (response.url) updatedPost.img = response.url;
        })
        .catch((err) => {
          return res.status(500).json({ message: "Upload image failed!" });
        });
    }

    if (img__grid.length > 0) {
      await Promise.all(
        img__grid.map((ele) => {
          if (ele?.name)
            return uploadFile({ ...ele, folder: "products" })
              .then((response) => {
                if (response.url) updatedPost.img__grid.push(response.url);
              })
              .catch((err) => {
                return res
                  .status(500)
                  .json({ message: "Upload image failed!" });
              });
          else return updatedPost.img__grid.push(ele);
        })
      );
    }

    const result = await Products.findByIdAndUpdate(id, updatedPost, {
      new: true,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Product with id: ${id}`);
    await Products.findByIdAndRemove(id);
    res.status(200).json({ message: "Remove successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
