import { AuthContext, AuthContextProps } from 'context/auth';
import React from 'react';
import { render, screen, act, fireEvent } from 'test-utils';
import { Navbar } from './navbar';

describe('Navbar', () => {
  it('should render the component', () => {
    const { getByText } = render(<Navbar />);
    const link = getByText('Home');
    expect(link).toBeInTheDocument();
  });

  it('should call the function when clicking in logout', () => {
    const logoutMock = jest.fn();

    act(() => {
      render(
        <AuthContext.Provider value={{ logout: logoutMock } as unknown}>
          <Navbar />
        </AuthContext.Provider>
      );
    });

    const logoutBtn = screen.getByTestId('logout_btn');

    fireEvent.click(logoutBtn);

    expect(logoutMock).toHaveBeenCalledTimes(1);
  });
});
