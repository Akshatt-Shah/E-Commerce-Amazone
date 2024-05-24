import { config } from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import express from "express";
import { Route } from "./src/Routes";
import fs from "fs";
import path from "path";
import morgan = require("morgan");
config();
const app = express();
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.json());
app.use(cookieParser());
app.use("/", Route);

async function Start() {
  try {
    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
      console.log(`App Listening On Port ${PORT}`);
    });
    const MONGO_URL =
      process.env.Mongo_Url ||
      "mongodb+srv://akshat:akki5101@cluster0.dxszy3f.mongodb.net/E-Commerce-Amazone?retryWrites=true&w=majority&appName=Cluster0";
    await mongoose
      .connect(MONGO_URL)
      .then(() => {
        console.log("MongoDB Connected");
      })
      .catch((error: any) => {
        console.log(error.message);
      });
  } catch (error: any) {
    console.log(error.message);
  }
}

Start();
