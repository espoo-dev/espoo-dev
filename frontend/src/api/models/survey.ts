export interface QuestionType {
  id: number;
  name: string;
}

export interface QuestionOption {
  correct: boolean;
  id: number;
  name: string;
}

export interface Question {
  id: number;
  name: string;
  question_type: QuestionType;
  options?: Array<QuestionOption>;
}

export interface Survey {
  id: number;
  name: string;
  description: string;
  questions: Array<Question>;
}
