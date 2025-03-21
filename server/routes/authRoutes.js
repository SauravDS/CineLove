const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const logger = require('../services/loggerService');

router.post('/verify', (req, res, next) => {
  logger.info('Token verification request received');
  authController.verifyToken(req, res, next);
});

module.exports = router;