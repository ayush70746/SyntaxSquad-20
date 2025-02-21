import express from "express";

const router = express.Router();

// Staff Reassignment Route
router.post("/reassign", (req, res) => {
  const { emergencyType } = req.body;

  if (!emergencyType) {
    return res.status(400).json({ message: "❌ Emergency type is required!" });
  }

  // Simulate AI reassignment response
  res.status(200).json({
    message: `✅ Staff reassigned for: ${emergencyType}`,
  });
});

export default router;
