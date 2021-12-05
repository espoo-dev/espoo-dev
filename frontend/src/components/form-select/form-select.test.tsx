import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorOption } from 'react-hook-form';
import { FormSelect, FormSelectProps } from './form-select';

const mockOptions = [
  { value: '', label: 'Select animal' },
  { value: '1', label: 'Dog' },
  { value: '2', label: 'Cat' },
];

const mockRegister = jest.fn();
const mockErros = jest.fn() as ErrorOption;

const defaultProps: FormSelectProps = {
  register: mockRegister,
  errors: mockErros,
  keyRegister: 'animal',
  label: 'Animal',
  options: mockOptions,
  validations: {
    required: 'Animal is requerid!',
  },
};

describe('FormSelect', () => {
  it('should render component', () => {
    const rendered = render(<FormSelect {...defaultProps} />);
    expect(rendered.getByTestId(defaultProps.keyRegister)).toBeTruthy();
  });

  it('should show all options', () => {
    render(<FormSelect {...defaultProps} />);
    mockOptions.map((option) => {
      expect(screen.getByText(option.label)).toBeTruthy();
    });
  });

  it('should select a option', () => {
    render(<FormSelect {...defaultProps} />);
    const option = mockOptions[1];
    const select = screen.getByTestId(defaultProps.keyRegister);
    fireEvent.change(select, { target: { value: option.value } });
    expect(mockRegister).toHaveBeenCalled();
  });
});
