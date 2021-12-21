import React, { Dispatch, SetStateAction, useState } from 'react';
import { Grid } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { Survey } from 'api/models/survey';
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

  const registerAnswerSurvey = async (survey_id, survey) => {
    setSelectedSurvey(survey_id);
    setLoading(true);

    // TODO: move to promise when register return success.
    setSurveySelected(survey);
    try {
      const response = await answerSurveyService.register({ survey_id });
      if (response && response.data) {
        toast('Answer Survey created successfully', {
          position: 'top-right',
          type: 'success',
          pauseOnHover: false,
        });
      }
    } catch (error) {
      errorHandler(error);
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
