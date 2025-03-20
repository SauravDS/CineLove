const rateLimit = require('express-rate-limit');
const logger = require('../services/loggerService');

const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
  handler: (req, res, next, options) => {
    logger.error(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(options.statusCode).json(options.message);
  },
});

module.exports = rateLimitMiddleware;