const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const shareRoutes = require("./routes/shareRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/share", shareRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});


io.on("connection", (socket) => {

  console.log("User connected");

  socket.on("join-doc", (docId) => {
    socket.join(docId);
  });

  socket.on("send-changes", ({ docId, delta }) => {
    socket.to(docId).emit("receive-changes", delta);
  });



socket.on("send-message", ({ docId, message }) => {
    socket.to(docId).emit("receive-message", message);
  });

});
app.get("/", (req, res) => {
  res.send("SyncDoc backend running");
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});