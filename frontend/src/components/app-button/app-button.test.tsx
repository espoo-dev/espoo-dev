import React from 'react';
import { render, fireEvent, screen } from 'test-utils';
import { FaTrash } from 'react-icons/fa';
import { HiArrowLeft } from 'react-icons/hi';
import { AppButton } from './app-button';

describe('App Button', () => {
  it('should create the button with the given text', () => {
    const text = 'confirm';
    render(<AppButton text={text} />);
    const element = screen.getByText(text);

    expect(element).toBeTruthy();
  });

  it('should call the function when clicked', () => {
    const callback = jest.fn();
    render(<AppButton text="confirm" onClick={callback} />);

    fireEvent.click(screen.getByText('confirm'));

    expect(callback).toBeCalledTimes(1);
  });

  it('should show a loading icon when loading prop is true', () => {
    const { getByTestId } = render(<AppButton text="confirm" loading />);

    expect(getByTestId('loading_icon')).toBeInTheDocument();
  });

  it('should disable the button when disabled prop is true', () => {
    const { getByRole } = render(<AppButton text="confirm" disabled />);
    const button = getByRole('button');

    expect(button).toBeDisabled();
  });

  it('should display an icon on the button', () => {
    const icon = <FaTrash data-testid="icon" />;
    const { getByTestId } = render(<AppButton icon={icon} text="delete" />);

    expect(getByTestId('icon')).toBeInTheDocument();
  });

  it('should show tooltip message', async () => {
    const tooltip = 'Back to list';
    const rendered = render(
      <AppButton
        id="btn-back"
        data-testid="btn-back"
        tooltip={tooltip}
        icon={<HiArrowLeft />}
      />
    );
    fireEvent.mouseOver(rendered.getByTestId('btn-back'));

    expect(await rendered.findByText(tooltip)).toBeInTheDocument();
  });
});
