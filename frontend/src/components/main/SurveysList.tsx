import React, { Dispatch, SetStateAction, useState } from 'react';
import { Grid } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { AnswerSurveyStatus, Survey } from 'api/models/survey';
import { httpClient } from 'api';
import { errorHandler } from 'api/error-handler';
import { AnswerSurveyService } from 'api/services/answer_survey';
import { SurveyItem } from '@components/survey-item/survey-item';

interface SurveyListProps {
  data: Survey[];
  setSurveySelected: Dispatch<SetStateAction<Survey>>;
}

export const SurveysList = (props: SurveyListProps) => {
  const { data, setSurveySelected } = props;

  const answerSurveyService = new AnswerSurveyService(httpClient);
  const [loading, setLoading] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(null);

  const initSurveySelect = async (survey: Survey) => {
    const surveyToInit = survey;
    try {
      const response = await answerSurveyService.register({
        survey_id: surveyToInit.id,
      });
      if (response && response.data) {
        toast('Answer Survey created successfully', {
          position: 'top-right',
          type: 'success',
          pauseOnHover: false,
        });
        surveyToInit.current_answers_survey = {
          ...response.data,
        };
        setSurveySelected(surveyToInit);
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const statusToCreate = [AnswerSurveyStatus.Completed];

  const canCreateAnswerSurvey = (survey: Survey): boolean => {
    if (!survey.current_answers_survey) {
      return true;
    }
    return statusToCreate.includes(survey.current_answers_survey.status);
  };

  const registerAnswerSurvey = async (survey_id: number, survey: Survey) => {
    setSelectedSurvey(survey_id);
    setLoading(true);

    if (canCreateAnswerSurvey(survey)) {
      initSurveySelect(survey);
    } else {
      setSurveySelected(survey);
    }
    setLoading(false);
  };

  return (
    <Grid templateColumns="repeat(auto-fit, minmax(450px, 1fr))" gap={4}>
      {data.map((item) => (
        <SurveyItem
          key={item.id}
          title={item.name}
          description={item.description}
          numberQuestions={item.questions.length}
          onClick={() => registerAnswerSurvey(item.id, item)}
          loading={loading && selectedSurvey === item.id}
          surveyData={item}
        />
      ))}
    </Grid>
  );
};
