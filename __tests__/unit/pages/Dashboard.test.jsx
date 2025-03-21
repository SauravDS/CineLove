import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../../src/contexts/AuthContext';
import Dashboard from '../../../src/pages/Dashboard';

describe('Dashboard Page', () => {
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

  it('renders user greeting and navigation options', () => {
    render(<Dashboard />, { wrapper });
    expect(screen.getByText('Welcome, Test User!')).toBeInTheDocument();
    expect(screen.getByText('Create a Room')).toBeInTheDocument();
    expect(screen.getByText('Join a Room')).toBeInTheDocument();
  });

  it('navigates to create room on button click', () => {
    render(<Dashboard />, { wrapper });
    fireEvent.click(screen.getByText('Create a Room'));
    expect(mockNavigate).toHaveBeenCalledWith('/create');
  });

  it('navigates to join room on button click', () => {
    render(<Dashboard />, { wrapper });
    fireEvent.click(screen.getByText('Join a Room'));
    expect(mockNavigate).toHaveBeenCalledWith('/join');
  });
});