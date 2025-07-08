import express from "express";
import { getUserStats } from "../utils/userUtils.js";

const userRouter = express.Router();

userRouter.get("/users/stats", async (req, res) => {
  try {
    const stats = await getUserStats();
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default userRouter;
