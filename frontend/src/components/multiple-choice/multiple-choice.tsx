import { OptionQuestion } from '@api/models/survey';
import { Button, Grid, Text } from '@chakra-ui/react';
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
  const { options, setResult } = props;
  const [optionsState, setOptionsState] = useState<Option[]>(options);

  const toggle = (option: Option) => {
    const optionSelected = option;
    optionSelected.selected = !optionSelected.selected;
    const newOptions = [...options];
    setOptionsState(newOptions);
    setResult(getIdOptionsSelecteds());
  };

  const getIdOptionsSelecteds = (): number[] =>
    optionsState.filter((option) => option.selected).map((option) => option.id);
  return (
    <Grid templateColumns="repeat(auto-fit, minmax(180px, 2fr))" gap={4}>
      {optionsState &&
        optionsState.map((option: Option) => (
          <Button
            color={option.selected ? 'green.500' : 'gray.500'}
            bg={option.selected ? 'green.100' : 'gray.100'}
            key={option.id}
            onClick={() => toggle(option)}
            display="flex"
            justifyContent="space-between"
            style={{
              boxShadow: 'none',
            }}
          >
            <Text>{option.name}</Text>
            {option.selected ? (
              <ImCheckboxChecked data-testid={`${option.id}-selected`} />
            ) : (
              <ImCheckboxUnchecked data-testid={`${option.id}-unselected`} />
            )}
          </Button>
        ))}
    </Grid>
  );
};

export default MultipleChoise;
