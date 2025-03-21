const { generateRoomId } = require('../utils/helpers');

describe('helpers Utility', () => {
  it('generateRoomId creates a 6-character alphanumeric ID', () => {
    const roomId = generateRoomId();
    expect(roomId).toHaveLength(6);
    expect(roomId).toMatch(/^[a-zA-Z0-9]+$/);
  });

  it('generateRoomId produces unique IDs', () => {
    const id1 = generateRoomId();
    const id2 = generateRoomId();
    expect(id1).not.toBe(id2);
  });
});