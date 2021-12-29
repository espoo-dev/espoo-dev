import { AnswerSurveyStatus, Survey } from '@api/models/survey';
import SurveyPage from '@pages/survey';
import { render, screen } from 'test-utils';

const surveyDefault: Survey = {
  id: 1,
  name: 'Animals survey',
  description: 'Nice animals',
  answers_surveys: [],
  current_answers_survey: {
    id: 1,
    status: AnswerSurveyStatus.NotStarted,
    user_id: 439,
  },
  questions: [
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
  ],
  survey_subject_id: 12,
};

describe('SurveyPage', () => {
  it('should render first question', () => {
    render(<SurveyPage survey={surveyDefault} />);
    expect(
      screen.getByText('What is your favorite animal?')
    ).toBeInTheDocument();
  });

  it('should render all question options to question', () => {
    render(<SurveyPage survey={surveyDefault} />);
    surveyDefault.questions[0].options.map((option) => {
      expect(screen.getByText(option.name)).toBeInTheDocument();
    });
  });

  it('should select an option', () => {
    render(<SurveyPage survey={surveyDefault} />);
    const option = surveyDefault.questions[0].options[0];
    const optionElement = screen.getByText(option.name);
    expect(optionElement).toBeInTheDocument();
    optionElement.click();
  });
});
