import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button';
import styles from './Dashboard.module.css';

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className={`${styles.dashboard} min-h-screen flex flex-col items-center justify-center bg-pale-pink`}>
      <h1 className="font-playfair text-4xl text-deep-rose mb-6">
        Welcome, {user.displayName}!
      </h1>
      <p className="font-raleway text-lg text-gray-700 mb-8 text-center max-w-md">
        Ready for a movie night? Create a room or join one to watch together.
      </p>
      <div className="space-x-4">
        <Button onClick={() => navigate('/create')}>
          Create a Room
        </Button>
        <Button variant="secondary" onClick={() => navigate('/join')}>
          Join a Room
        </Button>
      </div>
    </div>
  );
}

export default Dashboard;