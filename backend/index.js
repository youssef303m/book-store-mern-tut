import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
const mongoURL = process.env.MONGO_URL;
const PORT = process.env.PORT;

app.get("/", (req, res) => {});

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
