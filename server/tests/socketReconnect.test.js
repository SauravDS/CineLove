const { handleReconnection } = require('../utils/socketReconnect');
const logger = require('../services/loggerService');

jest.mock('../services/loggerService', () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

describe('socketReconnect Utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('logs successful reconnection', () => {
    const mockSocket = {
      id: 'socket123',
      on: jest.fn((event, callback) => {
        if (event === 'connect') callback();
      }),
    };
    const mockIo = { emit: jest.fn() };

    handleReconnection(mockSocket, mockIo);

    expect(mockSocket.on).toHaveBeenCalledWith('connect', expect.any(Function));
    expect(logger.info).toHaveBeenCalledWith('Socket reconnected:', 'socket123');
  });

  it('logs reconnection error', () => {
    const mockSocket = {
      id: 'socket123',
      on: jest.fn((event, callback) => {
        if (event === 'connect_error') callback(new Error('Reconnection failed'));
      }),
    };
    const mockIo = { emit: jest.fn() };

    handleReconnection(mockSocket, mockIo);

    expect(mockSocket.on).toHaveBeenCalledWith('connect_error', expect.any(Function));
    expect(logger.error).toHaveBeenCalledWith('Socket reconnection error:', expect.any(Error));
  });
});