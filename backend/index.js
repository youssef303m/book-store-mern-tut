import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import booksRouter from "./routes/booksRoute.js";

const app = express();
const mongoURL = process.env.MONGO_URL;
const PORT = process.env.PORT;
// Middleware for parsing request body
app.use(express.json());

// Books router
app.use("/books", booksRouter);

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("MongoDB Server Running.");
    app.listen(PORT, () => {
      console.log(`App listening on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
