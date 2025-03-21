const mongoose = require('mongoose');
const connectDB = require('../utils/db');
const logger = require('../services/loggerService');

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

jest.mock('../services/loggerService', () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

describe('db Utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.MONGO_URI = 'mongodb://localhost:27017/cinelove_test';
  });

  afterEach(() => {
    delete process.env.MONGO_URI;
  });

  it('connects to MongoDB successfully', async () => {
    mongoose.connect.mockResolvedValue(true);

    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledWith('mongodb://localhost:27017/cinelove_test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    expect(logger.info).toHaveBeenCalledWith('MongoDB connected');
  });

  it('logs error and exits on connection failure', async () => {
    const error = new Error('Connection failed');
    mongoose.connect.mockRejectedValue(error);
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});

    await connectDB();

    expect(logger.error).toHaveBeenCalledWith('MongoDB connection error:', error);
    expect(mockExit).toHaveBeenCalledWith(1);

    mockExit.mockRestore();
  });
});