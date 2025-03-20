import React from 'react';
import styles from './Button.module.css';

function Button({ children, onClick, type = 'button', variant = 'primary', disabled = false }) {
  const baseClasses = 'font-raleway py-2 px-4 rounded-md transition-colors duration-300';
  const variantClasses = {
    primary: 'bg-deep-rose text-white hover:bg-rose-pink',
    secondary: 'bg-rose-pink text-white hover:bg-deep-rose',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${baseClasses} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}

export default Button;