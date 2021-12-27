import { httpClient } from '@api/client';
import { OptionQuestion } from '@api/models/survey';
import { AnswerService } from '@api/services/answers';
import { Grid } from '@chakra-ui/layout';
import { Dispatch, SetStateAction } from 'react';
import { OptionSingleChoice } from './single-choice.styles';

export interface SingleChoiceProps {
  options: OptionQuestion[];
  setResult: Dispatch<SetStateAction<number[]>>;
}

const SingleChoice = (props: SingleChoiceProps) => {
  const { options, setResult } = props;
  const answerService = new AnswerService(httpClient);

  const selectOption = async (id: number) => {
    await answerService.create({
      question_id: 853,
      answers_survey_id: 121,
      user_answer: 'student@gmail.com',
      option_ids: [id],
    });
    setResult([id]);
  };

  return (
    <Grid templateColumns="repeat(auto-fit, minmax(180px, 2fr))" gap={4}>
      {options &&
        options.map((option) => (
          <OptionSingleChoice
            key={option.id}
            onClick={() => selectOption(option.id)}
          >
            <span>{option.name}</span>
          </OptionSingleChoice>
        ))}
    </Grid>
  );
};

export default SingleChoice;
