import { render, screen } from '@testing-library/react';
import LoadingIndicator from '../../../src/components/UI/LoadingIndicator';

describe('LoadingIndicator Component', () => {
  it('renders spinner when active', () => {
    render(<LoadingIndicator />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('animate-spin');
  });
});