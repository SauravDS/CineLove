import { fetchVideoMetadata } from '../../../src/services/videoService';
import api from '../../../src/utils/api';

jest.mock('../../../src/utils/api');

describe('videoService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetchVideoMetadata sends GET request with correct URL', async () => {
    const mockResponse = { title: 'Test Video', duration: 120 };
    api.get.mockResolvedValue(mockResponse);

    const videoUrl = 'https://youtube.com/watch?v=123';
    const result = await fetchVideoMetadata(videoUrl);

    expect(api.get).toHaveBeenCalledWith('/api/video/metadata?url=https%3A%2F%2Fyoutube.com%2Fwatch%3Fv%3D123');
    expect(result).toEqual(mockResponse);
  });

  it('fetchVideoMetadata rejects on API error', async () => {
    api.get.mockRejectedValue(new Error('API Error'));

    await expect(fetchVideoMetadata('https://youtube.com/watch?v=123')).rejects.toThrow('API Error');
  });
});