import { renderHook, act } from '@testing-library/react';
import useRoom from '../../../src/hooks/useRoom';

describe('useRoom Hook', () => {
  const mockSocket = {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  };
  const mockUser = { uid: '123', displayName: 'Test User' };
  const roomId = 'test123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with null roomData and false isHost', () => {
    const { result } = renderHook(() => useRoom(mockSocket, roomId, mockUser));
    expect(result.current.roomData).toBeNull();
    expect(result.current.isHost).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('joins room and updates state on roomData event', () => {
    const mockRoomData = { host: '123', videoUrl: 'https://youtube.com/watch?v=123', users: [mockUser] };
    const { result } = renderHook(() => useRoom(mockSocket, roomId, mockUser));

    act(() => {
      mockSocket.on.mock.calls.find(([event]) => event === 'roomData')[1](mockRoomData);
    });

    expect(mockSocket.emit).toHaveBeenCalledWith('joinRoom', { roomId, user: mockUser });
    expect(result.current.roomData).toEqual(mockRoomData);
    expect(result.current.isHost).toBe(true);
  });

  it('sets error on roomError event', () => {
    const { result } = renderHook(() => useRoom(mockSocket, roomId, mockUser));

    act(() => {
      mockSocket.on.mock.calls.find(([event]) => event === 'roomError')[1]('Room not found');
    });

    expect(result.current.error).toBe('Room not found');
  });
});