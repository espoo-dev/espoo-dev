import { Sidemenu } from '@components/sidemenu';
import { User } from 'api/models/user';
import { render, screen } from 'test-utils';
import { AuthContext } from './auth';

const checkToken = jest.fn();
const token = 'token';

const userMock: User = {
  id: 1,
  email: 'mock@user.com',
  phone: '+380991234567',
  role: {
    id: 1,
    role_type: 'student',
  },
};

describe('AuthContext', () => {
  it('should be defined', () => {
    render(
      <AuthContext.Provider
        value={{
          checkToken,
          isAuthenticated: !!token,
          user: userMock,
          login: jest.fn(),
          loading: false,
          logout: jest.fn(),
          register: jest.fn(),
        }}
      />
    );
    render(<Sidemenu />);
    expect(screen.getByTestId('logout_button')).toBeInTheDocument();
  });
});
