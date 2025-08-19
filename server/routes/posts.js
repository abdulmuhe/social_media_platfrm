const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
const router = express.Router();

// Create post
router.post("/", async (req, res) => {
  const { author, content, image, video, tags } = req.body;
  const post = new Post({ author, content, image, video, tags });
  await post.save();
  res.json(post);
});

// News feed - posts from friends
router.get("/feed/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId);
  const friendIds = user.friends.concat([user._id]);
  const posts = await Post.find({ author: { $in: friendIds } })
    .populate("author", "username profilePic")
    .populate("tags", "username profilePic")
    .sort({ createdAt: -1 })
    .limit(30);
  res.json(posts);
});

// Get single post
router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("author", "username profilePic")
    .populate("tags", "username profilePic");
  res.json(post);
});

module.exports = router;