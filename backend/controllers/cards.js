import CardMessage from "../models/cardMessage.js";

export const getCards = async (req, res) => {
  try {
    const cardMessages = await CardMessage.find();

    return res.status(200).json(cardMessages);
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
