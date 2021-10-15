export interface AnswerSurveyCreate {
  survey_id: number;
}

export interface AnswerSurvey {
  id: number;
  status: string;
  user_id: number;
}
