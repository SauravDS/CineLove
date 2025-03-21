import { createRoom, joinRoom } from '../../../src/services/roomService';
import api from '../../../src/utils/api';

jest.mock('../../../src/utils/api');

describe('roomService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('createRoom sends POST request with correct data', async () => {
    const mockResponse = { roomId: 'abc123', videoUrl: 'https://youtube.com/watch?v=123', host: '123' };
    api.post.mockResolvedValue(mockResponse);

    const data = { videoUrl: 'https://youtube.com/watch?v=123', host: '123' };
    const result = await createRoom(data);

    expect(api.post).toHaveBeenCalledWith('/api/rooms', data);
    expect(result).toEqual(mockResponse);
  });

  it('joinRoom sends POST request with correct data', async () => {
    const mockResponse = { roomId: 'abc123', videoUrl: 'https://youtube.com/watch?v=123', host: '456' };
    api.post.mockResolvedValue(mockResponse);

    const data = { roomId: 'abc123', userId: '123' };
    const result = await joinRoom(data);

    expect(api.post).toHaveBeenCalledWith('/api/rooms/abc123/join', { userId: '123' });
    expect(result).toEqual(mockResponse);
  });

  it('createRoom rejects on API error', async () => {
    api.post.mockRejectedValue(new Error('API Error'));

    await expect(createRoom({ videoUrl: 'test', host: '123' })).rejects.toThrow('API Error');
  });
});