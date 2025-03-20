import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { joinRoom } from '../../services/roomService';
import styles from './JoinRoomForm.module.css';

function JoinRoomForm() {
  const [roomId, setRoomId] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('You must be signed in to join a room.');
      return;
    }

    if (!roomId.trim()) {
      setError('Please enter a Room ID.');
      return;
    }

    try {
      const roomData = await joinRoom({ roomId, userId: user.uid });
      if (roomData) {
        navigate(`/watch/${roomId}`);
      } else {
        setError('Room not found or invalid.');
      }
    } catch (err) {
      setError('Failed to join room. Please try again.');
      console.error('Join room error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.form} bg-pale-pink p-6 rounded-lg shadow-md`}>
      <h2 className="font-playfair text-2xl text-deep-rose mb-4">Join a Room</h2>
      <div className="mb-4">
        <label htmlFor="roomId" className="block font-raleway text-gray-700 mb-2">
          Room ID
        </label>
        <input
          type="text"
          id="roomId"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter Room ID"
          className={`${styles.input} w-full p-2 border border-rose-pink rounded-md`}
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        type="submit"
        className="bg-deep-rose text-white font-raleway py-2 px-4 rounded-md hover:bg-rose-pink"
      >
        Join Room
      </button>
    </form>
  );
}

export default JoinRoomForm;