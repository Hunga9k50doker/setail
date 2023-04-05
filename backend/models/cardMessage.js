import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
  img: { type: String, required: true },
  calendar: { type: Date },
  creator: String,
  custom: { type: Number, default: 0 },
  age: { type: Number, required: true },
  location: { type: String, required: true },
  title: { type: String, required: true },
  subTitle: { type: String },
  cost: { type: Number, default: 0, require: true },
  img__grid: { type: Array, required: true },
  rating: { type: Number, default: 5 },
  review__details: {
    type: Array,
    default: [
      { title: "Rating", percent: 50 },
      { title: "Comfort", percent: 50 },
      { title: "Food", percent: 50 },
      { title: "Hospitality", percent: 50 },
      { title: "Hygiene", percent: 50 },
      { title: "Reception", percent: 50 },
    ],
  },
  createdAt: { type: Date, default: new Date() },
});

const CardMessage = mongoose.model("Cards", cardSchema);

export default CardMessage;
