import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import CreateRoomForm from '../components/Forms/CreateRoomForm';
import styles from './CreateRoom.module.css';

function CreateRoom() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className={`${styles.createRoom} min-h-screen flex items-center justify-center bg-pale-pink`}>
      <CreateRoomForm />
    </div>
  );
}

export default CreateRoom;