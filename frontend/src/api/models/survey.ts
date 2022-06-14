export interface QuestionType {
  id: number;
  name: string;
}

export interface AnswersSurvey {
  id: number;
  status: AnswerSurveyStatus;
  user_id: number;
  answered_questions?: Question[];
  current_question_index?: number;
  questions: Question[];
  not_answered_questions?: Question[];
}

export interface OptionQuestion {
  id: number;
  name: string;
  correct?: boolean;
}

export interface Question {
  id: number;
  name: string;
  question_type: QuestionType;
  options?: OptionQuestion[];
  image_url?: string;
}

export interface Survey {
  answers_surveys: AnswersSurvey[] | null;
  current_answers_survey: AnswersSurvey | null;
  id: number;
  name: string;
  description: string;
  questions: Question[];
  survey_subject_id: number;
  total_questions_quantity: number;
  image_url?: string;
  icon_url?: string;
}

export enum AnswerSurveyStatus {
  NotStarted = 'Not started',
  Started = 'Started',
  Completed = 'Completed',
}
