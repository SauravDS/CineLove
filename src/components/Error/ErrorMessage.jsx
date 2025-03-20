import React from 'react';
import styles from './ErrorMessage.module.css';

function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className={`${styles.error} bg-red-100 text-red-700 p-3 rounded-md border border-red-300`}>
      {message}
    </div>
  );
}

export default ErrorMessage;