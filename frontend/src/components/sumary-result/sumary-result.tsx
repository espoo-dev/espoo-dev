import { Box } from '@chakra-ui/react';
import { HiOutlineCheck } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { AnswerSurveyReceive } from '@api/models/answer_survey';
import { Result, ResultContainer, ResultText } from './sumary-result.styles';

const SumaryResult = (props: AnswerSurveyReceive) => {
  const { questions } = props;

  const [result, setResult] = useState({
    correct: 0,
    incorrect: 0,
  });

  const countResult = () => {
    let correct = 0;
    let incorrect = 0;
    questions.forEach((question) => {
      if (question.correct) {
        correct += 1;
      } else {
        incorrect += 1;
      }
    });

    setResult({ correct, incorrect });
    return { correct, incorrect };
  };

  useEffect(() => {
    countResult();
  }, []);

  return (
    <ResultContainer>
      <Box>
        <h1>Finish!</h1>
      </Box>
      <Box>
        <h2 style={{ fontWeight: 'bold' }}>
          <Result>
            <HiOutlineCheck color="green" />
            <span>{`${result.correct} correct`}</span>
            <MdClose color="red" />
            <span>{`${result.incorrect} incorrect`}</span>
          </Result>
        </h2>
      </Box>
      <Box mt={16}>
        {questions &&
          questions.length &&
          questions.map((question) => (
            <Box key={question.id} display="flex" alignItems="center" mt={4}>
              {question.correct ? (
                <HiOutlineCheck color="green" />
              ) : (
                <MdClose color="red" />
              )}
              <ResultText>{question.name}</ResultText>
            </Box>
          ))}
      </Box>
    </ResultContainer>
  );
};

export default SumaryResult;
