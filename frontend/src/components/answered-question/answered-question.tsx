import { Box } from '@chakra-ui/react';
import { HiOutlineCheck } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import {
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
}

const AsnweredQuestion = (props: ResultAnswerProps) => {
  const { id, correct, answered_options } = props;
  const { name } = props;
  const answered = answered_options[0].name;

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
          <span style={{ paddingLeft: '8px' }}>{answered}</span>
        </Box>
      </AnswerFooter>
    </CardReponse>
  );
};

export default AsnweredQuestion;
