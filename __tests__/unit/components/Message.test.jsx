import { render, screen } from '@testing-library/react';
import Message from '../../../src/components/Chat/Message';
import { formatChatTime } from '../../../src/utils/helpers';

jest.mock('../../../src/utils/helpers', () => ({
  formatChatTime: jest.fn((timestamp) => new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
}));

describe('Message Component', () => {
  const mockMessage = {
    text: 'Hello, world!',
    sender: { uid: '123', displayName: 'Test User' },
    timestamp: 1677654321000,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders message with sender and formatted time', () => {
    render(<Message message={mockMessage} />);
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(formatChatTime).toHaveBeenCalledWith(1677654321000);
    expect(screen.getByText('03:45 PM')).toBeInTheDocument();
  });

  it('applies correct styling based on sender', () => {
    render(<Message message={mockMessage} currentUser={{ uid: '123' }} />);
    const messageElement = screen.getByText('Hello, world!');
    expect(messageElement).toHaveClass('bg-rose-pink');
    
    render(<Message message={mockMessage} currentUser={{ uid: '456' }} />);
    const otherMessageElement = screen.getByText('Hello, world!');
    expect(otherMessageElement).toHaveClass('bg-light-lavender');
  });
}); 