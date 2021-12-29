export interface QuestionType {
  id: number;
  name: string;
}

export interface AnswersSurvey {
  id: number;
  status: AnswerSurveyStatus;
  user_id: number;
}

export interface OptionQuestion {
  id: number;
  name: string;
}

export interface Question {
  id: number;
  name: string;
  question_type: QuestionType;
  options?: OptionQuestion[];
}

export interface Survey {
  answers_surveys: AnswersSurvey[] | null;
  current_answers_survey: AnswersSurvey | null;
  id: number;
  name: string;
  description: string;
  questions: Question[];
  survey_subject_id: number;
}

export enum AnswerSurveyStatus {
  NotStarted = 'Not started',
  Started = 'Started',
  Completed = 'Completed',
}
