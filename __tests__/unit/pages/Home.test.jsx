import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../../src/contexts/AuthContext';
import Home from '../../../src/pages/Home';

describe('Home Page', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);
  });

  it('renders welcome message and logo when not authenticated', () => {
    const wrapper = ({ children }) => (
      <AuthContext.Provider value={{ user: null, loading: false }}>
        <MemoryRouter>{children}</MemoryRouter>
      </AuthContext.Provider>
    );
    render(<Home />, { wrapper });
    expect(screen.getByText('Welcome to CineLove')).toBeInTheDocument();
    expect(screen.getByAltText('CineLove Logo')).toBeInTheDocument();
    expect(screen.getByText('Sign in with Google')).toBeInTheDocument();
  });

  it('renders navigation buttons when authenticated', () => {
    const wrapper = ({ children }) => (
      <AuthContext.Provider value={{ user: { uid: '123' }, loading: false }}>
        <MemoryRouter>{children}</MemoryRouter>
      </AuthContext.Provider>
    );
    render(<Home />, { wrapper });
    expect(screen.getByText('Create a Room')).toBeInTheDocument();
    expect(screen.getByText('Join a Room')).toBeInTheDocument();
  });

  it('navigates to create room on button click', () => {
    const wrapper = ({ children }) => (
      <AuthContext.Provider value={{ user: { uid: '123' }, loading: false }}>
        <MemoryRouter>{children}</MemoryRouter>
      </AuthContext.Provider>
    );
    render(<Home />, { wrapper });
    fireEvent.click(screen.getByText('Create a Room'));
    expect(mockNavigate).toHaveBeenCalledWith('/create');
  });
});