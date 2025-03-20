import React from 'react';
import { useAuth } from '../hooks/useAuth';
import GoogleSignInButton from '../components/Auth/GoogleSignInButton';
import logo from '../../public/assets/logo.svg';
import styles from './Home.module.css';

function Home() {
  const { user } = useAuth();

  return (
    <div className={`${styles.home} min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-light-lavender to-pale-pink`}>
      <img src={logo} alt="CineLove Logo" className={`${styles.logo} mb-8`} />
      <h1 className="font-playfair text-5xl text-deep-rose mb-4">
        CineLove
      </h1>
      <p className="font-raleway text-lg text-gray-700 mb-8 text-center max-w-md">
        Movie nights, reimagined. Watch together, no matter the distance.
      </p>
      {user ? (
        <p className="font-open-sans text-gray-600">
          Welcome back, {user.displayName}! Head to your <a href="/dashboard" className="text-deep-rose hover:underline">Dashboard</a>.
        </p>
      ) : (
        <GoogleSignInButton />
      )}
    </div>
  );
}

export default Home;