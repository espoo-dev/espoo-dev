import React, { useCallback, useEffect, useState } from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';
import { QuestionOption } from '@api/models/survey';

interface ExtendedOption extends QuestionOption {
  selected?: boolean;
}

interface SingleChoiceProps {
  /**
   * options to render
   */
  options: QuestionOption[];
}

type StringOrNumber = string | number;

export const MultiChoice = (props: SingleChoiceProps) => {
  const [values, setValues] = useState<StringOrNumber[]>([]);
  const [options, setOptions] = useState<ExtendedOption[]>([]);

  const handleChange = useCallback((option: ExtendedOption) => {
    const { id } = option;

    setOptions((prev) =>
      prev.map((item) => {
        const itemCopy = { ...item };

        if (itemCopy.id === id) {
          itemCopy.selected = !itemCopy.selected;
        }

        return itemCopy;
      })
    );
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
    console.log('values :>> ', values);
  }, [values]);

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      w="full"
      flexWrap="wrap"
      style={{ gap: '10px' }}
    >
      {options.map((item) => (
        <Button
          onClick={() => handleChange(item)}
          type="button"
          rounded="md"
          bg={getOptionBG(item)}
          p={4}
          key={item?.id}
          flex="1"
          minW="300px"
          boxShadow="base"
          _hover={{
            boxShadow: 'md',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <Text color="black">{item?.name}</Text>
        </Button>
      ))}
    </Flex>
  );
};
