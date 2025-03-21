const admin = require('firebase-admin');
const { verifyToken } = require('../controllers/authController');

jest.mock('firebase-admin', () => ({
  auth: jest.fn(() => ({
    verifyIdToken: jest.fn(),
  })),
}));

describe('authController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('verifyToken returns UID on valid token', async () => {
    const req = { body: { token: 'valid-token' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    admin.auth().verifyIdToken.mockResolvedValue({ uid: '123' });

    await verifyToken(req, res);

    expect(admin.auth().verifyIdToken).toHaveBeenCalledWith('valid-token');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ uid: '123' });
  });

  it('verifyToken returns 400 on missing token', async () => {
    const req = { body: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await verifyToken(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Token is required' });
  });

  it('verifyToken returns 401 on invalid token', async () => {
    const req = { body: { token: 'invalid-token' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    admin.auth().verifyIdToken.mockRejectedValue(new Error('Invalid token'));

    await verifyToken(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' });
  });
});