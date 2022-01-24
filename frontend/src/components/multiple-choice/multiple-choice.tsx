import { OptionQuestion } from '@api/models/survey';
import { Button, Flex, Text } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';

export interface Option extends OptionQuestion {
  selected?: boolean;
}

export interface MultipleChoiseProps {
  options: Option[];
  setResult: Dispatch<SetStateAction<number[]>>;
}

const MultipleChoise = (props: MultipleChoiseProps) => {
  const { options } = props;
  const [optionsState, setOptionsState] = useState<Option[]>(options);

  const toggle = (option: Option) => {
    const optionSelected = option;
    optionSelected.selected = !optionSelected.selected;
    const newOptions = [...options];
    setOptionsState(newOptions);
  };

  return (
    <div>
      {optionsState.map((option: Option) => (
        <Button key={option.id} onClick={() => toggle(option)}>
          <Flex>
            <Text>{option.name}</Text>
            {option.selected ? (
              <ImCheckboxUnchecked data-testid={`${option.id}-selected`} />
            ) : (
              <ImCheckboxChecked data-testid={`${option.id}-unselected`} />
            )}
          </Flex>
        </Button>
      ))}
    </div>
  );
};

export default MultipleChoise;
