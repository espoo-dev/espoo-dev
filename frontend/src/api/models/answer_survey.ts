import { AnswerSurveyStatus } from './survey';

export interface AnswerSurveyCreate {
  survey_id: number;
}

export interface AnswerSurvey {
  id: number;
  status: AnswerSurveyStatus;
  user_id: number;
}
