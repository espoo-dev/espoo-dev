import { httpClient } from '@api/client';
import { OptionQuestion } from '@api/models/survey';
import { AnswerService } from '@api/services/answers';
import { Dispatch, SetStateAction } from 'react';
import { GridSingleChoice, OptionSingleChoice } from './single-choice.styles';

export interface SingleChoiceProps {
  options: OptionQuestion[];
  setResult: Dispatch<SetStateAction<number[]>>;
  current_answers_survey_id?: number;
  question_id?: number;
}

const SingleChoice = (props: SingleChoiceProps) => {
  const { options, setResult, current_answers_survey_id, question_id } = props;
  const answerService = new AnswerService(httpClient);

  const selectOption = async (id: number) => {
    if (current_answers_survey_id && question_id) {
      await answerService.create({
        question_id,
        answers_survey_id: current_answers_survey_id,
        option_ids: [id],
      });
    }

    setResult([id]);
  };

  return (
    <GridSingleChoice>
      {options &&
        options.map((option) => (
          <OptionSingleChoice
            key={option.id}
            onClick={() => selectOption(option.id)}
          >
            <span>{option.name}</span>
          </OptionSingleChoice>
        ))}
    </GridSingleChoice>
  );
};

export default SingleChoice;
