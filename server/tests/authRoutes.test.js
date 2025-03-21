const request = require('supertest');
const express = require('express');
const authRoutes = require('../routes/authRoutes');
const admin = require('firebase-admin');

jest.mock('firebase-admin', () => ({
  auth: jest.fn(() => ({
    verifyIdToken: jest.fn(),
  })),
}));

describe('authRoutes', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/api/auth', authRoutes);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('POST /verify returns UID on valid token', async () => {
    admin.auth().verifyIdToken.mockResolvedValue({ uid: '123' });

    const response = await request(app)
      .post('/api/auth/verify')
      .send({ token: 'valid-token' })
      .expect(200);

    expect(response.body).toEqual({ uid: '123' });
    expect(admin.auth().verifyIdToken).toHaveBeenCalledWith('valid-token');
  });

  it('POST /verify returns 400 on missing token', async () => {
    const response = await request(app)
      .post('/api/auth/verify')
      .send({})
      .expect(400);

    expect(response.body).toEqual({ error: 'Token is required' });
  });

  it('POST /verify returns 401 on invalid token', async () => {
    admin.auth().verifyIdToken.mockRejectedValue(new Error('Invalid token'));

    const response = await request(app)
      .post('/api/auth/verify')
      .send({ token: 'invalid-token' })
      .expect(401);

    expect(response.body).toEqual({ error: 'Invalid token' });
  });
});