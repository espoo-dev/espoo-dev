import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { HiOutlineCheck } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import {
  CorrectAnswer,
  AnswerFooter,
  CardReponse,
  QuestionTitle,
} from './answered-question.style';

interface AnswerdOption {
  id: number;
  name: string;
  correct: boolean;
}

export interface ResultAnswerProps {
  id: number;
  correct: boolean;
  name: string;
  answered_options: AnswerdOption[];
  options: {
    id: number;
    name: string;
    correct?: boolean;
  }[];
}

export const AsnweredQuestion = (props: ResultAnswerProps) => {
  const { correct, id, name, options, answered_options } = props;

  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);

  const getCorrectAnswersName = () => {
    const correctsNames = options
      .filter((option) => option.correct === true)
      .map((option) => option.name);

    setCorrectAnswers(correctsNames);
  };

  useEffect(() => {
    getCorrectAnswersName();
  }, []);

  return (
    <CardReponse key={id}>
      <QuestionTitle>
        <span>{name}</span>
      </QuestionTitle>
      <AnswerFooter>
        <Box display="flex" alignItems="center">
          {correct ? (
            <HiOutlineCheck color="green" data-testid="correct-icon" />
          ) : (
            <MdClose color="red" data-testid="incorrect-icon" />
          )}
          {answered_options.length &&
            answered_options.map((answerd_option) => (
              <span style={{ paddingLeft: '8px' }} key={answerd_option.name}>
                {answerd_option.name}
              </span>
            ))}
        </Box>
        {!correct ? (
          <CorrectAnswer>
            <span>Correct: </span>
            {correctAnswers.length &&
            correctAnswers.map((answer) => (
              <span style={{ paddingLeft: '8px' }} key={answer}>
                {answer}
              </span>
            ))}
          </CorrectAnswer>
        ) : null }
      </AnswerFooter>
    </CardReponse>
  );
};
