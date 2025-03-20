import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../services/authService';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const { signInWithGoogle } = await import('../services/authService');
    return signInWithGoogle();
  };

  const signOut = async () => {
    const { signOut } = await import('../services/authService');
    return signOut();
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };