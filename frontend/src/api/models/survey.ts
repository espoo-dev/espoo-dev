export interface QuestionType {
  id: number;
  name: string;
}

export interface Survey {
  id: number;
  name: string;
  description: string;
  questions: {
    id: number;
    name: string;
    question_type: QuestionType;
  }[];
}
