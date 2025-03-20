import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './Header.module.css';

function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <header className={`${styles.header} bg-rose-pink text-white fixed w-full top-0 z-10`}>
      <div className="max-w-1200 mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/" className={`${styles.logo} font-playfair text-2xl`}>
          CineLove
        </Link>
        <nav className="space-x-4">
          {user ? (
            <>
              <Link to="/dashboard" className={styles.navLink}>Dashboard</Link>
              <Link to="/create" className={styles.navLink}>Create Room</Link>
              <button onClick={handleSignOut} className={styles.navLink}>
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/" className={styles.navLink}>Home</Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;