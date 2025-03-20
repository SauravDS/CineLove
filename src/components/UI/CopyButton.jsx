import React, { useState } from 'react';
import copy from 'copy-to-clipboard';
import styles from './CopyButton.module.css';

function CopyButton({ textToCopy }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copy(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <button
      onClick={handleCopy}
      className={`${styles.copyButton} bg-rose-pink text-white font-raleway py-1 px-3 rounded-md hover:bg-deep-rose`}
    >
      {copied ? 'Copied!' : 'Copy Room ID'}
    </button>
  );
}

export default CopyButton;