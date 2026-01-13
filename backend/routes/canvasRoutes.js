import express from "express";

import {
  createCanvas,
  updateCanvas,
  loadCanvas,
  shareCanvas,
  unshareCanvas,
  deleteCanvas,
  getUserCanvases,
} from "../controllers/canvasController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const canvasRouter = express.Router();


canvasRouter.get("/", authMiddleware, getUserCanvases);
canvasRouter.patch("/", authMiddleware, updateCanvas);
canvasRouter.post("/", authMiddleware, createCanvas);
canvasRouter.delete("/", authMiddleware, deleteCanvas);



canvasRouter.post("/share", authMiddleware, shareCanvas);
canvasRouter.patch("/unshare", authMiddleware, unshareCanvas);

canvasRouter.get("/:canvasId", authMiddleware, loadCanvas);



export default canvasRouter;
