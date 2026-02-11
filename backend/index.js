import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./routes/userRoutes.js";
import canvasRouter from "./routes/canvasRoutes.js";
import connectToDb from "./config/db.js";




dotenv.config();


const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json({ limit: "10mb" }));
connectToDb();

app.use("/user", userRouter);
app.use("/canvas", canvasRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
   