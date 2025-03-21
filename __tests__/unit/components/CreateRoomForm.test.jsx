import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../../src/contexts/AuthContext';
import CreateRoomForm from '../../../src/components/Forms/CreateRoomForm';
import * as roomService from '../../../src/services/roomService';

jest.mock('../../../src/services/roomService');

describe('CreateRoomForm Component', () => {
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
    render(<CreateRoomForm />, { wrapper });
    expect(screen.getByPlaceholderText('Enter YouTube or Vimeo URL')).toBeInTheDocument();
    expect(screen.getByText('Create Room')).toBeInTheDocument();
  });

  it('submits form and navigates on success', async () => {
    roomService.createRoom.mockResolvedValue({ roomId: 'abc123', videoUrl: 'https://youtube.com/watch?v=123', host: '123' });

    render(<CreateRoomForm />, { wrapper });
    fireEvent.change(screen.getByPlaceholderText('Enter YouTube or Vimeo URL'), {
      target: { value: 'https://youtube.com/watch?v=123' },
    });
    fireEvent.click(screen.getByText('Create Room'));

    await waitFor(() => {
      expect(roomService.createRoom).toHaveBeenCalledWith({ videoUrl: 'https://youtube.com/watch?v=123', host: '123' });
      expect(mockNavigate).toHaveBeenCalledWith('/watch/abc123');
    });
  });

  it('displays error on invalid URL', async () => {
    render(<CreateRoomForm />, { wrapper });
    fireEvent.change(screen.getByPlaceholderText('Enter YouTube or Vimeo URL'), {
      target: { value: 'invalid-url' },
    });
    fireEvent.click(screen.getByText('Create Room'));

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid YouTube or Vimeo URL.')).toBeInTheDocument();
    });
  });
});