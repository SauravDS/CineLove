import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../../src/contexts/AuthContext';
import CreateRoom from '../../../src/pages/CreateRoom';

describe('CreateRoom Page', () => {
  const mockUser = { uid: '123', displayName: 'Test User' };

  const wrapper = ({ children }) => (
    <AuthContext.Provider value={{ user: mockUser, loading: false }}>
      <MemoryRouter>{children}</MemoryRouter>
    </AuthContext.Provider>
  );

  it('renders page title and CreateRoomForm', () => {
    render(<CreateRoom />, { wrapper });
    expect(screen.getByText('Create a Room')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter YouTube or Vimeo URL')).toBeInTheDocument();
    expect(screen.getByText('Create Room')).toBeInTheDocument();
  });

  it('does not render when user is not authenticated', () => {
    const noAuthWrapper = ({ children }) => (
      <AuthContext.Provider value={{ user: null, loading: false }}>
        <MemoryRouter>{children}</MemoryRouter>
      </AuthContext.Provider>
    );
    render(<CreateRoom />, { wrapper: noAuthWrapper });
    expect(screen.queryByText('Create a Room')).not.toBeInTheDocument();
  });
});