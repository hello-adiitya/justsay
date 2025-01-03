import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const messages = [];

// Clean old messages periodically
setInterval(() => {
  const now = Date.now();
  const dayInMs = 24 * 60 * 60 * 1000;
  messages.splice(0, messages.findIndex(msg => (now - msg.timestamp) < dayInMs));
}, 60 * 60 * 1000);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.emit('previous-messages', messages);

  socket.on('send-message', (message) => {
    messages.push(message);
    io.emit('new-message', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});