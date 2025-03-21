import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../../src/contexts/AuthContext';
import Header from '../../../src/components/Layout/Header';

describe('Header Component', () => {
  const mockUser = { uid: '123', displayName: 'Test User' };
  const mockSignOut = jest.fn();
  const mockNavigate = jest.fn();

  const wrapper = ({ children }) => (
    <AuthContext.Provider value={{ user: mockUser, signOut: mockSignOut, loading: false }}>
      <MemoryRouter>{children}</MemoryRouter>
    </AuthContext.Provider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);
  });

  it('renders logo and navigation for authenticated user', () => {
    render(<Header />, { wrapper });
    expect(screen.getByAltText('CineLove Logo')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  it('navigates to dashboard on link click', () => {
    render(<Header />, { wrapper });
    fireEvent.click(screen.getByText('Dashboard'));
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('calls signOut on button click', () => {
    render(<Header />, { wrapper });
    fireEvent.click(screen.getByText('Sign Out'));
    expect(mockSignOut).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('renders only logo when not authenticated', () => {
    const noAuthWrapper = ({ children }) => (
      <AuthContext.Provider value={{ user: null, signOut: mockSignOut, loading: false }}>
        <MemoryRouter>{children}</MemoryRouter>
      </AuthContext.Provider>
    );
    render(<Header />, { wrapper: noAuthWrapper });
    expect(screen.getByAltText('CineLove Logo')).toBeInTheDocument();
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign Out')).not.toBeInTheDocument();
  });
});