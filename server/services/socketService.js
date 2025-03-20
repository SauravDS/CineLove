const { Server } = require('socket.io');
const Room = require('../models/Room');

function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinRoom', async ({ roomId, user }) => {
      socket.join(roomId);
      const room = await Room.findOne({ roomId });
      if (!room) {
        socket.emit('roomError', 'Room not found');
        return;
      }
      if (!room.users.find((u) => u.uid === user.uid)) {
        room.users.push(user);
        await room.save();
      }
      io.to(roomId).emit('userJoined', user);
      socket.emit('roomData', room);
      io.to(roomId).emit('usersInRoom', room.users);
    });

    socket.on('sendMessage', ({ roomId, message }) => {
      io.to(roomId).emit('message', message);
    });

    socket.on('controlVideo', async ({ roomId, playing, played }) => {
      const room = await Room.findOne({ roomId });
      if (room) {
        room.playing = playing;
        room.played = played;
        await room.save();
        io.to(roomId).emit('syncVideo', { playing, played });
      }
    });

    socket.on('getUsers', async (roomId) => {
      const room = await Room.findOne({ roomId });
      if (room) {
        socket.emit('usersInRoom', room.users);
      }
    });

    socket.on('disconnect', async () => {
      console.log('User disconnected:', socket.id);
      const rooms = await Room.find({ 'users.socketId': socket.id });
      for (const room of rooms) {
        const userIndex = room.users.findIndex((u) => u.socketId === socket.id);
        if (userIndex !== -1) {
          const [user] = room.users.splice(userIndex, 1);
          await room.save();
          io.to(room.roomId).emit('userLeft', user);
          io.to(room.roomId).emit('usersInRoom', room.users);
        }
      }
    });
  });

  return io;
}

module.exports = { initializeSocket };