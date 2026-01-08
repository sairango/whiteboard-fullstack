import { registerUser, loginUser,getUser } from "../controllers/userController.js";
import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.get("/login", loginUser);
userRouter.get("/dashboard", authMiddleware, getUser);

export default userRouter;
