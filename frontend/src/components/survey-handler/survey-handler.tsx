import { httpClient } from '@api/client';
import { errorHandler } from '@api/error-handler';
import { AnswerCreate } from '@api/models/answer';
import { AnswerSurveyReceive } from '@api/models/answer_survey';
import { Question, Survey } from '@api/models/survey';
import { AnswerService } from '@api/services/answers';
import { AnswerSurveyService } from '@api/services/answer_survey';
import { Box } from '@chakra-ui/layout';
import {
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  Spinner,
} from '@chakra-ui/react';
import { AppButton } from '@components/app-button';
import { MultipleChoice, SingleChoice } from '@components/questions';
import { SummaryResult } from '@components/sumary-result/sumary-result';
import { usePrevious } from '@hooks/usePrevious';
import { useUpdateEffect } from '@hooks/useUpdateEffect';
import { colors } from '@styles/colors';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface SurveyPageProps {
  survey: Survey;
}

const questionTypes = {
  'Single Choice': SingleChoice,
  'Multiple Choice': MultipleChoice,
};

export const SurveyHandler = (props: SurveyPageProps) => {
  const { survey } = props;
  const totalQuestions = survey.total_questions_quantity;

  const answerService = new AnswerService(httpClient);
  const answerSurveyService = new AnswerSurveyService(httpClient);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [result, setResult] = useState<number[] | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [answerSurvey, setAnswerSurvey] = useState<AnswerSurveyReceive | null>(
    null
  );
  const [isLoadingResult, setIsLoadingResult] = useState(false);
  const [answering, setAnswering] = useState(false);

  const previousIndex = usePrevious(questionIndex);

  const isFinalQuestion = useMemo(
    () => totalQuestions === questionIndex + 1,
    [questionIndex]
  );

  const nextQuestion = () => {
    setQuestionIndex((prev) => prev + 1);
  };

  const renderOptionByType = useCallback(() => {
    const { options, question_type } = question;

    const Component = questionTypes[question_type.name];

    return <Component options={options} setResult={setResult} />;
  }, [question]);

  const onAnswerQuestion = async (selectedOptions: number[]) => {
    const answerSurveyId = survey.current_answers_survey.id;
    setAnswering(true);

    try {
      const payload: AnswerCreate = {
        answers_survey_id: answerSurveyId,
        option_ids: selectedOptions,
        question_id: question.id,
      };

      await answerService.create(payload);
      nextQuestion();
    } catch (error) {
      errorHandler(error);
    } finally {
      setAnswering(false);
    }
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
    const percent = ((questionIndex + 1) * 100) / totalQuestions;
    const formated = percent ? `${percent.toFixed(2)}%` : '0.00%';

    return [percent || 0, formated];
  }, [questionIndex, totalQuestions]);

  useEffect(() => {
    const { current_answers_survey } = survey;

    if (
      current_answers_survey &&
      current_answers_survey.current_question_index
    ) {
      const { current_question_index } = current_answers_survey;
      setQuestionIndex(current_question_index);
      setQuestion(current_answers_survey.questions[current_question_index]);
      return;
    }

    setQuestionIndex(0);
    setQuestion(current_answers_survey.questions[0]);
  }, []);

  useUpdateEffect(() => {
    if (!question) {
      loadAnswerSurvey(survey.current_answers_survey.id);
    }
  }, [question]);

  useUpdateEffect(() => {
    const { current_answers_survey } = survey;

    if (questionIndex !== previousIndex) {
      setQuestion(current_answers_survey.questions[questionIndex]);
    }
  }, [questionIndex, previousIndex]);

  if (!survey) {
    return null;
  }

  return (
    <Box>
      {question ? (
        <Box my={4}>
          <Flex alignItems="center" justifyContent="space-between">
            <Heading color="white" fontSize={16}>
              {`Question ${questionIndex + 1}`}
            </Heading>

            <CircularProgress
              value={getCompletePercent()[0]}
              color={colors.primaryTxt}
              capIsRound
              ml="4"
              data-testid="progress_bar"
            >
              <CircularProgressLabel
                data-testid="progress_text"
                color={colors.primaryTxt}
              >
                {questionIndex + 1} / {totalQuestions}
              </CircularProgressLabel>
            </CircularProgress>
          </Flex>

          <Box m={6} textAlign="center">
            <Heading fontSize="30px" color={colors.primaryTxt} fontWeight={400}>
              {question && question.name}
            </Heading>

            <Box mt={3} color="white">
              <span>SELECT UP TO 1 OPTION</span>
            </Box>

            <Box
              mt={10}
              overflow="hidden"
              overflowY="auto"
              maxH={{
                md: 'unset',
                sm: '350px',
                xs: '350px',
              }}
              p="3"
            >
              {renderOptionByType()}
            </Box>
          </Box>

          <Flex alignItems="center" justifyContent="center">
            <AppButton
              onClick={() => onAnswerQuestion(result)}
              disabled={answering || !result || (result && !result.length)}
              loading={answering}
              text={isFinalQuestion ? 'Finish survey' : 'Next question'}
              style={{ width: 'fit-content' }}
              data-testid="next_question_btn"
            />
          </Flex>
        </Box>
      ) : (
        <h1>
          {survey &&
          survey.current_answers_survey.questions.length &&
          answerSurvey ? (
            <SummaryResult {...answerSurvey} />
          ) : (
            <Box textAlign="center">
              {isLoadingResult ? (
                <Box color={colors.primaryTxt}>
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
