const { Server } = require('socket.io');
const http = require('http');
const initializeSocket = require('../services/socketService');

jest.mock('socket.io', () => {
  const mockIo = {
    on: jest.fn(),
    emit: jest.fn(),
  };
  return { Server: jest.fn(() => mockIo) };
});

describe('socketService', () => {
  let server;
  let io;

  beforeEach(() => {
    jest.clearAllMocks();
    server = http.createServer();
    io = initializeSocket(server);
  });

  it('initializes Socket.IO with correct options', () => {
    expect(Server).toHaveBeenCalledWith(server, {
      cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:3000',
        methods: ['GET', 'POST'],
      },
    });
  });

  it('sets up connection event listener', () => {
    expect(io.on).toHaveBeenCalledWith('connection', expect.any(Function));
  });

  it('handles joinRoom event and emits roomData', () => {
    const mockSocket = {
      id: 'socket123',
      on: jest.fn(),
      emit: jest.fn(),
      join: jest.fn(),
    };
    const connectionCallback = io.on.mock.calls.find(call => call[0] === 'connection')[1];
    connectionCallback(mockSocket);

    const joinRoomHandler = mockSocket.on.mock.calls.find(call => call[0] === 'joinRoom')[1];
    joinRoomHandler({ roomId: 'room123', user: { uid: 'user1', displayName: 'User1' } });

    expect(mockSocket.join).toHaveBeenCalledWith('room123');
    expect(mockSocket.emit).toHaveBeenCalledWith('roomData', expect.any(Object));
  });
});