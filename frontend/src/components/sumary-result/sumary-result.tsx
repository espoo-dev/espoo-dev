import { AnswerSurveyReceive } from '@api/models/answer_survey';
import { Box, Grid, Heading, Tooltip } from '@chakra-ui/react';
import { colors } from '@styles/colors';
import { useEffect, useState } from 'react';
import { AsnweredQuestion } from '../answered-question';
import { BoxResult, ResultContainer } from './sumary-result.styles';

export const SummaryResult = ({ questions }: AnswerSurveyReceive) => {
  const [result, setResult] = useState({
    correct: 0,
    incorrect: 0,
  });

  const countResult = () => {
    const correct = questions.filter((q) => q.correct).length;
    const incorrect = questions.length - correct;

    setResult({ correct, incorrect });
  };

  useEffect(() => {
    countResult();
  }, []);

  return (
    <ResultContainer>
      <Box>
        <Heading color={colors.primaryTxt} fontSize={20}>
          Finish!
        </Heading>
      </Box>
      <Box display="flex" justifyContent="end">
        <Tooltip label="Correct">
          <BoxResult correct>
            <span data-testid="correct">{result.correct}</span>
          </BoxResult>
        </Tooltip>
        <Tooltip label="Incorrect">
          <BoxResult>
            <span data-testid="incorrect">{result.incorrect}</span>
          </BoxResult>
        </Tooltip>
      </Box>
      <Grid
        templateColumns="repeat(auto-fit, minmax(300px, 2fr))"
        gap={4}
        mt={10}
      >
        {questions?.length &&
          questions.map((question) => (
            <AsnweredQuestion key={question.id} {...question} />
          ))}
      </Grid>
    </ResultContainer>
  );
};
