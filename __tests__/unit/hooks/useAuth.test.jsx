import { renderHook, act } from '@testing-library/react';
import { AuthContext } from '../../../src/contexts/AuthContext';
import useAuth from '../../../src/hooks/useAuth';

describe('useAuth Hook', () => {
  it('returns context values when used within AuthProvider', () => {
    const mockUser = { uid: '123', displayName: 'Test User' };
    const wrapper = ({ children }) => (
      <AuthContext.Provider value={{ user: mockUser, loading: false, signInWithGoogle: jest.fn(), signOut: jest.fn() }}>
        {children}
      </AuthContext.Provider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.loading).toBe(false);
    expect(typeof result.current.signInWithGoogle).toBe('function');
    expect(typeof result.current.signOut).toBe('function');
  });

  it('throws an error when used outside AuthProvider', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.error).toEqual(new Error('useAuth must be used within an AuthProvider'));
  });
});