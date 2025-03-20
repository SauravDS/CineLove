import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useAuth } from '../hooks/useAuth';
import useRoom from '../hooks/useRoom';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import ChatBox from '../components/Chat/ChatBox';
import CopyButton from '../components/UI/CopyButton';
import ErrorMessage from '../components/Error/ErrorMessage';
import styles from './WatchRoom.module.css';

const socket = io(process.env.REACT_APP_SERVER_URL || 'http://localhost:3001');

function WatchRoom() {
  const { roomId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { roomData, isHost, error } = useRoom(socket, roomId, user);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    return () => {
      socket.disconnect();
    };
  }, [user, navigate]);

  if (!roomData && !error) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className={`${styles.watchRoom} min-h-screen bg-pale-pink flex flex-col items-center p-4`}>
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <VideoPlayer socket={socket} roomId={roomId} videoUrl={roomData.videoUrl} isHost={isHost} />
          <div className="mt-4 flex items-center space-x-4">
            <span className="font-raleway text-gray-700">Room ID: {roomId}</span>
            <CopyButton textToCopy={roomId} />
          </div>
        </div>
        <ChatBox socket={socket} roomId={roomId} user={user} />
      </div>
    </div>
  );
}

export default WatchRoom;