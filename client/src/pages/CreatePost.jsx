import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CreatePost({ user }) {
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState();
  const [videoFile, setVideoFile] = useState();
  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (search.trim() === "") return;
    const res = await axios.get(`http://localhost:5000/api/friends/search?q=${search}`);
    setResults(res.data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    let image = "", video = "";
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = async () => {
        image = reader.result;
        if (videoFile) {
          const videoReader = new FileReader();
          videoReader.onload = async () => {
            video = videoReader.result;
            await submitPost(image, video);
          };
          videoReader.readAsDataURL(videoFile);
        } else {
          await submitPost(image, video);
        }
      };
      reader.readAsDataURL(imageFile);
    } else if (videoFile) {
      const videoReader = new FileReader();
      videoReader.onload = async () => {
        video = videoReader.result;
        await submitPost(image, video);
      };
      videoReader.readAsDataURL(videoFile);
    } else {
      await submitPost(image, video);
    }
  };

  const submitPost = async (image, video) => {
    await axios.post("http://localhost:5000/api/posts", {
      author: user.id,
      content,
      image,
      video,
      tags: tags.map(t => t._id)
    });
    alert("Post created!");
    setContent(""); setImageFile(null); setVideoFile(null); setTags([]);
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handleCreate}>
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="What's on your mind?" />
        <br />
        <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} />
        <input type="file" accept="video/*" onChange={e => setVideoFile(e.target.files[0])} />
        <br />
        <h4>Tag Users</h4>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search user to tag" />
        <button type="button" onClick={handleSearch}>Search</button>
        <ul>
          {results.map(r => (
            <li key={r._id}>
              {r.username} <button type="button" onClick={() => setTags([...tags, r])}>Tag</button>
            </li>
          ))}
        </ul>
        <div>
          Tagged: {tags.map(t => t.username).join(", ")}
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  );
}