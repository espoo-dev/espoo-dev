import React, { useState } from 'react';
import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { QuestionOption } from '@api/models/survey';
import randomId from '@utils/random-id';

interface SingleChoiceProps {
  options: QuestionOption[];
}

export const SingleChoice = (props: SingleChoiceProps) => {
  const { options } = props;
  const [value, setValue] = useState(null);

  return (
    <RadioGroup onChange={setValue} value={value}>
      <Stack direction="column">
        {options.map((option) => (
          <Radio key={randomId()} value={option.id}>
            {option?.name}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  );
};
