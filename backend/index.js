import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./routes/userRoutes.js";
import canvasRouter from "./routes/canvasRoutes.js";
import connectToDb from "./config/db.js";




dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
connectToDb();

app.use("/user", userRouter);
app.use("/canvas", canvasRouter);

app.listen(8000, () => console.log("Example app is listeing at port 8000"));
   