import express from "express";
import {
  getbasic,
  delbasic,
} from "../controllers/basiccontroller.js";

const basicrouter = express.Router();

basicrouter.get("/", getbasic);
basicrouter.delete("/", delbasic);


export default basicrouter;
