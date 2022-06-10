import { httpClient } from '@api/client';
import { errorHandler } from '@api/error-handler';
import { Group } from '@api/models/group';
import { AnswerSurveyStatus, Survey } from '@api/models/survey';
import { AnswerSurveyService } from '@api/services/answer_survey';
import { Flex, Text } from '@chakra-ui/react';
import { colors } from '@styles/colors';
import { useRouter } from 'next/router';
import {
  IconItem,
  RoadmapContainer,
  RoadmapRow,
  SurveyItemMap,
} from './roadmap-survey.styles';

interface RoadmapSurveyProps {
  groups: Group[];
}

export const RoadmapSurvey = (props: RoadmapSurveyProps) => {
  const { groups } = props;
  const answerSurveyService = new AnswerSurveyService(httpClient);
  const router = useRouter();

  if (!groups) {
    return null;
  }

  const initSurveySelect = async (survey: Survey) => {
    const surveyToInit = survey;
    try {
      const response = await answerSurveyService.register({
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
    if (canCreateAnswerSurvey(survey)) {
      initSurveySelect(survey);
    } else {
      redirectToSurveyPage(survey);
    }
  };

  const redirectToSurveyPage = (survey: Survey) => {
    if (router) {
      router.push(`/surveys/${survey.id}`);
    }
  };

  return (
    <RoadmapContainer>
      <RoadmapRow>
        {groups && groups.length ? (
          groups.map((group) => (
            <Flex key={group.id} data-testid={`group-${group.id}`}>
              {group.surveys.map((survey) => (
                <SurveyItemMap status={group.status} key={survey.name}>
                  <IconItem
                    data-testid={`icon-${survey.name}`}
                    status={group.status}
                    icon_url={survey.icon_url}
                    onClick={() => registerAnswerSurvey(survey.id, survey)}
                  />
                  <span>{survey.name}</span>
                </SurveyItemMap>
              ))}
            </Flex>
          ))
        ) : (
          <Text color={colors.primaryTxt}>No surveys to show =/</Text>
        )}
      </RoadmapRow>
    </RoadmapContainer>
  );
};
