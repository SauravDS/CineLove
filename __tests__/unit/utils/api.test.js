import api from '../../../src/utils/api';

describe('api Utility', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    jest.clearAllMocks();
  });

  it('get method fetches with correct URL and headers', async () => {
    const mockResponse = { data: 'test' };
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await api.get('/test-endpoint');
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3001/api/test-endpoint',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
      })
    );
    expect(result).toEqual(mockResponse);
  });

  it('post method sends data with correct headers', async () => {
    const mockResponse = { id: 1 };
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const data = { key: 'value' };
    const result = await api.post('/test-endpoint', data);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3001/api/test-endpoint',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(data),
      })
    );
    expect(result).toEqual(mockResponse);
  });

  it('throws error on failed request', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
    });

    await expect(api.get('/test-endpoint')).rejects.toThrow('HTTP error! status: 400');
  });
});