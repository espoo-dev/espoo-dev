import { AUTH_COOKIE } from 'consts';
import { useAuth } from '.';

describe('useAuth hook', () => {
  it('should return the token when called', () => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: AUTH_COOKIE + '=Bearer eyJhbGciOi',
    });

    const token = useAuth();
    expect(token).toBeDefined();
  });

  it('should return undefined when dont have token', () => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: '',
    });

    const token = useAuth();
    expect(token).toBeUndefined();
  });
});
