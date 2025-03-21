import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../../src/contexts/AuthContext';
import JoinRoomForm from '../../../src/components/Forms/JoinRoomForm';
import * as roomService from '../../../src/services/roomService';

jest.mock('../../../src/services/roomService');

describe('JoinRoomForm Component', () => {
  const mockUser = { uid: '123', displayName: 'Test User' };
  const mockNavigate = jest.fn();

  const wrapper = ({ children }) => (
    <AuthContext.Provider value={{ user: mockUser, loading: false }}>
      <MemoryRouter>{children}</MemoryRouter>
    </AuthContext.Provider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);
  });

  it('renders form elements', () => {
    render(<JoinRoomForm />, { wrapper });
    expect(screen.getByPlaceholderText('Enter Room ID')).toBeInTheDocument();
    expect(screen.getByText('Join Room')).toBeInTheDocument();
  });

  it('submits form and navigates on success', async () => {
    roomService.joinRoom.mockResolvedValue({ roomId: 'abc123', videoUrl: 'https://youtube.com/watch?v=123', host: '456' });

    render(<JoinRoomForm />, { wrapper });
    fireEvent.change(screen.getByPlaceholderText('Enter Room ID'), { target: { value: 'abc123' } });
    fireEvent.click(screen.getByText('Join Room'));

    await waitFor(() => {
      expect(roomService.joinRoom).toHaveBeenCalledWith({ roomId: 'abc123', userId: '123' });
      expect(mockNavigate).toHaveBeenCalledWith('/watch/abc123');
    });
  });

  it('displays error on empty Room ID', async () => {
    render(<JoinRoomForm />, { wrapper });
    fireEvent.click(screen.getByText('Join Room'));

    await waitFor(() => {
      expect(screen.getByText('Room ID is required.')).toBeInTheDocument();
    });
  });
});