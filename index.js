const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;
const path = require("path");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect-request", () => {
    socket.disconnect();
    console.log("Chat desconectado");
  });
});

http.listen(port, host, () => {
  console.log(`Socket.IO server running at http://${host}:${port}/`);
});
