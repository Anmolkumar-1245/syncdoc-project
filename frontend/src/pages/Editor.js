import React, { useEffect, useState } from "react";
import Quill from "quill";
import { io } from "socket.io-client";
import "quill/dist/quill.snow.css";

const socket = io("http://localhost:5000");

function Editor() {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    const quill = new Quill("#editor", {
      theme: "snow"
    });

    socket.emit("join-doc", "123");

    // Real-time editor changes
    quill.on("text-change", (delta, oldDelta, source) => {

      if (source !== "user") return;

      socket.emit("send-changes", {
        docId: "123",
        delta
      });

    });

    socket.on("receive-changes", (delta) => {

      quill.updateContents(delta);

    });

    // Receive chat messages
    socket.on("receive-message", (msg) => {

      setMessages((prev) => [...prev, msg]);

    });

  }, []);

  // Send chat message
  const sendMessage = () => {

    if (!message) return;

    socket.emit("send-message", {
      docId: "123",
      message
    });

    setMessages((prev) => [...prev, message]);
    setMessage("");

  };

  // Upload file
  const uploadFile = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    socket.emit("send-message", {
      docId: "123",
      message: data.url
    });

  };

  // AI summarize
  const summarizeDoc = async () => {

    const text = document.querySelector(".ql-editor").innerText;

    const res = await fetch("http://localhost:5000/api/ai/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    const data = await res.json();

    alert(data.result);

  };

  // AI grammar fix
  const fixGrammar = async () => {

    const text = document.querySelector(".ql-editor").innerText;

    const res = await fetch("http://localhost:5000/api/ai/grammar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    const data = await res.json();

    alert(data.result);

  };

  return (

    <div style={{ display: "flex", padding: "20px", height: "100vh" }}>

      {/* Editor Section */}
      <div style={{ width: "70%" }}>

        <h2>SyncDoc Editor</h2>

        {/* AI Buttons */}
        <div style={{ marginBottom: "10px" }}>
          <button onClick={summarizeDoc}>
            Summarize Document
          </button>

          <button onClick={fixGrammar} style={{ marginLeft: "10px" }}>
            Fix Grammar & Tone
          </button>
        </div>

        <div id="editor" style={{ height: "400px" }}></div>

      </div>

      {/* Chat Sidebar */}
      <div
        style={{
          width: "30%",
          marginLeft: "20px",
          border: "1px solid #ccc",
          padding: "10px",
          display: "flex",
          flexDirection: "column"
        }}
      >

        <h3>Live Chat</h3>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            marginBottom: "10px",
            border: "1px solid #eee",
            padding: "5px"
          }}
        >

          {messages.map((msg, i) => (

            <div key={i} style={{ marginBottom: "5px" }}>

              {msg.startsWith("http") && msg.includes("image") ? (
                <img src={msg} alt="uploaded" width="150" />
              ) : (
                <span>{msg}</span>
              )}

            </div>

          ))}

        </div>

        {/* Chat Input */}
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message"
          style={{ marginBottom: "5px" }}
        />

        <button onClick={sendMessage} style={{ marginBottom: "10px" }}>
          Send
        </button>

        {/* File Upload */}
        <input type="file" onChange={uploadFile} />

      </div>

    </div>

  );

}

export default Editor;