const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/search", async (req, res) => {
  const { q } = req.query;
  const users = await User.find({ username: { $regex: q, $options: "i" } }).select("username _id profilePic bio");
  res.json(users);
});

router.post("/request", async (req, res) => {
  const { fromId, toId } = req.body;
  if (fromId === toId) return res.status(400).json({ error: "Cannot friend yourself" });
  const toUser = await User.findById(toId);
  if (!toUser.friendRequests.includes(fromId)) {
    toUser.friendRequests.push(fromId);
    await toUser.save();
  }
  res.json({ message: "Request sent" });
});

router.post("/accept", async (req, res) => {
  const { fromId, toId } = req.body;
  const toUser = await User.findById(toId);
  const fromUser = await User.findById(fromId);
  if (!toUser.friendRequests.includes(fromId)) return res.status(400).json({ error: "No such friend request" });
  toUser.friends.push(fromId);
  fromUser.friends.push(toId);
  toUser.friendRequests = toUser.friendRequests.filter((id) => id.toString() !== fromId);
  await toUser.save();
  await fromUser.save();
  res.json({ message: "Friend request accepted" });
});

router.get("/:id/list", async (req, res) => {
  const user = await User.findById(req.params.id).populate("friends", "username profilePic bio");
  res.json(user.friends);
});

router.get("/:id/requests", async (req, res) => {
  const user = await User.findById(req.params.id).populate("friendRequests", "username profilePic bio");
  res.json(user.friendRequests);
});

module.exports = router;