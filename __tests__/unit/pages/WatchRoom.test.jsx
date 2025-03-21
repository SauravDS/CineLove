import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../../src/contexts/AuthContext';
import WatchRoom from '../../../src/pages/WatchRoom';

jest.mock('../../../src/hooks/useRoom', () => ({
  __esModule: true,
  default: () => ({
    roomData: { host: '123', videoUrl: 'https://youtube.com/watch?v=123', users: [{ uid: '123', displayName: 'Test User' }] },
    isHost: true,
    error: null,
  }),
}));

describe('WatchRoom Page', () => {
  const mockUser = { uid: '123', displayName: 'Test User' };
  const mockSocket = { on: jest.fn(), emit: jest.fn(), off: jest.fn() };

  const wrapper = ({ children }) => (
    <AuthContext.Provider value={{ user: mockUser, loading: false }}>
      <MemoryRouter initialEntries={['/watch/test123']}>
        {children}
      </MemoryRouter>
    </AuthContext.Provider>
  );

  it('renders video player, chat, and room ID', () => {
    render(<WatchRoom socket={mockSocket} />, { wrapper });
    expect(screen.getByTestId('video-player')).toBeInTheDocument();
    expect(screen.getByText('Room ID: test123')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type a message...')).toBeInTheDocument();
  });

  it('displays error when useRoom returns an error', () => {
    jest.mock('../../../src/hooks/useRoom', () => ({
      __esModule: true,
      default: () => ({ roomData: null, isHost: false, error: 'Room not found' }),
    }));
    render(<WatchRoom socket={mockSocket} />, { wrapper });
    expect(screen.getByText('Room not found')).toBeInTheDocument();
  });
});