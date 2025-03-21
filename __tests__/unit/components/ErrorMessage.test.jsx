import { render, screen } from '@testing-library/react';
import ErrorMessage from '../../../src/components/Error/ErrorMessage';

describe('ErrorMessage Component', () => {
  it('renders with provided message', () => {
    render(<ErrorMessage message="Something went wrong!" />);
    const errorElement = screen.getByText('Something went wrong!');
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveClass('text-red-500');
  });

  it('does not render when message is empty', () => {
    render(<ErrorMessage message="" />);
    expect(screen.queryByText(/.+/)).not.toBeInTheDocument();
  });
});