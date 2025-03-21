import { render, screen } from '@testing-library/react';
import VideoPlayer from '../../../src/components/VideoPlayer/VideoPlayer';

describe('VideoPlayer Component', () => {
  const mockSocket = {
    emit: jest.fn(),
    on: jest.fn(),
  };

  it('renders with video URL and default props', () => {
    render(
      <VideoPlayer
        socket={mockSocket}
        roomId="test123"
        videoUrl="https://youtube.com/watch?v=123"
        isHost={false}
      />
    );
    const videoElement = screen.getByTestId('video-player');
    expect(videoElement).toBeInTheDocument();
    expect(videoElement).toHaveAttribute('src', expect.stringContaining('youtube.com'));
  });

  it('displays controls for host', () => {
    render(
      <VideoPlayer
        socket={mockSocket}
        roomId="test123"
        videoUrl="https://youtube.com/watch?v=123"
        isHost={true}
      />
    );
    expect(screen.getByLabelText('Play/Pause')).toBeInTheDocument();
    expect(screen.getByLabelText('Seek')).toBeInTheDocument();
  });

  it('does not display controls for non-host', () => {
    render(
      <VideoPlayer
        socket={mockSocket}
        roomId="test123"
        videoUrl="https://youtube.com/watch?v=123"
        isHost={false}
      />
    );
    expect(screen.queryByLabelText('Play/Pause')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Seek')).not.toBeInTheDocument();
  });
});