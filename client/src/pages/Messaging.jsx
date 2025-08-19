import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Messaging({ user }) {
  const [friends, setFriends] = useState([]);
  const [selected, setSelected] = useState();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:5000/api/friends/${user.id}/list`).then(res => setFriends(res.data));
    }
  }, [user]);

  useEffect(() => {
    if (user && selected) {
      axios.get(`http://localhost:5000/api/messages/${user.id}/${selected._id}`).then(res => setMessages(res.data));
    }
  }, [user, selected]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    await axios.post("http://localhost:5000/api/messages", { from: user.id, to: selected._id, content: text });
    setMessages([...messages, { from: user.id, to: selected._id, content: text, createdAt: new Date() }]);
    setText("");
  };

  return (
    <div>
      <h2>Messaging</h2>
      <div style={{ display: "flex" }}>
        <div style={{ width: "150px" }}>
          <h4>Friends</h4>
          <ul>
            {friends.map(f => (
              <li key={f._id}>
                <button onClick={() => setSelected(f)}>{f.username}</button>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: 1, marginLeft: "20px" }}>
          {selected && (
            <>
              <h4>Chat with {selected.username}</h4>
              <div style={{ border: "1px solid #ccc", height: "200px", overflowY: "scroll", marginBottom: "10px" }}>
                {messages.map((m, i) => (
                  <div key={i} style={{ textAlign: m.from === user.id ? "right" : "left" }}>
                    <span>{m.content}</span> <small>{new Date(m.createdAt).toLocaleTimeString()}</small>
                  </div>
                ))}
              </div>
              <form onSubmit={sendMessage}>
                <input value={text} onChange={e => setText(e.target.value)} placeholder="Type message" />
                <button type="submit">Send</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}