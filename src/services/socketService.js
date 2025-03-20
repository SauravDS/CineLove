import { io } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001';

const socket = io(SOCKET_URL, {
  autoConnect: false, // Connect manually in components
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export default socket;