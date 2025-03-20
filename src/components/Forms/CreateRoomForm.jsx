import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { createRoom } from '../../services/roomService';
import { validateVideoUrl } from '../../utils/validation';
import styles from './CreateRoomForm.module.css';

function CreateRoomForm() {
  const [videoUrl, setVideoUrl] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('You must be signed in to create a room.');
      return;
    }

    if (!validateVideoUrl(videoUrl)) {
      setError('Please enter a valid YouTube or Vimeo URL.');
      return;
    }

    try {
      const roomData = await createRoom({ videoUrl, host: user.uid });
      navigate(`/watch/${roomData.roomId}`);
    } catch (err) {
      setError('Failed to create room. Please try again.');
      console.error('Create room error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.form} bg-pale-pink p-6 rounded-lg shadow-md`}>
      <h2 className="font-playfair text-2xl text-deep-rose mb-4">Create a Room</h2>
      <div className="mb-4">
        <label htmlFor="videoUrl" className="block font-raleway text-gray-700 mb-2">
          Video URL (YouTube or Vimeo)
        </label>
        <input
          type="text"
          id="videoUrl"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          className={`${styles.input} w-full p-2 border border-rose-pink rounded-md`}
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        type="submit"
        className="bg-deep-rose text-white font-raleway py-2 px-4 rounded-md hover:bg-rose-pink"
      >
        Create Room
      </button>
    </form>
  );
}

export default CreateRoomForm;