import { useState, useEffect } from 'react';

function useRoom(socket, roomId, user) {
  const [roomData, setRoomData] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!socket || !roomId || !user) return;

    const joinRoom = () => {
      socket.emit('joinRoom', { roomId, user });
    };

    socket.on('roomData', (data) => {
      setRoomData(data);
      setIsHost(data.host === user.uid);
    });

    socket.on('connect_error', (err) => {
      setError('Connection error. Please try again.');
      console.error('Socket connection error:', err);
    });

    socket.on('roomError', (message) => {
      setError(message);
    });

    joinRoom();

    return () => {
      socket.off('roomData');
      socket.off('connect_error');
      socket.off('roomError');
    };
  }, [socket, roomId, user]);

  return { roomData, isHost, error };
}

export default useRoom;