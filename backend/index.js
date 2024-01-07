import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { httpStatus } from "./utils/httpStatus.js";
// Import book model
import { Book } from "./models/bookModel.js";

const app = express();
const mongoURL = process.env.MONGO_URL;
const PORT = process.env.PORT;
// Middleware for parsing request body
app.use(express.json());

app.get("/", (req, res) => {});

// Route to save a new book
app.post("/books", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;

    // If all required fields are not sent
    if (!title || !author || !publishYear) {
      return res.status(400).send({
        status: httpStatus.FAIL,
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const newBook = {
      title,
      author,
      publishYear,
    };

    const book = await Book.create(newBook);

    return res.status(201).json({ status: httpStatus.SUCCESS, book });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: httpStatus.ERROR, message: err.message });
  }
});

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
