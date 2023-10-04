import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { HttpError } from "http-errors";
import helmet from "helmet";
import morgan from "morgan";
import cardRoutes from "./api/v1/routes/cards.js";
import tourRoutes from "./api/v1/routes/tours.js";
import userRoutes from "./api/v1/routes/users.js";

dotenv.config();
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(helmet());
app.use(morgan("common"));
app.use(cors({ origin: "*" }));

app.use("/api/cards", cardRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/user", userRoutes);
app.get("/", (req, res) => {
  res.send("ok!");
});
app.use((err, req, res, next) => {
  next(new HttpError(404, "Not found"));
});

app.use((err, req, res, next) => {
  next(new HttpError(err.status || 500, "Internal Server Error"));
});

const CONNECT_URL = process.env.CONNECT_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECT_URL, {
    dbName: `setail`,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 3000,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`Database did not connect`));

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Mongoose is disconnected");
    process.exit(0);
  });
});

// mongoose.set("useFindAndModify", false);
