import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CopyButton from '../../../src/components/UI/CopyButton';

describe('CopyButton Component', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(),
      },
    });
  });

  it('renders with initial text', () => {
    render(<CopyButton textToCopy="test123" />);
    const button = screen.getByText('Copy Room ID');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-rose-pink');
  });

  it('copies text to clipboard and updates text', async () => {
    render(<CopyButton textToCopy="test123" />);
    const button = screen.getByText('Copy Room ID');
    fireEvent.click(button);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test123');
      expect(screen.getByText('Copied!')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Copy Room ID')).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});