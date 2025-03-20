import React from 'react';
import styles from './LoadingIndicator.module.css';

function LoadingIndicator({ size = 'medium' }) {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-20 h-20',
  };

  return (
    <div className={`${styles.spinner} ${sizeClasses[size]} border-4 border-rose-pink border-t-deep-rose rounded-full animate-spin`}></div>
  );
}

export default LoadingIndicator;