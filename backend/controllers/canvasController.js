import { ReturnDocument } from "mongodb";
import Canvas from "../models/canvasModel.js";
import User from "../models/userModel.js";

export const createCanvas = async (req, res) => {
  try {
    const userId = req.userId;

    const newCanvas = new Canvas({
      owner: userId,
      shared: [],
      elements: [],
    });
    await newCanvas.save();

    return res
      .status(200)
      .json({ message: "Canvas Created", canvasId: newCanvas._id });
  } catch (error) {
    res.status(500).json({ message: "Error Occured while creatin canvas" });
  }
};

export const updateCanvas = async (req, res) => {
  try {
    const { canvasId, elements } = req.body;
    const userId = req.userId;

    const canvas = await Canvas.findById(canvasId);
    if (!canvas) {
      return res.status(404).json({ message: "Canvas not found" });
    }

    if (
      canvas.owner.equals(userId) ||
      canvas.shared.some((id) => id.equals(userId))
    ) {
      canvas.elements = elements;
      canvas.updatedAt = Date.now();
      await canvas.save();
      return res.status(200).json({ message: "Canvas Updated" });
    } else {
      return res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error Occured while updating Canvas" });
  }
};

export const loadCanvas = async (req, res) => {
  try {
    const userId = req.userId;
    const { canvasId } = req.params;
    const canvas = await Canvas.findById(canvasId);
    if (!canvas) {
      return res.status(404).json({ message: "Canvas not found" });
    }

    if (
      canvas.owner.equals(userId) ||
      canvas.shared.some((id) => id.equals(userId))
    ) {
      return res.status(200).json(canvas);
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error occured while loading canvas" });
  }
};

export const shareCanvas = async (req, res) => {
  try {
    const userId = req.userId;
    const { canvasId, emailToShare } = req.body;
    const canvas = await Canvas.findById(canvasId);
    if (!canvas) {
      return res.status(404).json({ message: "Canvas not found" });
    }

    if (!canvas.owner.equals(userId)) {
      return res
        .status(403)
        .json({ message: "only owner is allowed to share this canvas" });
    }

    const userToShare = await User.findOne({ email: emailToShare });
    if (!userToShare) {
      return res.status(404).json({ message: "user not found" });
    }

    const alreadyShared = canvas.shared.some((id) =>
      id.equals(userToShare._id)
    );

    if (alreadyShared) {
      return res
        .status(400)
        .json({ message: "canvas already shared with this user" });
    }

    canvas.shared.push(userToShare._id);
    await canvas.save();
    return res.status(200).json({ message: "canvas shared succesfully" });
  } catch (error) {
    res.status(500).json({ message: "Error occured while sharing canvas" });
  }
};

export const unshareCanvas = async (req, res) => {
  try {
    const userId = req.userId;
    const { canvasId, emailToUnshare } = req.body;

    const canvas = await Canvas.findById(canvasId);
    if (!canvas) {
      return res.status(404).json({ message: "canvas not found" });
    }

    if (!canvas.owner.equals(userId)) {
      return res
        .status(403)
        .json({ message: "only owner is allowed to unshare the canvas" });
    }

    const userToUnshare = await User.findOne({ email: emailToUnshare });
    if (!userToUnshare) {
      return res.status(404).json({ message: "user not found" });
    }
    const newshared = canvas.shared.filter(
      (id) => !id.equals(userToUnshare._id)
    );
    canvas.shared = newshared;
    await canvas.save();
    return res.status(200).json({ message: "canvas unshared succesfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error occured while unsharing the canvas" });
  }
};

export const deleteCanvas = async (req, res) => {
  try {
    const { canvasId } = req.body;
    const userId = req.userId;

    const canvas = await Canvas.findById(canvasId);
    if (!canvas) {
      return res.status(404).json({ message: "canvas not found" });
    }

    if (!canvas.owner.equals(userId)) {
      return res
        .status(403)
        .json({ message: "unauthorized , only owner can delete the canvas" });
    }

    await Canvas.findByIdAndDelete(canvasId);
    res.status(200).json({ message: "canvas deleted succesfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error occured while deleting the canvas" });
  }
};

export const getUserCanvases = async (req, res) => {
  try {
    const userId = req.userId;
    const canvases = await Canvas.find({
      $or: [{ owner: userId }, { shared: userId }],
    }).sort({ updatedAt: -1 });
    return res.status(200).json(canvases);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error occured while getting canvases" });
  }
};
