import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cardRoutes from "./api/v1/routes/cards.js";
import productRoutes from "./api/v1/routes/products.js";
import tourRoutes from "./api/v1/routes/tours.js";
import userRoutes from "./api/v1/routes/users.js";
import searchRoutes from "./api/v1/routes/search.js";
import commentsRoutes from "./api/v1/routes/comments.js";

dotenv.config();
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(helmet());
app.use(cookieParser(process.env.SECRET));
app.use(morgan("common"));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://setail.onrender.com",
      "https://apis.google.com",
    ],
    credentials: true,
  })
);

app.use("/api/v1/cards", cardRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/search", searchRoutes);
app.use("/api/v1/tours", tourRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/comments", commentsRoutes);

app.get("/", (req, res) => {
  res.send("ok!");
});

app.use((req, res, next) => {
  res.status(404).send("API Not found!");
});

app.use((req, res, next) => {
  res.status(err.status || 500).send("Internal Server Error");
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
    process.exit(0);
  });
});

// mongoose.set("useFindAndModify", false);
