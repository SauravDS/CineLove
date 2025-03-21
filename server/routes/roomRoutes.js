const express = require('express');
const router = express.Router();
const { createRoom, joinRoom } = require('../controllers/roomController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/:roomId', async (req, res) => {
  try {
    const Room = require('../models/Room');
    const logger = require('../services/loggerService');
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

router.post('/', authMiddleware, createRoom);
router.post('/:roomId/join', authMiddleware, joinRoom);

module.exports = router;