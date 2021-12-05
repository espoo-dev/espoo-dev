import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { Select } from '@chakra-ui/select';
import { ErrorOption, FieldValues, UseFormRegister } from 'react-hook-form';

export interface FormSelectProps {
  label?: string;
  keyRegister: string;
  options: {
    value: string;
    label: string;
  }[];
  errors: ErrorOption;
  register: UseFormRegister<FieldValues>;
  validations?: FieldValues;
}

export const FormSelect = (props: FormSelectProps) => {
  const { label, options, errors, register, keyRegister, validations } = props;

  return (
    <FormControl isInvalid={errors[keyRegister]}>
      <FormLabel htmlFor={keyRegister}>{label}</FormLabel>
      <Select {...register(keyRegister, validations)} data-testid={keyRegister}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      <FormErrorMessage>{errors[keyRegister]?.message}</FormErrorMessage>
    </FormControl>
  );
};
