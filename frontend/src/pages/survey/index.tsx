import { Question, Survey } from '@api/models/survey';
import { Box } from '@chakra-ui/layout';
import SingleChoice from '@components/single-choice/single-choice';
import { useEffect, useState } from 'react';

interface SurveyPageProps {
  survey: Survey;
}

const SurveyPage = (props: SurveyPageProps) => {
  const { survey } = props;
  const [questionCount, setQuestionCount] = useState(0);
  const [result, setResult] = useState<number[]>([]);
  const [question, setQuestion] = useState<Question>(
    (survey && survey.questions[0]) || null
  );

  useEffect(() => {
    setQuestionCount(questionCount + 1);
    setQuestion(survey.questions[questionCount]);
  }, [result]);

  return (
    <Box style={{ color: '#fff' }}>
      {question ? (
        <Box m={6}>
          <h2>{`Question ${questionCount}`}</h2>
          <h1>{question && question.name}</h1>

          {survey &&
          question &&
          question.question_type.name === 'Single Choice' ? (
            <Box mt={4}>
              <SingleChoice
                options={question.options}
                setResult={setResult}
                question_id={question.id}
                current_answers_survey_id={survey.current_answers_survey.id}
              />
            </Box>
            ) : null}
        </Box>
      ) : (
        <h1>
          {survey && survey.questions.length ? 'Finish!' : 'No questions :/'}
        </h1>
      )}
    </Box>
  );
};

export default SurveyPage;
