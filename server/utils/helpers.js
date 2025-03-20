const logger = require('../services/loggerService');

function generateRoomId() {
  const shortid = require('shortid');
  const roomId = shortid.generate();
  logger.info(`Generated Room ID: ${roomId}`);
  return roomId;
}

function sanitizeUserData(user) {
  return {
    uid: user.uid,
    displayName: user.displayName || `User_${user.uid.slice(0, 4)}`,
  };
}

function isValidVideoUrl(url) {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/)?([A-Za-z0-9_-]{11})(\?.*)?$/;
  const vimeoRegex = /^(https?:\/\/)?(www\.)?vimeo\.com\/(\d+)(\/.*)?$/;
  return youtubeRegex.test(url) || vimeoRegex.test(url);
}

module.exports = { generateRoomId, sanitizeUserData, isValidVideoUrl };