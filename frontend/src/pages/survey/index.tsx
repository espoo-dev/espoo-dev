import { httpClient } from '@api/client';
import { errorHandler } from '@api/error-handler';
import { AnswerSurveyReceive } from '@api/models/answer_survey';
import { Question, Survey } from '@api/models/survey';
import { AnswerSurveyService } from '@api/services/answer_survey';
import { Box } from '@chakra-ui/layout';
import {
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Spinner,
} from '@chakra-ui/react';
import SingleChoice from '@components/single-choice/single-choice';
import SumaryResult from '@components/sumary-result/sumary-result';
import { useCallback, useEffect, useState } from 'react';
import { colorPallettes } from 'styles/globals';

interface SurveyPageProps {
  survey: Survey;
}

const SurveyPage = (props: SurveyPageProps) => {
  const { survey } = props;
  const { total_questions_quantity } = survey;
  const [questionIndex, setQuestionIndex] = useState(0);
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
    setQuestionIndex(index + 1);
    setQuestion(survey.questions[index]);
  };

  useEffect(() => {
    nextQuestion(questionIndex);
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
  }, [questionIndex]);

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

  const getCompletePercent = useCallback((): [number, string] => {
    const percent = (questionIndex * 100) / total_questions_quantity;
    const formated = percent ? `${percent.toFixed(2)}%` : '0.00%';

    return [percent || 0, formated];
  }, [questionIndex]);

  return (
    <Box>
      {question ? (
        <Box m={6}>
          <Flex alignItems="center" justifyContent="space-between">
            <h2>{`Question ${questionIndex}`}</h2>

            <CircularProgress
              value={getCompletePercent()[0]}
              color="teal.300"
              capIsRound
              ml="4"
              data-testid="progress_bar"
            >
              <CircularProgressLabel data-testid="progress_text">
                {questionIndex} / {total_questions_quantity}
              </CircularProgressLabel>
            </CircularProgress>
          </Flex>

          <Box m={6} textAlign="center">
            <h1
              style={{
                fontSize: '30px',
                color: colorPallettes.primary,
                fontWeight: 400,
              }}
            >
              {question && question.name}
            </h1>
            <Box mt={3} color={colorPallettes.secondary}>
              <span>SELECT UP TO 1 OPTION</span>
            </Box>
            {survey && question && <Box mt={10}>{renderOptionByType()}</Box>}
          </Box>
        </Box>
      ) : (
        <h1>
          {survey && survey.questions.length && answerSurvey ? (
            <SumaryResult {...answerSurvey} />
          ) : (
            <Box textAlign="center">
              {isLoadingResult ? (
                <Box color={colorPallettes.primary}>
                  <Spinner mr={4} />
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
