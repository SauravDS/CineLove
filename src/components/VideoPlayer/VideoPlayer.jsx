import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import styles from './VideoPlayer.module.css';

function VideoPlayer({ socket, roomId, videoUrl, isHost }) {
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!socket) return;

    socket.on('syncVideo', ({ playing: newPlaying, played: newPlayed }) => {
      setPlaying(newPlaying);
      setPlayed(newPlayed);
      if (playerRef.current) {
        playerRef.current.seekTo(newPlayed, 'fraction');
      }
    });

    return () => {
      socket.off('syncVideo');
    };
  }, [socket]);

  const handlePlayPause = () => {
    const newPlaying = !playing;
    setPlaying(newPlaying);
    if (isHost) {
      socket.emit('controlVideo', { roomId, playing: newPlaying, played });
    }
  };

  const handleProgress = (state) => {
    if (isHost) {
      setPlayed(state.played);
      socket.emit('controlVideo', { roomId, playing, played: state.played });
    }
  };

  const handleSeek = (e) => {
    const newPlayed = parseFloat(e.target.value);
    setPlayed(newPlayed);
    if (isHost && playerRef.current) {
      playerRef.current.seekTo(newPlayed, 'fraction');
      socket.emit('controlVideo', { roomId, playing, played: newPlayed });
    }
  };

  return (
    <div className={`${styles.videoPlayer} bg-black rounded-lg overflow-hidden`}>
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        playing={playing}
        volume={volume}
        width="100%"
        height="100%"
        onProgress={handleProgress}
        controls={false} // Custom controls below
      />
      <div className="p-4 bg-gray-900 text-white">
        <button
          onClick={handlePlayPause}
          className="bg-deep-rose py-2 px-4 rounded-md mr-2 hover:bg-rose-pink"
        >
          {playing ? 'Pause' : 'Play'}
        </button>
        {isHost && (
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={played}
            onChange={handleSeek}
            className={styles.seekBar}
          />
        )}
        <input
          type="range"
          min={0}
          max={1}
          step="any"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="ml-2 w-24"
        />
      </div>
    </div>
  );
}

export default VideoPlayer;