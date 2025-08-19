const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

router.put("/:id", async (req, res) => {
  const { bio, profilePic } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { bio, profilePic }, { new: true });
  res.json(user);
});

module.exports = router;