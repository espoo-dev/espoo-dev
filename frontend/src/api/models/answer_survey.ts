export interface AnswerSurveyCreate {
  survey_id: number;
}

export interface AnswerSurvey {
  id: number;
  status: 'Not started' | 'Started' | 'Completed';
  user_id: number;
}
