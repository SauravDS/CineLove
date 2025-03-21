const Room = require('../models/Room');
const { createRoom, joinRoom } = require('../controllers/roomController');

jest.mock('../models/Room');

describe('roomController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('createRoom creates and returns a room', async () => {
    const req = { body: { videoUrl: 'https://youtube.com/watch?v=123', host: 'user1' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const mockRoom = { _id: 'room123', videoUrl: req.body.videoUrl, host: req.body.host, users: [] };
    Room.prototype.save = jest.fn().mockResolvedValue(mockRoom);

    await createRoom(req, res);

    expect(Room.prototype.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockRoom);
  });

  it('joinRoom adds user and returns updated room', async () => {
    const req = { params: { roomId: 'room123' }, body: { userId: 'user2' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const mockRoom = { _id: 'room123', users: [{ uid: 'user1' }], save: jest.fn().mockResolvedValue() };
    Room.findById = jest.fn().mockResolvedValue(mockRoom);

    await joinRoom(req, res);

    expect(Room.findById).toHaveBeenCalledWith('room123');
    expect(mockRoom.users).toContainEqual({ uid: 'user2' });
    expect(mockRoom.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockRoom);
  });
});