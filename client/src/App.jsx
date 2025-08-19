import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";
import Friends from "./pages/Friends";
import Messaging from "./pages/Messaging";
import CreatePost from "./pages/CreatePost";
import "./App.css";

function AppContent() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="app-container">
      <h1>Social Media Platform</h1>
      {!user && (
        <nav>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </nav>
      )}
      {user && (
        <>
          <p>Welcome, {user.username}</p>
          <nav>
            <a href="/feed">Feed</a>
            <a href={`/profile/${user.id}`}>Profile</a>
            <a href="/friends">Friends</a>
            <a href="/messaging">Messaging</a>
            <a href="/createpost">Create Post</a>
            <button
              style={{
                background: "#e74c3c",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "8px 18px",
                marginLeft: "12px",
                fontWeight: "500",
                cursor: "pointer"
              }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </nav>
        </>
      )}
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route
          path="/profile/:id"
          element={user ? <Profile user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/feed"
          element={user ? <Feed user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/friends"
          element={user ? <Friends user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/messaging"
          element={user ? <Messaging user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/createpost"
          element={user ? <CreatePost user={user} /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to={user ? "/feed" : "/login"} />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}