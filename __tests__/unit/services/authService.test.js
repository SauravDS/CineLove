import { signInWithGoogle, signOut } from '../../../src/services/authService';

jest.mock('firebase/auth', () => ({
  GoogleAuthProvider: jest.fn(() => ({ credential: jest.fn() })),
  signInWithPopup: jest.fn(() => Promise.resolve({ user: { uid: '123', displayName: 'Test User' } })),
  signOut: jest.fn(() => Promise.resolve()),
}));

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('signInWithGoogle resolves with user data', async () => {
    const user = await signInWithGoogle();
    expect(user).toEqual({ uid: '123', displayName: 'Test User' });
  });

  it('signOut resolves successfully', async () => {
    await expect(signOut()).resolves.toBeUndefined();
  });
});