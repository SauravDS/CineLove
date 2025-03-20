import React from 'react';
import styles from './Message.module.css';

function Message({ message, currentUser }) {
  const isOwnMessage = message.type === 'user' && message.user?.uid === currentUser?.uid;
  const isSystemMessage = message.type === 'system';

  return (
    <div
      className={`${styles.message} ${
        isOwnMessage ? styles.ownMessage : ''
      } ${isSystemMessage ? styles.systemMessage : ''}`}
    >
      {!isSystemMessage && message.user && (
        <span className={`${styles.userName} font-raleway`}>
          {message.user.displayName}:
        </span>
      )}
      <span className={styles.text}>{message.text}</span>
    </div>
  );
}

export default Message;