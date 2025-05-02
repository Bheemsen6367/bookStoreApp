import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";


const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.mongoDBURI;

const startServer = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to DB");

    // Define routes AFTER DB connection
    app.use("/book", bookRoute);
    app.use("/user", userRoute);

    // Start the server once
    app.listen(PORT, () => {
      console.log("Server is running on port " + PORT);
    });

  } catch (error) {
    console.error("Error connecting to DB:", error);
  }
};

startServer();
