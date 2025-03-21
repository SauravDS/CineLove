import { render, screen } from '@testing-library/react';
import UserList from '../../../src/components/Chat/UserList';

describe('UserList Component', () => {
  const mockUsers = [
    { uid: '123', displayName: 'User1' },
    { uid: '456', displayName: 'User2' },
  ];

  it('renders list of users', () => {
    render(<UserList users={mockUsers} />);
    expect(screen.getByText('Online Users')).toBeInTheDocument();
    expect(screen.getByText('User1')).toBeInTheDocument();
    expect(screen.getByText('User2')).toBeInTheDocument();
  });

  it('displays empty state when no users', () => {
    render(<UserList users={[]} />);
    expect(screen.getByText('Online Users')).toBeInTheDocument();
    expect(screen.getByText('No users online')).toBeInTheDocument();
  });

  it('applies correct styling to list items', () => {
    render(<UserList users={mockUsers} />);
    const userItems = screen.getAllByRole('listitem');
    expect(userItems).toHaveLength(2);
    userItems.forEach((item) => {
      expect(item).toHaveClass('text-gray-700');
    });
  });
});