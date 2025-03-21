import { render, screen, fireEvent } from '@testing-library/react';
import EmojiPicker from '../../../src/components/Chat/EmojiPicker';

describe('EmojiPicker Component', () => {
  const mockOnEmojiSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders emoji button', () => {
    render(<EmojiPicker onEmojiSelect={mockOnEmojiSelect} />);
    const button = screen.getByLabelText('Pick an emoji');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('text-gray-700');
  });

  it('toggles emoji picker visibility on button click', () => {
    render(<EmojiPicker onEmojiSelect={mockOnEmojiSelect} />);
    const button = screen.getByLabelText('Pick an emoji');
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onEmojiSelect when an emoji is clicked', () => {
    render(<EmojiPicker onEmojiSelect={mockOnEmojiSelect} />);
    fireEvent.click(screen.getByLabelText('Pick an emoji'));
    
    const smiley = screen.getByText('😊');
    fireEvent.click(smiley);
    expect(mockOnEmojiSelect).toHaveBeenCalledWith('😊');
  });
});