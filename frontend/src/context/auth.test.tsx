import { Sidemenu } from '@components/sidemenu';
import { User } from 'api/models/user';
import { render, screen } from 'test-utils';
import { AuthProvider } from './auth';

const userMock: User = {
  id: 1,
  email: 'mock@user.com',
  phone: '+380991234567',
  role: {
    id: 1,
    role_type: 'student',
  },
};

const AllTheProviders = ({ children }) => (
  <AuthProvider>
    {children}
  </AuthProvider>
  );

const customRender = (ui, options) => {
  render(
    ui,
    {
      wrapper: (props) => (
        <AllTheProviders {...props} />
      ),
      ...options,
    },
  );
};

describe('AuthContext', () => {
  it('should be provider defined', () => {
    customRender(
      <span>test</span>,
      userMock,
    );
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
