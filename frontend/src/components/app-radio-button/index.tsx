import { useState } from 'react';
import { FormControl, FormLabel, Radio, RadioGroup, Stack } from '@chakra-ui/react'

const defaultProps = {};

export const AppRadioButton = ({options, key, value, label, name, text }) => {
  const [radioValue, setRadioValue] = useState('');

  return (
    <FormControl
      isRequired
      id={name}
    >
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <RadioGroup
        name={name}
        onChange={setRadioValue}
        value={radioValue}
      >
        <Stack direction="row">
          {options.map((option) => (
            <Radio key={option[key]} value={`${option[value]}`}>{option[text]}</Radio>
          ))}
        </Stack>
      </RadioGroup>
    </FormControl>
  )
}

AppRadioButton.defaultProps = defaultProps;
