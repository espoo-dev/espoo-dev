import { AUTH_COOKIE } from 'consts';
import { useAuth } from '.';

describe('useAuth hook test', () => {
  it('should return the token when called', () => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: AUTH_COOKIE + '=Bearer eyJhbGciOi',
    });

    const token = useAuth();
    expect(token).toBeDefined();
  });
});
