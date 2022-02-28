import { AnswerSurveyStatus, Survey } from '@api/models/survey';

const questions = [
  {
    id: 1,
    name: 'What is your favorite animal?',
    question_type: {
      id: 1,
      name: 'Single Choice',
    },
    options: [
      {
        id: 1,
        name: 'Dog',
      },
      {
        id: 2,
        name: 'Cat',
      },
    ],
  },
  {
    id: 2,
    name: 'What is the bigger animal?',
    options: [
      {
        id: 1370,
        name: 'Cat',
      },
      {
        id: 1371,
        name: 'Elephant',
      },
    ],
    question_type: {
      id: 1,
      name: 'Single Choice',
    },
  },
];

const mockSurvey: Survey = {
  id: 1,
  name: 'Animals survey',
  description: 'Nice animals',
  answers_surveys: [],
  current_answers_survey: {
    id: 1,
    status: AnswerSurveyStatus.NotStarted,
    user_id: 439,
    current_question_index: 0,
    questions,
  },
  questions,
  survey_subject_id: 12,
  total_questions_quantity: 2,
};

export default mockSurvey;
