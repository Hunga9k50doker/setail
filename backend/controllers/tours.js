import CardMessage from "../models/cardMessage.js";
import ToursBooked from "../models/tour.js";
import mongoose from "mongoose";

export const getTours = async (req, res) => {
  const { userId } = req.body;
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
  const newTour = new ToursBooked({ ...tour, createdAt: new Date().toISOString() });
  try {
    await newTour.save();
    return res.status(201).json(newTour);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// export const updateCard = async (req, res) => {
//   const { id } = req.params;
//   const { title, subTitle, age, location, img, img__grid, calendar, custom, cost } = req.body;
//   try {
//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No card with id: ${id}`);
//     const updatedPost = { title, subTitle, age, location, img, img__grid, calendar, custom, cost, _id: id };
//     const result = await CardMessage.findByIdAndUpdate(id, updatedPost, { new: true });
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const deleteCard = async (req, res) => {
//   const { id } = req.params;
//   try {
//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No card with id: ${id}`);
//     await CardMessage.findByIdAndRemove(id);
//     res.status(200).json({ message: "Remove successfully." });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const updateReviewCard = async (req, res) => {
//   const { id } = req.params;
//   let countRating = 0;
//   const { userId, review__details, username, email, avatar, description } = req.body;
//   try {
//     const cardDetail = await CardMessage.findById(id);
//     if (!cardDetail) return res.status(404).json({ message: `No card with id: ${id}` });
//     countRating = cardDetail.count_rating;
//     const new__review__details = review__details.map((ele) => {
//       const itemRating = cardDetail.review__details.find((item) => item.title === ele.title);
//       if (itemRating) {
//         return {
//           title: itemRating.title,
//           percent: +((itemRating.percent * (countRating ?? 1) + ele.percent) / ((countRating ?? 0) + 1)).toFixed(1),
//         };
//       }
//     });
//     cardDetail.review__descriptions.push({ userId, username, avatar, description, email, rating: review__details });
//     const newRating = new__review__details.reduce((accumulator, currentValue) => ({
//       percent: accumulator.percent + currentValue.percent,
//     }));
//     const result = await CardMessage.findByIdAndUpdate(
//       id,
//       {
//         review__details: new__review__details,
//         review__descriptions: cardDetail.review__descriptions,
//         rating: +(((cardDetail.rating ?? 1) * countRating + +newRating.percent / 60) / countRating).toFixed(1),
//         count_rating: countRating + 1,
//       },
//       { new: true }
//     );
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
