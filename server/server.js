require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const roomRoutes = require('./routes/rooms');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/rooms', roomRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Socket.IO Logic
const rooms = new Map(); // In-memory room storage (replace with MongoDB for persistence)

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinRoom', ({ roomId, user }) => {
    socket.join(roomId);
    const room = rooms.get(roomId) || { users: [], videoUrl: '', host: null };
    if (!room.users.find((u) => u.uid === user.uid)) {
      room.users.push(user);
    }
    rooms.set(roomId, room);

    io.to(roomId).emit('userJoined', user);
    socket.emit('roomData', room);
    io.to(roomId).emit('usersInRoom', room.users);
  });

  socket.on('sendMessage', ({ roomId, message }) => {
    io.to(roomId).emit('message', message);
  });

  socket.on('controlVideo', ({ roomId, playing, played }) => {
    const room = rooms.get(roomId);
    if (room) {
      room.playing = playing;
      room.played = played;
      io.to(roomId).emit('syncVideo', { playing, played });
    }
  });

  socket.on('getUsers', (roomId) => {
    const room = rooms.get(roomId);
    if (room) {
      socket.emit('usersInRoom', room.users);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    rooms.forEach((room, roomId) => {
      const userIndex = room.users.findIndex((u) => u.socketId === socket.id);
      if (userIndex !== -1) {
        const [user] = room.users.splice(userIndex, 1);
        io.to(roomId).emit('userLeft', user);
        io.to(roomId).emit('usersInRoom', room.users);
      }
    });
  });
});

// Start Server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});s