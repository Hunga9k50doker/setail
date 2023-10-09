import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
  img: { type: String, required: true },
  calendar: { type: Date, required: true },
  creator: String,
  custom: { type: Number, default: 0 },
  age: { type: Number, required: true },
  location: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  subTitle: { type: String },
  description: { type: String },
  cost: { type: Number, default: 0, require: true },
  img__grid: { type: Array },
  rating: { type: Number, default: 0 },
  count_rating: { type: Number, default: 0 },
  type: {
    type: String,
    default: "",
  },
  avaliable: { type: Boolean, default: true },
  tag: { type: Array, default: "" },
  amount_booking: { type: Number, default: 0 },
  review__details: {
    type: Array,
    default: [
      { title: "Rating", percent: 0 },
      { title: "Comfort", percent: 0 },
      { title: "Food", percent: 0 },
      { title: "Hospitality", percent: 0 },
      { title: "Hygiene", percent: 0 },
      { title: "Reception", percent: 0 },
    ],
  },
  review__descriptions: {
    type: [
      {
        createdAt: { type: Date, default: new Date() },
        userId: { type: String, required: true },
        username: { type: String, required: true },
        email: { type: String },
        avatar: { type: String, default: "" },
        description: { type: String, required: true },
        rating: {
          type: Array,
          default: [
            { title: "Rating", percent: 60 },
            { title: "Comfort", percent: 60 },
            { title: "Food", percent: 60 },
            { title: "Hospitality", percent: 60 },
            { title: "Hygiene", percent: 60 },
            { title: "Reception", percent: 60 },
          ],
        },
      },
    ],
  },
  links: {
    type: Map,
    of: String,
    default: {},
  },
  createdAt: { type: Date, default: new Date() },
  updateddAt: { type: Date, default: new Date() },
});

const CardMessage = mongoose.model("Cards", cardSchema);

export default CardMessage;
