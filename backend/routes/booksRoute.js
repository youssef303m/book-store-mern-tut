import express from "express";
// Import book model
import { Book } from "../models/bookModel.js";
import { httpStatus } from "../utils/httpStatus.js";

const router = express.Router();

// Get all books from database
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({}, { __v: false });
    return res.status(200).json({
      status: httpStatus.SUCCESS,
      count: books.length,
      data: { books },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: httpStatus.ERROR, message: err.message });
  }
});

// Get one book
router.get("/:bookId", async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId, { __v: false });
    return res.status(200).json({ status: httpStatus.SUCCESS, data: { book } });
  } catch (err) {
    return res
      .status(500)
      .json({ status: httpStatus.ERROR, message: err.message });
  }
});

// Update a book
router.patch("/:bookId", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    const { bookId } = req.params;

    // If all required fields are not sent
    if (!title && !author && !publishYear) {
      return res.status(400).send({
        status: httpStatus.FAIL,
        message: "No field was sent to update",
      });
    }

    const book = await Book.findByIdAndUpdate(bookId, req.body, {
      returnDocument: "after",
    });

    // If book was not found
    if (!book) {
      return res
        .status(404)
        .json({ status: httpStatus.FAIL, message: "Book not found" });
    }

    return res.status(200).json({ status: httpStatus.SUCCESS, data: { book } });
  } catch (err) {
    return res
      .status(500)
      .json({ status: httpStatus.ERROR, message: err.message });
  }
});

// Delete a book
router.delete("/:bookId", async (req, res) => {
  try {
    const { bookId } = req.params;
    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res
        .status(404)
        .json({ status: httpStatus.FAIL, message: "Book not found" });
    }

    return res.status(200).json({ status: httpStatus.SUCCESS, data: null });
  } catch (err) {
    return res
      .status(500)
      .json({ status: httpStatus.ERROR, message: err.message });
  }
});

// Route to save a new book
router.post("/", async (req, res) => {
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

    return res.status(201).json({ status: httpStatus.SUCCESS, data: { book } });
  } catch (err) {
    return res
      .status(500)
      .json({ status: httpStatus.ERROR, message: err.message });
  }
});

export default router;
