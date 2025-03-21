const winston = require('winston');
const logger = require('../services/loggerService');

jest.mock('winston', () => {
  const mockLogger = {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  };
  return {
    createLogger: jest.fn(() => mockLogger),
    format: {
      combine: jest.fn(),
      timestamp: jest.fn(),
      printf: jest.fn(),
    },
    transports: {
      Console: jest.fn(),
      File: jest.fn(),
    },
  };
});

describe('loggerService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes logger with correct configuration', () => {
    expect(winston.createLogger).toHaveBeenCalledWith({
      level: 'info',
      format: expect.anything(),
      transports: [
        expect.any(Function), // Console transport
        expect.any(Function), // File transport
      ],
    });
  });

  it('logs info messages', () => {
    logger.info('Test info message');
    expect(winston.createLogger().info).toHaveBeenCalledWith('Test info message');
  });

  it('logs error messages', () => {
    logger.error('Test error message');
    expect(winston.createLogger().error).toHaveBeenCalledWith('Test error message');
  });

  it('logs warn messages', () => {
    logger.warn('Test warn message');
    expect(winston.createLogger().warn).toHaveBeenCalledWith('Test warn message');
  });
});