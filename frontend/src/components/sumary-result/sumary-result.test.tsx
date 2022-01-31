import { AnswerSurveyReceive } from '@api/models/answer_survey';
import { render, screen } from 'test-utils';
import SumaryResult from './sumary-result';
import { AnswerSurveyStatus } from '@api/models/survey';

const answerSurvey: AnswerSurveyReceive = {
  id: 224,
  questions: [
    {
      id: 1031,
      name: 'What is your favorite animal?',
      correct: true,
      question_type: {
        id: 331,
        name: 'Single Choice',
      },
      options: [
        {
          id: 1382,
          name: 'Eagle',
        },
        {
          id: 1383,
          name: 'Dog',
        },
      ],
      answered_options: [
        {
          id: 1382,
          name: 'Eagle',
          correct: true,
        },
      ],
    },
    {
      id: 1032,
      name: 'What is the bigger animal?',
      correct: false,
      question_type: {
        id: 331,
        name: 'Single Choice',
      },
      options: [
        {
          id: 1384,
          name: 'Cat',
        },
        {
          id: 1385,
          name: 'Horse',
        },
      ],
      answered_options: [
        {
          id: 1384,
          name: 'Cat',
          correct: true,
        },
      ],
    },
  ],
  status: AnswerSurveyStatus.Completed,
  user_id: 1,
};

describe('SumaryResult', () => {
  it('should render component with title', () => {
    render(<SumaryResult {...answerSurvey} />);
    expect(screen.getByText('Finish!')).toBeInTheDocument();
  });

  it('should show the result of survey', () => {
    render(<SumaryResult {...answerSurvey} />);
    expect(screen.getByText('1 correct')).toBeInTheDocument();
    expect(screen.getByText('1 incorrect')).toBeInTheDocument();
  });

  it('should show correct and incorrect questions', () => {
    render(<SumaryResult {...answerSurvey} />);
    answerSurvey.questions.forEach((question) => {
      expect(screen.getByText(question.name)).toBeInTheDocument();
    });
  });
});
