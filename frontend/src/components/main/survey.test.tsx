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
    {
      id: 1023,
      name: 'What is the bigger animal?',
      options: [
        {
          id: 1370,
          name: 'Cat'
        }
      ],
      question_type: {
        id: 328,
        name: 'Single Choice'
      }
    }
  ],
  survey_subject_id: 12,
};

describe('SurveyPage', () => {
  it('should render first question', () => {
    render(<SurveyPage survey={surveyDefault} />);
    expect(
      screen.getByText('What is your favorite animal?')
    ).toBeInTheDocument();

    expect(
      screen.getByText('Question 1')
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

  it('should render second question when continue a survey with one answer', () => {
    const surveyIncomplet = {...surveyDefault};
    surveyIncomplet.current_answers_survey.answered_questions = [
      {
        id: 1022,
        name: 'What is your favorite animal?',
        options: [
          {
            id: 1,
            name: 'Cat'
          }
        ],
        question_type: {
          id: 328,
          name: 'Single Choice'
        }
      }
    ];
    surveyIncomplet.current_answers_survey.current_question_index = 1;
    surveyIncomplet.current_answers_survey.not_answered_questions = [
      {
        id: 1023,
        name: 'What is the bigger animal?',
        options: [
          {
            id: 1370,
            name: 'Cat'
          }
        ],
        question_type: {
          id: 328,
          name: 'Single Choice'
        }
      }
    ];

    render(<SurveyPage survey={surveyIncomplet} />);
    expect(
      screen.getByText(surveyIncomplet.questions[1].name)
    ).toBeInTheDocument();

    expect(
      screen.getByText('Question 2')
    ).toBeInTheDocument();
  });
});
