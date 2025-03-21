import { render, screen, fireEvent } from '@testing-library/react';
import { AuthContext } from '../../../src/contexts/AuthContext';
import GoogleSignInButton from '../../../src/components/Auth/GoogleSignInButton';

describe('GoogleSignInButton Component', () => {
  const mockSignInWithGoogle = jest.fn();
  const wrapper = ({ children }) => (
    <AuthContext.Provider value={{ signInWithGoogle: mockSignInWithGoogle, loading: false }}>
      {children}
    </AuthContext.Provider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders button with correct text', () => {
    render(<GoogleSignInButton />, { wrapper });
    const button = screen.getByText('Sign in with Google');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-deep-rose');
  });

  it('calls signInWithGoogle on click', () => {
    render(<GoogleSignInButton />, { wrapper });
    const button = screen.getByText('Sign in with Google');
    fireEvent.click(button);
    expect(mockSignInWithGoogle).toHaveBeenCalledTimes(1);
  });

  it('is disabled when loading', () => {
    const loadingWrapper = ({ children }) => (
      <AuthContext.Provider value={{ signInWithGoogle: mockSignInWithGoogle, loading: true }}>
        {children}
      </AuthContext.Provider>
    );
    render(<GoogleSignInButton />, { wrapper: loadingWrapper });
    const button = screen.getByText('Sign in with Google');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50');
  });
});