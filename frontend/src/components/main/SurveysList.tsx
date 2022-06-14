import { SurveyItem } from '@components/survey-item/survey-item';
import { httpClient } from 'api';
import { errorHandler } from 'api/error-handler';
import { AnswerSurveyStatus, Survey } from 'api/models/survey';
import { AnswerSurveyService } from 'api/services/answer_survey';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { SurveyGrid, SurveysListContainer } from './SurveysList.styles';

interface SurveyListProps {
  data: Survey[];
  setSurveySelected: Dispatch<SetStateAction<Survey>>;
}

export const SurveysList = (props: SurveyListProps) => {
  const { data } = props;

  const answerSurveyService = new AnswerSurveyService(httpClient);
  const [loading, setLoading] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const router = useRouter();

  const initSurveySelect = async (survey: Survey) => {
    const surveyToInit = survey;
    try {
      const response = await answerSurveyService.smartRegister({
        survey_id: surveyToInit.id,
      });
      if (response && response.data) {
        surveyToInit.current_answers_survey = {
          ...response.data,
        };
        redirectToSurveyPage(surveyToInit);
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
      redirectToSurveyPage(survey);
    }
    setLoading(false);
  };

  const redirectToSurveyPage = (survey: Survey) => {
    if (router) {
      router.push(`/surveys/${survey.id}`);
    }
  };

  return (
    <SurveysListContainer>
      <SurveyGrid>
        {data.map((item) => (
          <SurveyItem
            key={item.id}
            title={item.name}
            description={item.description}
            numberQuestions={item.questions.length}
            onClick={() => registerAnswerSurvey(item.id, item)}
            loading={loading && selectedSurvey === item.id}
            surveyData={item}
            status={item.current_answers_survey?.status}
            cover={item.image_url}
          />
        ))}
      </SurveyGrid>
    </SurveysListContainer>
  );
};
