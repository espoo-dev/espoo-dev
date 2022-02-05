import { OptionQuestion } from '@api/models/survey';
import { useUpdateEffect } from '@hooks/useUpdateEffect';
import { useEffect, useState } from 'react';
import { GridSingleChoice, OptionSingleChoice } from './single-choice.styles';

interface ExtendedOption extends OptionQuestion {
  selected?: boolean;
}

export interface SingleChoiceProps {
  options: ExtendedOption[];
  setResult(value: number[]): void;
}

export const SingleChoice = (props: SingleChoiceProps) => {
  const { options: originalOptions, setResult } = props;
  const [options, setOptions] = useState<ExtendedOption[]>(originalOptions);

  const selectOption = (id: number) => {
    setOptions((prev) =>
      prev.map((option) => ({
        ...option,
        selected: option.selected ? false : option.id === id,
      }))
    );
  };

  useEffect(() => {
    const selectedOption = options.find((opt) => opt.selected);

    if (selectedOption) {
      setResult([selectedOption.id]);
    } else {
      setResult(null);
    }
  }, [options]);

  useUpdateEffect(() => {
    setOptions(originalOptions);
  }, [originalOptions]);

  return (
    <GridSingleChoice>
      {options &&
        options.map((option) => (
          <OptionSingleChoice
            data-testid={`single_choice_option_${option.id}`}
            aria-selected={option.selected}
            key={option.id}
            onClick={() => selectOption(option.id)}
            role="option"
            selected={option.selected}
          >
            <span>{option.name}</span>
          </OptionSingleChoice>
        ))}
    </GridSingleChoice>
  );
};
