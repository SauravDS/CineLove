const admin = require('firebase-admin');
const logger = require('../services/loggerService');

async function verifyToken(req, res) {
  const { token } = req.body;

  if (!token) {
    logger.error('Token verification failed: Token is required');
    return res.status(400).json({ error: 'Token is required' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    logger.info(`Token verified for user: ${decodedToken.uid}`);
    res.status(200).json({ uid: decodedToken.uid });
  } catch (error) {
    logger.error(`Token verification error: ${error.message}`);
    res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = { verifyToken };