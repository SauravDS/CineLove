const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  host: {
    type: String, // User UID from Firebase
    required: true,
  },
  users: [{
    uid: String,
    displayName: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  playing: {
    type: Boolean,
    default: false,
  },
  played: {
    type: Number,
    default: 0,
  },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;