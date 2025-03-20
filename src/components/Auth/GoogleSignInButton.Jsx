import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import styles from './GoogleSignInButton.module.css';

function GoogleSignInButton() {
  const { signInWithGoogle } = useAuth();

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      className={`${styles.button} bg-deep-rose text-white font-raleway py-2 px-4 rounded-md hover:bg-rose-pink`}
    >
      Sign In with Google
    </button>
  );
}

export default GoogleSignInButton;