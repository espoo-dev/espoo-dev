import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { Select, SelectProps } from '@chakra-ui/select';
import { SelectHTMLAttributes } from 'react';
import { FieldValues, FormState, UseFormRegister } from 'react-hook-form';

export interface FormSelectProps {
  label?: string;
  keyRegister: string;
  options: {
    value: string;
    label: string;
  }[];
  errors: any;
  register: UseFormRegister<FieldValues>;
  validations?: any;
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
