import express from "express";
import { PORT, mongoDBURL } from "./config.js";
const app = express();
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/bookRoute.js";
import cors from "cors";

// Middleware for parsing request body
app.use(express.json());

app.use("/books", booksRoute);
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN Stack");
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
