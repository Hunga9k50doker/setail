import CardMessage from "../models/cardMessage.js";
import ToursBooked from "../models/tour.js";

export const getTours = async (req, res) => {
  const { userId } = req.query;
  try {
    const tours = await ToursBooked.find({ userId: userId });
    if (!tours) {
      return res.status(200).json([]);
    }
    return res.status(200).json(tours);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getTourById = async (req, res) => {
  const { id } = req.params;
  try {
    const tourDetail = await ToursBooked.findById(id);
    return res.status(200).json(tourDetail);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createTour = async (req, res) => {
  const tour = req.body;
  try {
    const cardTour = await CardMessage.findById(tour.cardId);
    if (!cardTour) {
      // Handle case when the cardTourId is not found
      return res.status(404).json({ error: "Tour not found" });
    }
    if (!cardTour.avaliable) {
      return res.status(204).json({ error: "Tour not avaliable!" });
    }
    cardTour.amount_booking += 1; // Increment amountBooking by 1
    await cardTour.save();
    const newTour = new ToursBooked({
      ...tour,
      createdAt: new Date().toISOString(),
    });
    await newTour.save();
    return res.status(201).json({ message: "Create tour successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
