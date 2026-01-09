import mongoose from "mongoose";
// import User from "./userModel"

const canvasSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, default: "Untitled Canvas" },
    shared: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    elements: [{ type: mongoose.Schema.Types.Mixed }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Canvas = mongoose.model("Canvas", canvasSchema);
export default Canvas;
