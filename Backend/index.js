import express, { request, response, urlencoded } from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoutes.js";
import cors from "cors";

const app = express();

// middleWare for parsing request body
app.use(express.json());

// Middle for handling CORS Policy
// Option 1: Allow all origins with Default of Cors(*)
app.use(cors());
// Option 2: Allow custom Origins
// app.use(cors({
//   origin:'http//localhost:5173',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type']
// }));

// Home Route
app.get("/", (request, response) => {
  // console.log(request);
  return response.status(234).send("Hello World");
});

// Routes
app.use("/books", booksRoute);

mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log("database connected");
    app.listen(PORT, () => {
      console.log(`App is listing to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
