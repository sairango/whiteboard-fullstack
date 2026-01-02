import { registerUser, getUsers } from "../controllers/userController.js";
import express from "express";

const userRouter = express.Router();

userRouter.post("/", registerUser);
userRouter.get("/", getUsers);

export default userRouter;
