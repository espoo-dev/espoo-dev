import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { Sidemenu } from '.';

jest.mock('../../api/client', () => ({
  httpClient: {
    post: jest.fn(),
  },
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

const mockRouter = {
  replace: jest.fn()
};
(useRouter as jest.Mock).mockReturnValue(mockRouter);

describe('Sidemenu', () => {
  it('should check system name', () => {
    render(<Sidemenu />);
    expect(screen.getByText('Espoolingo')).toBeInTheDocument();
  });

  it('should have "Home" menu link', () => {
    render(<Sidemenu />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('should have "Trails" menu link', () => {
    render(<Sidemenu />);
    expect(screen.getByText('Trails')).toBeInTheDocument();
  });

  it('should redirect to main page when logo is clicked', async () => {
    render(<Sidemenu />);
    const logo = screen.getByTestId('logo-img');
    fireEvent.click(logo);

    expect(mockRouter.replace).toHaveBeenCalledWith('/surveys');
  });

  it('should have a logout button', async () => {
    render(<Sidemenu />);

    const logoutBtn = await screen.findByTestId('logout_button');

    expect(logoutBtn).toBeInTheDocument();
  });
});
