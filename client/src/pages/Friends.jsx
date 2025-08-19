import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Friends({ user }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:5000/api/friends/${user.id}/list`).then(res => setFriends(res.data));
      axios.get(`http://localhost:5000/api/friends/${user.id}/requests`).then(res => setRequests(res.data));
    }
  }, [user]);

  const handleSearch = async () => {
    if (search.trim() === "") return;
    const res = await axios.get(`http://localhost:5000/api/friends/search?q=${search}`);
    setResults(res.data);
  };

  const sendRequest = async (toId) => {
    await axios.post("http://localhost:5000/api/friends/request", { fromId: user.id, toId });
    alert("Request sent!");
  };

  const acceptRequest = async (fromId) => {
    await axios.post("http://localhost:5000/api/friends/accept", { fromId, toId: user.id });
    setRequests(requests.filter(r => r._id !== fromId));
    alert("Friend request accepted!");
  };

  return (
    <div>
      <h2>Your Friends</h2>
      <ul>
        {friends.map(f => <li key={f._id}>{f.username}</li>)}
      </ul>
      <h3>Friend Requests</h3>
      <ul>
        {requests.map(r => (
          <li key={r._id}>
            {r.username} <button onClick={() => acceptRequest(r._id)}>Accept</button>
          </li>
        ))}
      </ul>
      <h3>Search Users</h3>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search username" />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map(r => (
          <li key={r._id}>
            {r.username} <button onClick={() => sendRequest(r._id)}>Send Friend Request</button>
          </li>
        ))}
      </ul>
    </div>
  );
}