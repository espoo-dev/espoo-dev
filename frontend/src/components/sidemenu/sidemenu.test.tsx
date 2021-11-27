import { render, screen } from '@testing-library/react';
import { Sidemenu } from '.';

describe('Sidemenu', () => {
  it('should check system name', () => {
    render(<Sidemenu />);
    expect(screen.getByText('Espoolingo')).toBeInTheDocument();
  });

  it('should show Surveys menu item', () => {
    render(<Sidemenu />);
    expect(screen.getByText('Surveys')).toBeInTheDocument();
  });

  it('should show a logout button', () => {
    render(<Sidemenu />);
    expect(screen.getByTestId('logout-button')).toBeInTheDocument();
  });
});
