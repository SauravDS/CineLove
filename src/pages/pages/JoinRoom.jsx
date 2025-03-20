import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import JoinRoomForm from '../components/Forms/JoinRoomForm';
import styles from './JoinRoom.module.css';

function JoinRoom() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className={`${styles.joinRoom} min-h-screen flex items-center justify-center bg-pale-pink`}>
      <JoinRoomForm />
    </div>
  );
}

export default JoinRoom;