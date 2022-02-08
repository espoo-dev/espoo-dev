import { render, screen } from 'test-utils';
import { Button, FlexColumn } from './utils';

describe('UtilsStyle', () => {
  it('should render button with full round', () => {
    render(<Button round="full" data-testid="btn-full" />);
    expect(screen.getByTestId('btn-full')).toHaveStyle('border-radius: 30px');
  });

  it('should render button without full round', () => {
    render(<Button data-testid="btn-full" />);
    expect(screen.getByTestId('btn-full')).toHaveStyle('border-radius: 5px');
  });

  it('should render flex column with options params', () => {
    render(<FlexColumn data-testid="flex-column" aligment="center" />);
    expect(screen.getByTestId('flex-column')).toHaveStyle(
      'align-items: center'
    );
  });
});
