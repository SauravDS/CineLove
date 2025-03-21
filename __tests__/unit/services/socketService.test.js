import io from 'socket.io-client';
import { initializeSocket } from '../../../src/services/socketService';

jest.mock('socket.io-client', () => {
  const mockSocket = {
    on: jest.fn(),
    emit: jest.fn(),
    disconnect: jest.fn(),
  };
  return jest.fn(() => mockSocket);
});

describe('socketService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes socket with correct URL', () => {
    const socket = initializeSocket();
    expect(io).toHaveBeenCalledWith('http://localhost:3001', expect.any(Object));
    expect(socket).toBeDefined();
  });

  it('sets up reconnection options', () => {
    initializeSocket();
    expect(io).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    }));
  });
});