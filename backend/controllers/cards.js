import CardMessage from "../models/cardMessage.js";
import mongoose from "mongoose";
export const getCards = async (req, res) => {
  try {
    const cardMessages = await CardMessage.find();

    return res.status(200).json(cardMessages);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getCardById = async (req, res) => {
  const { id } = req.params;
  try {
    const cardDetail = await CardMessage.findById(id);
    return res.status(200).json(cardDetail);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const createCard = async (req, res) => {
  const card = req.body;
  const newCard = new CardMessage({ ...card, creator: req.userId, createdAt: new Date().toISOString() });
  try {
    await newCard.save();
    return res.status(201).json(newCard);
  } catch (error) {
    return res.status(409).json({ error: error.message });
  }
};

export const updateCard = async (req, res) => {
  const { id } = req.params;
  const { title, subTitle, age, location, img, img__grid, calendar, custom, cost } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const updatedPost = { title, subTitle, age, location, img, img__grid, calendar, custom, cost, _id: id };
    await CardMessage.findByIdAndUpdate(id, updatedPost, { new: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCard = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    await CardMessage.findByIdAndRemove(id);
    res.status(200).json({ message: "Remove successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
