const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001';

async function createRoom({ videoUrl, host }) {
  try {
    const response = await fetch(`${API_URL}/api/rooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ videoUrl, host }),
    });

    if (!response.ok) {
      throw new Error('Failed to create room');
    }

    const data = await response.json();
    return data; // { roomId, videoUrl, host }
  } catch (error) {
    console.error('Create Room Error:', error);
    throw error;
  }
}

async function joinRoom({ roomId, userId }) {
  try {
    const response = await fetch(`${API_URL}/api/rooms/${roomId}/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error('Failed to join room');
    }

    const data = await response.json();
    return data; // Room data or null if invalid
  } catch (error) {
    console.error('Join Room Error:', error);
    throw error;
  }
}

export { createRoom, joinRoom };