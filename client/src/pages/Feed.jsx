import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Feed({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:5000/api/posts/feed/${user.id}`).then(res => setPosts(res.data));
    }
  }, [user]);

  return (
    <div>
      <h2>News Feed</h2>
      {posts.map(post => (
        <div key={post._id} style={{ border: "1px solid #ccc", margin: "8px", padding: "8px" }}>
          <img src={post.author.profilePic} alt="profile" width="40" />
          <b>{post.author.username}</b> <span>{new Date(post.createdAt).toLocaleString()}</span>
          <p>{post.content}</p>
          {post.image && <img src={post.image} alt="post" width="200" />}
          {post.video && <video src={post.video} width="200" controls />}
          {post.tags.length > 0 && <div>Tagged: {post.tags.map(t => t.username).join(", ")}</div>}
        </div>
      ))}
    </div>
  );
}