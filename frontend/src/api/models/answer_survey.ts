import { AnswerSurveyStatus, OptionQuestion, Question } from './survey';

export interface AnswerSurveyCreate {
  survey_id: number;
}

export interface AnswerSurveyGet {
  id: number;
}

export interface AnsweredQuestion {
  id: number;
  name: string;
  options: OptionQuestion[];
  question_type: {
    id: number;
    name: string;
  };
  answered_options: {
    correct: boolean;
    id: number;
    name: string;
  }[];
  correct: boolean;
}

export interface AnswerSurvey {
  id: number;
  status: AnswerSurveyStatus;
  user_id: number;
  questions: Question[];
}

export interface AnswerSurveyReceive {
  id: number;
  status: AnswerSurveyStatus;
  user_id: number;
  questions: AnsweredQuestion[];
}
