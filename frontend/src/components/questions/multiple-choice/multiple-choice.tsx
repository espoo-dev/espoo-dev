import { OptionQuestion } from '@api/models/survey';
import { Text } from '@chakra-ui/react';
import { useUpdateEffect } from '@hooks/useUpdateEffect';
import { Dispatch, SetStateAction, useState } from 'react';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import {
  MultipleChoiceGrid,
  MultipleChoiceOption,
} from './multiple-choice.styles';

export interface Option extends OptionQuestion {
  selected?: boolean;
}

export interface MultipleChoiceProps {
  options: Option[];
  setResult: Dispatch<SetStateAction<number[]>>;
}

export const MultipleChoice = (props: MultipleChoiceProps) => {
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

  useUpdateEffect(() => {
    setOptionsState(options);
  }, [options]);

  return (
    <MultipleChoiceGrid>
      {optionsState &&
        optionsState.map((option: Option) => (
          <MultipleChoiceOption
            key={option.id}
            onClick={() => toggle(option)}
            selected={option.selected}
          >
            {option.selected ? (
              <ImCheckboxChecked data-testid={`${option.id}-selected`} />
            ) : (
              <ImCheckboxUnchecked data-testid={`${option.id}-unselected`} />
            )}
            <Text>{option.name}</Text>
          </MultipleChoiceOption>
        ))}
    </MultipleChoiceGrid>
  );
};
