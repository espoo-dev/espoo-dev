import React, { useCallback, useEffect, useState } from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import { QuestionOption } from 'api/models/survey';

interface ExtendedOption extends QuestionOption {
  selected?: boolean;
}

interface SingleChoiceProps {
  options: QuestionOption[];
  name: string;
}

type StringOrNumber = string | number;

const { log } = console;

export const MultiChoice = (props: SingleChoiceProps) => {
  const { name } = props;
  const [values, setValues] = useState<StringOrNumber[]>([]);
  const [options, setOptions] = useState<ExtendedOption[]>([]);

  const handleChange = useCallback((option: ExtendedOption) => {
    log('option -> ', option);
    // const { id } = option;

    // setOptions((prev) =>
    //   prev.map((item) => ({
    //     ...item,
    //     selected: item.id === id,
    //   }))
    // );
  }, []);

  const getOptionBG = (option: ExtendedOption) => {
    if (option?.selected && option?.correct) {
      return 'green.100';
    }

    if (option?.selected && !option?.correct) {
      return 'red.100';
    }

    return 'white';
  };

  useEffect(() => {
    const { options: originalOptions } = props;

    setOptions(
      originalOptions.map((opt) => ({
        ...opt,
        selected: false,
      }))
    );
  }, []);

  useEffect(() => {
    if (options.some((opt) => opt.selected)) {
      const filteredValues = options
        .filter((opt) => opt.selected)
        .map((opt) => opt.id);

      setValues(filteredValues);
    }
  }, [options]);

  useEffect(() => {
    log('values :>> ', values);
  }, [values]);

  return (
    <VStack spacing="10px">
      <h1>teste da goma</h1>
      {options.map((item) => (
        <Box
          as="label"
          htmlFor={name}
          key={item?.id}
          rounded="md"
          bg={getOptionBG(item)}
          p={4}
          cursor="pointer"
          minW="200px"
          boxShadow="base"
          _hover={{
            boxShadow: 'md',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <Text color="black">{item?.name}</Text>
          <input
            type="checkbox"
            name={name}
            id={name}
            onChange={() => handleChange(item)}
            value={item?.id}
            checked={item?.selected}
            hidden
          />
        </Box>
      ))}
    </VStack>
  );
};
