import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cardRoutes from "./routes/cards.js";
import tourRoutes from "./routes/tours.js";
import userRoutes from "./routes/users.js";

dotenv.config();
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: false,
  })
);

app.use("/api/cards", cardRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/user", userRoutes);

const CONNECT_URL = process.env.CONNECT_URL;
const PORT = process.env.PORT || 10000;

mongoose
  .connect(CONNECT_URL, { dbName: `setail`, useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

// mongoose.set("useFindAndModify", false);
