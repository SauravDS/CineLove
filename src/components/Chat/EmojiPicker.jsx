import React from 'react';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import styles from './EmojiPicker.module.css';

function EmojiPicker({ onSelect, onClose }) {
  return (
    <div className={styles.emojiPicker}>
      <Picker
        onSelect={onSelect}
        theme="light"
        title="Pick an emoji"
        emoji="heart"
        style={{ border: 'none' }}
      />
      <button
        onClick={onClose}
        className={`${styles.closeButton} bg-rose-pink text-white p-1 rounded-full`}
      >
        ×
      </button>
    </div>
  );
}

export default EmojiPicker;