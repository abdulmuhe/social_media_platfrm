const express = require("express");
const Message = require("../models/Message");
const router = express.Router();

// Send message
router.post("/", async (req, res) => {
  const { from, to, content } = req.body;
  const msg = new Message({ from, to, content });
  await msg.save();
  res.json(msg);
});

// Get messages between two users
router.get("/:user1/:user2", async (req, res) => {
  const { user1, user2 } = req.params;
  const msgs = await Message.find({
    $or: [
      { from: user1, to: user2 },
      { from: user2, to: user1 }
    ]
  }).sort({ createdAt: 1 });
  res.json(msgs);
});

module.exports = router;