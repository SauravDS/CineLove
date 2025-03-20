const express = require('express');
const shortid = require('shortid');
const Room = require('../models/Room');

const router = express.Router();

// Create a new room
router.post('/', async (req, res) => {
  const { videoUrl, host } = req.body;

  if (!videoUrl || !host) {
    return res.status(400).json({ error: 'Video URL and host are required' });
  }

  try {
    const roomId = shortid.generate();
    const room = new Room({
      roomId,
      videoUrl,
      host,
      users: [{ uid: host, displayName: 'Host' }], // Placeholder displayName
    });

    await room.save();
    res.status(201).json({ roomId, videoUrl, host });
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ error: 'Failed to create room' });
  }
});

// Join an existing room
router.post('/:roomId/join', async (req, res) => {
  const { roomId } = req.params;
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const room = await Room.findOne({ roomId });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    if (!room.users.find((u) => u.uid === userId)) {
      room.users.push({ uid: userId, displayName: `User_${userId.slice(0, 4)}` });
      await room.save();
    }

    res.status(200).json(room);
  } catch (error) {
    console.error('Error joining room:', error);
    res.status(500).json({ error: 'Failed to join room' });
  }
});

module.exports = router;