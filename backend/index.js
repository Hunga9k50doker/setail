import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import cardRoutes from "./routes/cards.js";
import tourRoutes from "./routes/tours.js";
import userRoutes from "./routes/users.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api/cards", cardRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/user", userRoutes);

const CONNECT_URL = "mongodb+srv://nguyenhung:A9k50doker@cluster0.bun4q.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECT_URL, { dbName: `setail`, useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

// mongoose.set("useFindAndModify", false);
