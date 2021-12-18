import { Survey } from '@api/models/survey';
import { Box, Grid } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';

interface SurveyPageProps {
  survey: Survey;
}

const SurveyPage = (props: SurveyPageProps) => {
  const { survey } = props;
  const [questionCount, setQuestionCount] = useState(0);

  useEffect(() => {
    console.log(survey.questions[questionCount].options);
  }, []);

  const selectOption = () => {
    setQuestionCount(questionCount + 1);
  };

  return (
    <Box style={{ color: '#fff' }}>
      <h1>{survey.name}</h1>
      <p>{survey.description}</p>

      <Box mt={14}>
        <h1>
          <strong>Q{questionCount} -</strong>{' '}
          {survey.questions[questionCount] &&
            survey.questions[questionCount].name}
        </h1>

        <Grid templateColumns="repeat(3, 1fr)" gap={4} mt={4}>
          {survey.questions[questionCount] &&
            survey.questions[questionCount].options &&
            survey.questions[questionCount].options.map((option) => (
              <Box onClick={selectOption} key={option.id}>
                {option.name}
              </Box>
            ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default SurveyPage;
