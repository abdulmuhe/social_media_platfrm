import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Profile({ user, setUser }) {
  const { id } = useParams();
  const [profile, setProfile] = useState({});
  const [bio, setBio] = useState("");
  const [file, setFile] = useState();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/user/${id}`).then(res => {
      setProfile(res.data);
      setBio(res.data.bio || "");
    });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    let profilePic = profile.profilePic;
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        profilePic = reader.result;
        await axios.put(`http://localhost:5000/api/user/${id}`, { bio, profilePic });
        setProfile({ ...profile, bio, profilePic });
        if (user && user.id === id) setUser({ ...user, bio, profilePic });
        alert("Profile updated!");
      };
      reader.readAsDataURL(file);
    } else {
      await axios.put(`http://localhost:5000/api/user/${id}`, { bio, profilePic });
      setProfile({ ...profile, bio, profilePic });
      if (user && user.id === id) setUser({ ...user, bio, profilePic });
      alert("Profile updated!");
    }
  };

  return (
    <div>
      <h2>Profile: {profile.username}</h2>
      <img src={profile.profilePic} alt="profile" width="100" />
      <form onSubmit={handleUpdate}>
        <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Bio" />
        <input type="file" onChange={e => setFile(e.target.files[0])} accept="image/*" />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}