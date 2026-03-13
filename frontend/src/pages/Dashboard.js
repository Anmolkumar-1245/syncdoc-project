import React, { useEffect, useState } from "react";

function Dashboard() {

  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState("");

  const userId = "demo-user"; // replace with real user later

  useEffect(() => {
    fetch(`http://localhost:5000/api/documents/user/${userId}`)
      .then(res => res.json())
      .then(data => setDocuments(data));
  }, []);

  const createDocument = async () => {

    const res = await fetch("http://localhost:5000/api/documents/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, owner: userId })
    });

    const data = await res.json();

    setDocuments([...documents, data]);
    setTitle("");

  };

  const deleteDocument = async (id) => {

    await fetch(`http://localhost:5000/api/documents/${id}`, {
      method: "DELETE"
    });

    setDocuments(documents.filter(doc => doc._id !== id));

  };

  return (

    <div style={{ padding: "40px" }}>

      <h1>Dashboard</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Document title"
      />

      <button onClick={createDocument}>
        Create Document
      </button>

      <h3>Your Documents</h3>

      {documents.map(doc => (

        <div key={doc._id} style={{ marginBottom: "10px" }}>

          {doc.title}

          <button
            onClick={() => window.location.href = `/editor/${doc._id}`}
          >
            Open
          </button>

          <button
            onClick={() => deleteDocument(doc._id)}
          >
            Delete
          </button>

        </div>

      ))}

    </div>

  );

}

export default Dashboard;