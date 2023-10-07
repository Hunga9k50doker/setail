import CardMessage from "../models/cardMessage.js";
import mongoose from "mongoose";
import multer from "multer";
import { uploadFile, getAllFiles, getFile, storage } from "./firebase.js";
import { v4 as uuidv4 } from "uuid";

export const getCards = async (req, res) => {
  try {
    const cardMessages = await CardMessage.find();
    return res.status(200).json(cardMessages);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const searchCard = async (req, res) => {
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
    const cardMessages = await CardMessage.find(query);
    return res.status(200).json(cardMessages);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCardById = async (req, res) => {
  const { id } = req.params;
  try {
    const cardDetail = await CardMessage.findById(id);
    return res.status(200).json(cardDetail);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createCard = async (req, res) => {
  const card = req.body;
  const newCard = new CardMessage({
    ...card,
    img: card.img.name,
    img__grid: [],
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  if (newCard) {
    await uploadFile(card.img)
      .then((response) => {
        newCard.img = response.url;
      })
      .catch((err) => {
        return res.status(500).json({ message: "Upload image failed!" });
      });
    await Promise.all(
      card.img__grid.map(async (ele) => {
        return await uploadFile(ele)
          .then((response) => {
            if (response.url) newCard.img__grid.push(response.url);
          })
          .catch((err) => {
            return res.status(500).json({ message: "Upload image failed!" });
          });
      })
    );

    await newCard
      .save()
      .then(() => {
        return res.status(201).json(newCard);
      })
      .catch((err) => {
        if (err.code === 11000) {
          return res.status(500).json({ message: "Name tour already exists" });
        }
        return res.status(500).json({ message: err.message });
      });
  }
};

export const updateCard = async (req, res) => {
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
      return res.status(404).send(`No card with id: ${id}`);
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

    const result = await CardMessage.findByIdAndUpdate(id, updatedPost, {
      new: true,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCard = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No card with id: ${id}`);
    await CardMessage.findByIdAndRemove(id);
    res.status(200).json({ message: "Remove successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateReviewCard = async (req, res) => {
  const { id } = req.params;
  let countRating = 1;
  const { userId, review__details, username, email, avatar, description } =
    req.body;
  try {
    const cardDetail = await CardMessage.findById(id);
    if (!cardDetail)
      return res.status(404).json({ message: `No card with id: ${id}` });
    cardDetail.count_rating === 0
      ? countRating
      : (countRating = cardDetail.count_rating);
    const new__review__details = review__details.map((ele) => {
      const itemRating = cardDetail.review__details.find(
        (item) => item.title === ele.title
      );
      if (itemRating) {
        return {
          title: itemRating.title,
          percent: +(
            (itemRating.percent * countRating + ele.percent) /
            (cardDetail.count_rating + 1)
          ).toFixed(1),
        };
      }
    });
    cardDetail.review__descriptions.push({
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
    const result = await CardMessage.findByIdAndUpdate(
      id,
      {
        review__details: new__review__details,
        review__descriptions: cardDetail.review__descriptions,
        rating: +(
          ((cardDetail.rating === 0 ? 1 : cardDetail.rating) * countRating +
            +newRating.percent / 60) /
          (cardDetail.count_rating + 1)
        ).toFixed(1),
        count_rating: cardDetail.count_rating + 1,
      },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
