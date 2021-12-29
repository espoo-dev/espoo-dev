export interface AnswerCreate {
  question_id: number;
  answers_survey_id: number;
  user_answer?: string;
  option_ids: [number];
}
