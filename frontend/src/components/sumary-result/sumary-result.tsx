import { Box } from '@chakra-ui/react';
import { HiOutlineCheck } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { useState } from 'react';
import { AnswerSurveyReceive } from '@api/models/answer_survey';
import { Result, ResultContainer, ResultText } from './sumary-result.styles';

const SumaryResult = (props: AnswerSurveyReceive) => {
  const { questions } = props;

  const countResult = () => {
    let correct = 0;
    let incorrect = 0;
    questions &&
      questions.length &&
      questions.forEach((question) => {
        question.correct ? correct++ : incorrect++;
      });

    return { correct, incorrect };
  };

  const [result, setResult] = useState({
    correct: countResult().correct,
    incorrect: countResult().incorrect,
  });

  return (
    <ResultContainer>
      <Box>
        <h1>Finish!</h1>
      </Box>
      <Box>
        <h2 style={{ fontWeight: 'bold' }}>
          <Result>
            <HiOutlineCheck color="green" />
            <span>{result.correct} correct</span>
            <MdClose color="red" />
            <span>{result.incorrect} incorrect</span>
          </Result>
        </h2>
      </Box>
      <Box mt={16}>
        {questions &&
          questions.length &&
          questions.map((question) => {
            return (
              <Box
                key={question.id}
                display={'flex'}
                alignItems={'center'}
                mt={4}
              >
                {question.correct ? (
                  <HiOutlineCheck color="green" />
                ) : (
                  <MdClose color="red" />
                )}
                <ResultText>{question.name}</ResultText>
              </Box>
            );
          })}
      </Box>
    </ResultContainer>
  );
};

export default SumaryResult;
