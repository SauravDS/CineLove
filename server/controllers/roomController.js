const Room = require('../models/Room');
const logger = require('../services/loggerService');

exports.createRoom = async (req, res) => {
  try {
    const { videoUrl } = req.body;
    const host = req.user.uid; // Use authenticated user from authMiddleware
    if (!videoUrl) {
      return res.status(400).json({ message: 'videoUrl is required' });
    }
    const room = new Room({ videoUrl, host, users: [{ uid: host }] });
    await room.save();
    logger.info(`Room created: ${room._id} by ${host}`);
    res.status(201).json(room);
  } catch (error) {
    logger.error('Error creating room:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.joinRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const userId = req.user.uid; // Use authenticated user from authMiddleware
    const room = await Room.findById(roomId);
    if (!room) {
      logger.warn(`Room not found for join: ${roomId}`);
      return res.status(404).json({ message: 'Room not found' });
    }
    if (!room.users.some(user => user.uid === userId)) {
      room.users.push({ uid: userId });
      await room.save();
      logger.info(`User ${userId} joined room: ${room._id}`);
    }
    res.json(room);
  } catch (error) {
    logger.error('Error joining room:', error);
    res.status(500).json({ message: 'Server error' });
  }
};