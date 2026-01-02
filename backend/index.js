import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./routes/userRoutes.js";
import connectToDb from "./config/db.js";


const myMiddleWare = (req, res, next) => {
  console.log("This is my Middleware");
  next();
};

dotenv.config();
// console.log("ENV CHECK:", process.env.DATABASE_URI);

const app = express();
app.use(cors());
app.use(express.json());
connectToDb();
app.use(myMiddleWare);
// app.use("/", basicrouter);
app.use("/user", userRouter);

app.listen(8000, () => console.log("Example app is listeing at port 8000"));
   