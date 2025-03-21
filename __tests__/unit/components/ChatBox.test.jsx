import { render, screen, fireEvent } from '@testing-library/react';
import ChatBox from '../../../src/components/Chat/ChatBox';

describe('ChatBox Component', () => {
  const mockSocket = {
    on: jest.fn(),
    emit: jest.fn(),
  };
  const mockUser = { uid: '123', displayName: 'Test User' };
  const roomId = 'test123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders chat input and user list', () => {
    render(<ChatBox socket={mockSocket} roomId={roomId} user={mockUser} />);
    expect(screen.getByPlaceholderText('Type a message...')).toBeInTheDocument();
    expect(screen.getByText('Online Users')).toBeInTheDocument();
  });

  it('sends a message on form submit', () => {
    render(<ChatBox socket={mockSocket} roomId={roomId} user={mockUser} />);
    const input = screen.getByPlaceholderText('Type a message...');
    fireEvent.change(input, { target: { value: 'Hello!' } });
    fireEvent.submit(screen.getByRole('form'));

    expect(mockSocket.emit).toHaveBeenCalledWith('sendMessage', {
      roomId,
      message: expect.objectContaining({
        text: 'Hello!',
        sender: mockUser,
      }),
    });
    expect(input).toHaveValue('');
  });

  it('displays received messages', () => {
    render(<ChatBox socket={mockSocket} roomId={roomId} user={mockUser} />);
    const message = { text: 'Hi there!', sender: { uid: '456', displayName: 'Other User' }, timestamp: Date.now() };

    fireEvent(mockSocket, new CustomEvent('message', { detail: message }));
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
  });
});