import { Button } from '@chakra-ui/button';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { FormSelect, FormSelectProps } from './form-select';

const mockOptions = [
  { value: '', label: 'Select animal' },
  { value: '1', label: 'Dog' },
  { value: '2', label: 'Cat' },
];

const mockRegister = jest.fn();
const mockErros = jest.fn();
const handleSubmit = jest.fn();

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

const onSubmit = (values) => {
  console.log(values);
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

  it('should show a message of validation when on submit without animal selected', async () => {
    render(
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSelect {...defaultProps} />
        <Button type="submit">Submit</Button>
      </form>
    );

    fireEvent.submit(screen.getByRole('button'));
    expect(
      screen.queryAllByAltText(defaultProps.validations.required)
    ).toHaveLength(1);

    screen.debug();
  });
});
