const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../../logs/app.log');

function ensureLogDirectory() {
  const logDir = path.dirname(logFile);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
}

function log(level, message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;
  
  console[level === 'error' ? 'error' : 'log'](logMessage.trim());
  
  ensureLogDirectory();
  fs.appendFile(logFile, logMessage, (err) => {
    if (err) console.error('Failed to write to log file:', err);
  });
}

function info(message) {
  log('info', message);
}

function error(message) {
  log('error', message);
}

module.exports = { info, error };