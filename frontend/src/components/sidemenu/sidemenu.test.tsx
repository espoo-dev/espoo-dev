import { render, screen } from '@testing-library/react';
import { Sidemenu } from '.';

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

  it('should have a logout button', () => {
    render(<Sidemenu />);
    expect(screen.getByTestId('logout-button')).toBeInTheDocument();
  });
});
