const shortid = require('shortid');
const Room = require('../models/Room');
const logger = require('../services/loggerService');

async function createRoom(req, res) {
  const { videoUrl, host } = req.body;

  if (!videoUrl || !host) {
    logger.error('Create room failed: Video URL and host are required');
    return res.status(400).json({ error: 'Video URL and host are required' });
  }

  try {
    const roomId = shortid.generate();
    const room = new Room({
      roomId,
      videoUrl,
      host,
      users: [{ uid: host, displayName: 'Host' }],
    });

    await room.save();
    logger.info(`Room created: ${roomId}`);
    res.status(201).json({ roomId, videoUrl, host });
  } catch (error) {
    logger.error(`Error creating room: ${error.message}`);
    res.status(500).json({ error: 'Failed to create room' });
  }
}

async function joinRoom(req, res) {
  const { roomId } = req.params;
  const { userId } = req.body;

  if (!userId) {
    logger.error('Join room failed: User ID is required');
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const room = await Room.findOne({ roomId });
    if (!room) {
      logger.error(`Room not found: ${roomId}`);
      return res.status(404).json({ error: 'Room not found' });
    }

    if (!room.users.find((u) => u.uid === userId)) {
      room.users.push({ uid: userId, displayName: `User_${userId.slice(0, 4)}` });
      await room.save();
      logger.info(`User ${userId} joined room: ${roomId}`);
    }

    res.status(200).json(room);
  } catch (error) {
    logger.error(`Error joining room: ${error.message}`);
    res.status(500).json({ error: 'Failed to join room' });
  }
}

module.exports = { createRoom, joinRoom };