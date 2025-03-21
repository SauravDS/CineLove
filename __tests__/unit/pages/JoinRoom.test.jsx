import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../../src/contexts/AuthContext';
import JoinRoom from '../../../src/pages/JoinRoom';

describe('JoinRoom Page', () => {
  const mockUser = { uid: '123', displayName: 'Test User' };

  const wrapper = ({ children }) => (
    <AuthContext.Provider value={{ user: mockUser, loading: false }}>
      <MemoryRouter>{children}</MemoryRouter>
    </AuthContext.Provider>
  );

  it('renders page title and JoinRoomForm', () => {
    render(<JoinRoom />, { wrapper });
    expect(screen.getByText('Join a Room')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Room ID')).toBeInTheDocument();
    expect(screen.getByText('Join Room')).toBeInTheDocument();
  });

  it('does not render when user is not authenticated', () => {
    const noAuthWrapper = ({ children }) => (
      <AuthContext.Provider value={{ user: null, loading: false }}>
        <MemoryRouter>{children}</MemoryRouter>
      </AuthContext.Provider>
    );
    render(<JoinRoom />, { wrapper: noAuthWrapper });
    expect(screen.queryByText('Join a Room')).not.toBeInTheDocument();
  });
});