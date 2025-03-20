import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../src/contexts/AuthContext';
import CreateRoomForm from '../../src/components/Forms/CreateRoomForm';
import JoinRoomForm from '../../src/components/Forms/JoinRoomForm';
import * as roomService from '../../src/services/roomService';

jest.mock('../../src/services/roomService');

describe('Room Creation and Joining Integration', () => {
  const mockUser = { uid: '123', displayName: 'Test User' };
  const wrapper = ({ children }) => (
    <AuthContext.Provider value={{ user: mockUser, loading: false, signInWithGoogle: jest.fn(), signOut: jest.fn() }}>
      <MemoryRouter initialEntries={['/create']}>
        <Routes>
          <Route path="/create" element={children} />
          <Route path="/join" element={<JoinRoomForm />} />
          <Route path="/watch/:roomId" element={<div>Watch Room</div>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates a room and navigates to watch page', async () => {
    roomService.createRoom.mockResolvedValue({ roomId: 'abc123', videoUrl: 'https://youtube.com/watch?v=123', host: '123' });

    render(<CreateRoomForm />, { wrapper });

    fireEvent.change(screen.getByPlaceholderText('Enter YouTube or Vimeo URL'), {
      target: { value: 'https://youtube.com/watch?v=123' },
    });
    fireEvent.click(screen.getByText('Create Room'));

    await waitFor(() => {
      expect(roomService.createRoom).toHaveBeenCalledWith({ videoUrl: 'https://youtube.com/watch?v=123', host: '123' });
      expect(screen.getByText('Watch Room')).toBeInTheDocument();
    });
  });

  it('joins a room and navigates to watch page', async () => {
    roomService.joinRoom.mockResolvedValue({ roomId: 'abc123', videoUrl: 'https://youtube.com/watch?v=123', host: '123' });

    render(<JoinRoomForm />, { wrapper: { children: <JoinRoomForm /> } });

    fireEvent.change(screen.getByPlaceholderText('Enter Room ID'), { target: { value: 'abc123' } });
    fireEvent.click(screen.getByText('Join Room'));

    await waitFor(() => {
      expect(roomService.joinRoom).toHaveBeenCalledWith({ roomId: 'abc123', userId: '123' });
      expect(screen.getByText('Watch Room')).toBeInTheDocument();
    });
  });
});