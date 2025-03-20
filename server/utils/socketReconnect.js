const logger = require('../services/loggerService');

function setupSocketReconnection(io) {
  io.on('connection', (socket) => {
    socket.on('reconnect_attempt', (attempt) => {
      logger.info(`Client ${socket.id} attempting to reconnect (attempt ${attempt})`);
    });

    socket.on('reconnect', (attempt) => {
      logger.info(`Client ${socket.id} reconnected successfully after ${attempt} attempts`);
    });

    socket.on('reconnect_error', (error) => {
      logger.error(`Reconnection error for client ${socket.id}: ${error.message}`);
    });

    socket.on('reconnect_failed', () => {
      logger.error(`Client ${socket.id} failed to reconnect after max attempts`);
    });
  });
}

module.exports = { setupSocketReconnection };