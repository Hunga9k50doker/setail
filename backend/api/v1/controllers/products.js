import Products from "../models/product.js";
import mongoose from "mongoose";
import { uploadFile } from "./firebase.js";

export const getProducts = async (req, res) => {
  const { sort } = req.query;
  let product;
  try {
    if (sort === "lasted") {
      product = await Products.find().sort({ createdAt: -1 });
      return res.status(200).json(product);
    } else if (sort === "popular") {
      product = await Products.find().sort({ amount_sale: -1 });
      return res.status(200).json(product);
    } else if (sort === "rating") {
      product = await Products.find().sort({ rating: -1 });
      return res.status(200).json(product);
    } else if (sort === "highprice") {
      product = await Products.find().sort({ cost: -1 });
      return res.status(200).json(product);
    } else if (sort === "lowprice") {
      product = await Products.find().sort({ cost: 1 });
      return res.status(200).json(product);
    } else {
      product = await Products.find();
      return res.status(200).json(product);
    }
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
    await uploadFile(Product.img)
      .then((response) => {
        newProduct.img = response.url;
      })
      .catch((err) => {
        return res.status(500).json({ message: "Upload image failed!" });
      });
    await Promise.all(
      Product.img__grid.map(async (ele) => {
        return await uploadFile(ele)
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
    age,
    location,
    img,
    img__grid,
    calendar,
    custom,
    cost,
    avaliable,
    type,
  } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Product with id: ${id}`);
    const updatedPost = {
      title,
      subTitle,
      age,
      location,
      img,
      img__grid: [],
      calendar,
      avaliable,
      custom,
      cost,
      _id: id,
      type,
    };

    if (img?.name) {
      await uploadFile(img)
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
            return uploadFile(ele)
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

export const updateReviewProduct = async (req, res) => {
  const { id } = req.params;
  let countRating = 1;
  const { userId, review__details, username, email, avatar, description } =
    req.body;
  try {
    const ProductDetail = await Products.findById(id);
    if (!ProductDetail)
      return res.status(404).json({ message: `No Product with id: ${id}` });
    ProductDetail.count_rating === 0
      ? countRating
      : (countRating = ProductDetail.count_rating);
    const new__review__details = review__details.map((ele) => {
      const itemRating = ProductDetail.review__details.find(
        (item) => item.title === ele.title
      );
      if (itemRating) {
        return {
          title: itemRating.title,
          percent: +(
            (itemRating.percent * countRating + ele.percent) /
            (ProductDetail.count_rating + 1)
          ).toFixed(1),
        };
      }
    });
    ProductDetail.review__descriptions.push({
      userId,
      username,
      avatar,
      description,
      email,
      rating: review__details,
    });
    const newRating = review__details.reduce((accumulator, currentValue) => ({
      percent: accumulator.percent + currentValue.percent,
    }));
    const result = await Products.findByIdAndUpdate(
      id,
      {
        review__details: new__review__details,
        review__descriptions: ProductDetail.review__descriptions,
        rating: +(
          ((ProductDetail.rating === 0 ? 1 : ProductDetail.rating) *
            countRating +
            +newRating.percent / 60) /
          (ProductDetail.count_rating + 1)
        ).toFixed(1),
        count_rating: ProductDetail.count_rating + 1,
      },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
