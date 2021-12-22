import { Survey } from '@api/models/survey';
import { Box, Grid } from '@chakra-ui/layout';
import { useState } from 'react';

interface SurveyPageProps {
  survey: Survey;
}

const SurveyPage = (props: SurveyPageProps) => {
  const { survey } = props;
  const [questionCount, setQuestionCount] = useState(0);

  const selectOption = () => {
    setQuestionCount(questionCount + 1);
  };

  return (
    <Box style={{ color: '#fff' }}>
      {survey && survey.questions.length > 0 ? (
        <Box m={6}>
          <h2>{`Question ${questionCount}`}</h2>
          <h1>
            {survey.questions[questionCount] &&
              survey.questions[questionCount].name}
          </h1>

          <Grid templateColumns="repeat(3, 1fr)" gap={4} mt={6}>
            {survey.questions[questionCount] &&
              survey.questions[questionCount].options &&
              survey.questions[questionCount].options.map((option) => (
                <Box onClick={selectOption} key={option.id}>
                  {option.name}
                </Box>
              ))}
          </Grid>
        </Box>
      ) : (
        <h1>No questions</h1>
      )}
    </Box>
  );
};

export default SurveyPage;
