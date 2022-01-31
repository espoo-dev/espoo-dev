import { httpClient } from '@api/client';
import { errorHandler } from '@api/error-handler';
import { AnswerSurveyReceive } from '@api/models/answer_survey';
import { Question, Survey } from '@api/models/survey';
import { AnswerSurveyService } from '@api/services/answer_survey';
import { Box } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/react';
import SingleChoice from '@components/single-choice/single-choice';
import SumaryResult from '@components/sumary-result/sumary-result';
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
  const answerSurveyService = new AnswerSurveyService(httpClient);
  const [answerSurvey, setAnswerSurvey] =
    useState<AnswerSurveyReceive | null>();
  const [isLoadingResult, setIsLoadingResult] = useState(false);

  const getCurrentIndex = (): number => {
    const currentIndex = survey.current_answers_survey.current_question_index;
    return currentIndex;
  };

  const hasAnswer = (): boolean => getCurrentIndex() > 0;

  const nextQuestion = (index: number) => {
    setQuestionCount(index + 1);
    setQuestion(survey.questions[index]);
  };

  useEffect(() => {
    nextQuestion(questionCount);
  }, [result]);

  useEffect(() => {
    if (hasAnswer()) {
      nextQuestion(getCurrentIndex());
    }
  }, []);

  useEffect(() => {
    if (!question) {
      loadAnswerSurvey(survey.current_answers_survey.id);
    }
  }, [questionCount]);

  const renderOptionByType = () => {
    const questionsTypes = {
      'Single Choice': (
        <SingleChoice
          options={question.options}
          setResult={setResult}
          question_id={question.id}
          current_answers_survey_id={survey.current_answers_survey.id}
        />
      ),
    };

    return questionsTypes[question.question_type.name];
  };

  const loadAnswerSurvey = async (current_survey_id: number) => {
    setIsLoadingResult(true);
    try {
      const response = await answerSurveyService.get({
        id: current_survey_id,
      });
      if (response && response.data) {
        setAnswerSurvey(response.data);
        setIsLoadingResult(false);
      }
    } catch (error) {
      errorHandler(error);
      setIsLoadingResult(false);
    }
  };

  return (
    <Box style={{ color: '#fff' }}>
      {question ? (
        <Box m={6}>
          <h2>{`Question ${questionCount}`}</h2>
          <h1>{question && question.name}</h1>

          {survey && question && <Box mt={10}>{renderOptionByType()}</Box>}
        </Box>
      ) : (
        <h1>
          {survey && survey.questions.length && answerSurvey ? (
            <SumaryResult {...answerSurvey} />
          ) : (
            <Box textAlign="center">
              {isLoadingResult ? (
                <Box>
                  <Spinner color="white" />
                  <span>Calculating result...</span>
                </Box>
              ) : (
                'No questions'
              )}
            </Box>
          )}
        </h1>
      )}
    </Box>
  );
};

export default SurveyPage;
