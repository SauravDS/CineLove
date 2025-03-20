const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const roomRoutes = require('../routes/rooms');
const Room = require('../models/Room');

const app = express();
app.use(express.json());
app.use('/api/rooms', roomRoutes);

describe('Room API', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/cinelove_test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await Room.deleteMany({});
  });

  describe('POST /api/rooms', () => {
    it('should create a new room', async () => {
      const res = await request(app)
        .post('/api/rooms')
        .send({ videoUrl: 'https://www.youtube.com/watch?v=12345678901', host: 'user123' });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('roomId');
      expect(res.body.videoUrl).toBe('https://www.youtube.com/watch?v=12345678901');
      expect(res.body.host).toBe('user123');
    });

    it('should return 400 if videoUrl or host is missing', async () => {
      const res = await request(app)
        .post('/api/rooms')
        .send({ videoUrl: 'https://www.youtube.com/watch?v=12345678901' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Video URL and host are required');
    });
  });

  describe('POST /api/rooms/:roomId/join', () => {
    it('should join an existing room', async () => {
      const room = new Room({
        roomId: 'test123',
        videoUrl: 'https://www.youtube.com/watch?v=12345678901',
        host: 'user123',
        users: [{ uid: 'user123', displayName: 'Host' }],
      });
      await room.save();

      const res = await request(app)
        .post('/api/rooms/test123/join')
        .send({ userId: 'user456' });

      expect(res.status).toBe(200);
      expect(res.body.roomId).toBe('test123');
      expect(res.body.users).toContainEqual({ uid: 'user456', displayName: expect.stringContaining('User_') });
    });

    it('should return 404 if room does not exist', async () => {
      const res = await request(app)
        .post('/api/rooms/nonexistent/join')
        .send({ userId: 'user456' });

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Room not found');
    });
  });
});