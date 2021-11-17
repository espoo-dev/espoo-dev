export interface QuestionType {
  id: number;
  name: string;
}

export interface AnswersSurvey {
  id: number;
  status: string;
  user_id: number;
}

export interface Survey {
  answers_surveys: AnswersSurvey[] | null;
  current_answers_survey: AnswersSurvey;
  id: number;
  name: string;
  description: string;
  questions: {
    id: number;
    name: string;
    question_type: QuestionType;
  }[];
  survey_subject_id: number;
}
