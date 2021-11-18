import { useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';

const defaultProps = {
  isRequired: true,
};

export const AppRadioButton = ({
  options,
  keyAttrs,
  value,
  label,
  name,
  text,
  isRequired,
}) => {
  const [radioValue, setRadioValue] = useState('');

  const inputRefs = useRef([]);
  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs,
      getValue: (refs) => refs.current.find((input) => input?.checked)?.value,
      setValue: (refs, id) => {
        const inputRef = refs.current.find((ref) => ref.id === id);
        if (inputRef) inputRef.checked = true;
      },
      clearValue: (refs) => {
        const inputRef = refs.current.find((ref) => ref.checked === true);
        if (inputRef) inputRef.checked = false;
      },
    });
  }, [fieldName, registerField]);

  const setRef = (elRef, index) => {
    inputRefs.current[index] = elRef;
  };

  return (
    <FormControl isRequired={isRequired} id={name}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <RadioGroup name={name} onChange={setRadioValue} value={radioValue}>
        <Stack direction="row">
          {options.map((option, index) => (
            <Radio
              key={option[keyAttrs]}
              ref={(elRef) => setRef(elRef, index)}
              value={`${option[value]}`}
            >
              {option[text]}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </FormControl>
  );
};

AppRadioButton.defaultProps = defaultProps;
