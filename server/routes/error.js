import express from "express";
export const router = express.Router();

router.get("/", (req, res) => {
  res.status(404).json({
    error: "Endpoint not Found 🎃",
    message:
      "The requested endpoint does not exist. Please check the URL and try again.",
  });
});

export default router;
