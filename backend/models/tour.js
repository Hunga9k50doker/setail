import mongoose from "mongoose";

const tourSchema = mongoose.Schema({
  cardId: { type: String, required: true },
  userId: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: "" },
  date: { type: Date, required: true },
  total: { type: String, required: true },
  numberTikets: { type: Number, default: 0, require: true },
  description: { type: String, default: "" },
  createdAt: { type: Date, default: new Date() },
  updateddAt: { type: Date, default: new Date() },
});

const ToursBooked = mongoose.model("ToursBooked", tourSchema);

export default ToursBooked;
