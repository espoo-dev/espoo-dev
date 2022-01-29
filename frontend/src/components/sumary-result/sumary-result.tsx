import { AnswerSurveyReceive } from '@api/models/answer_survey';
import { Box, Grid, Tooltip } from '@chakra-ui/react';
import AsnweredQuestion from '@components/answered-question/answered-question';
import { useEffect, useState } from 'react';
import { BoxResult, ResultContainer } from './sumary-result.styles';

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
      <Box display="flex" justifyContent="end">
        <Tooltip label="Correct">
          <BoxResult correct>
            <div>
              <span data-testid="correct">{result.correct}</span>
            </div>
          </BoxResult>
        </Tooltip>
        <Tooltip label="Incorrect">
          <BoxResult>
            <div>
              <span data-testid="incorrect">{result.incorrect}</span>
            </div>
          </BoxResult>
        </Tooltip>
        {/* <h2 style={{ fontWeight: 'bold' }}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={8}
          >
            <MdClose color="red" />
            <span>{`${result.incorrect} incorrect`}</span>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={2}
            fontSize={18}
          >
            <HiOutlineCheck color="green" />
            <span>{`${result.correct} correct`}</span>
          </Box>
        </h2> */}
      </Box>
      <Grid
        templateColumns="repeat(auto-fit, minmax(300px, 2fr))"
        gap={4}
        mt={10}
      >
        {questions &&
          questions.length &&
          questions.map((question) => (
            <AsnweredQuestion key={question.id} {...question} />
          ))}
      </Grid>
    </ResultContainer>
  );
};

export default SumaryResult;
