const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const logger = require('../services/loggerService');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/:roomId', async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);
    if (!room) {
      logger.warn(`Room not found: ${req.params.roomId}`);
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    logger.error('Error fetching room:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { videoUrl, host } = req.body;
    if (!videoUrl || !host) {
      return res.status(400).json({ message: 'videoUrl and host are required' });
    }
    const room = new Room({ videoUrl, host, users: [{ uid: host }] });
    await room.save();
    logger.info(`Room created: ${room._id}`);
    res.status(201).json(room);
  } catch (error) {
    logger.error('Error creating room:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:roomId/join', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }
    const room = await Room.findById(req.params.roomId);
    if (!room) {
      logger.warn(`Room not found for join: ${req.params.roomId}`);
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
});

module.exports = router;