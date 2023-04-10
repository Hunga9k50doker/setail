import CardMessage from "../models/cardMessage.js";
import mongoose from "mongoose";
export const getCards = async (req, res) => {
  try {
    const cardMessages = await CardMessage.find();

    return res.status(200).json(cardMessages);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getCardById = async (req, res) => {
  const { id } = req.params;
  try {
    const cardDetail = await CardMessage.findById(id);
    return res.status(200).json(cardDetail);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createCard = async (req, res) => {
  const card = req.body;
  const newCard = new CardMessage({ ...card, creator: req.userId, createdAt: new Date().toISOString() });
  try {
    await newCard.save();
    return res.status(201).json(newCard);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateCard = async (req, res) => {
  const { id } = req.params;
  const { title, subTitle, age, location, img, img__grid, calendar, custom, cost, avaliable } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No card with id: ${id}`);
    const updatedPost = { title, subTitle, age, location, img, img__grid, calendar, avaliable, custom, cost, _id: id };
    const result = await CardMessage.findByIdAndUpdate(id, updatedPost, { new: true });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCard = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No card with id: ${id}`);
    await CardMessage.findByIdAndRemove(id);
    res.status(200).json({ message: "Remove successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateReviewCard = async (req, res) => {
  const { id } = req.params;
  let countRating = 1;
  const { userId, review__details, username, email, avatar, description } = req.body;
  try {
    const cardDetail = await CardMessage.findById(id);
    if (!cardDetail) return res.status(404).json({ message: `No card with id: ${id}` });
    cardDetail.count_rating === 0 ? countRating : (countRating = cardDetail.count_rating);
    const new__review__details = review__details.map((ele) => {
      const itemRating = cardDetail.review__details.find((item) => item.title === ele.title);
      if (itemRating) {
        return {
          title: itemRating.title,
          percent: +((itemRating.percent * countRating + ele.percent) / (cardDetail.count_rating + 1)).toFixed(1),
        };
      }
    });
    cardDetail.review__descriptions.push({ userId, username, avatar, description, email, rating: review__details });
    const newRating = review__details.reduce((accumulator, currentValue) => ({
      percent: accumulator.percent + currentValue.percent,
    }));
    const result = await CardMessage.findByIdAndUpdate(
      id,
      {
        review__details: new__review__details,
        review__descriptions: cardDetail.review__descriptions,
        rating: +(
          ((cardDetail.rating === 0 ? 1 : cardDetail.rating) * countRating + +newRating.percent / 60) /
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
