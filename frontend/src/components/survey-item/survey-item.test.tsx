import { AnswerSurveyStatus } from '@api/models/survey';
import { fireEvent, render } from 'test-utils';
import { SurveyItem, SurveyItemProps } from './survey-item';

const mockSurveyDefault: SurveyItemProps = {
  title: 'Wild Animals',
  description: 'Animals that live in the wild',
  numberQuestions: 5,
};

const startedSurvey: SurveyItemProps = {
  title: 'Wild Animals',
  description: 'Animals that live in the wild',
  numberQuestions: 5,
  surveyData: {
    id: 1,
    current_answers_survey: {
      id: 1,
      status: AnswerSurveyStatus.NotStarted,
      user_id: 439,
    },
    description: 'Animals that live in the wild',
    name: 'Wild Animals',
    questions: [],
    survey_subject_id: 1,
    answers_surveys: [
      {
        id: 1,
        status: AnswerSurveyStatus.NotStarted,
        user_id: 394,
      },
    ],
  },
};

describe('SurveyItem', () => {
  it('should render component on screen', () => {
    const rendered = render(<SurveyItem {...mockSurveyDefault} />);
    expect(rendered).toBeTruthy();
  });

  it('should render the title of survey and description', () => {
    const rendered = render(<SurveyItem {...mockSurveyDefault} />);
    expect(rendered.getByText(mockSurveyDefault.title)).toBeTruthy();
    expect(rendered.getByText(mockSurveyDefault.description)).toBeTruthy();
  });

  it('should have the number correct of questions on card', () => {
    const rendered = render(<SurveyItem {...mockSurveyDefault} />);
    expect(
      rendered.getByText(`${mockSurveyDefault.numberQuestions} Questions`)
    ).toBeTruthy();
  });

  it('should have random image in cover', () => {
    const rendered = render(
      <SurveyItem
        title="Survey name"
        description="Available your instincts now"
        numberQuestions={10}
      />
    );
    expect(rendered.getByTestId('random-image')).toBeTruthy();
  });

  it('should show no question when no have questions', () => {
    const rendered = render(
      <SurveyItem
        title="Survey name"
        description="Available your instincts now"
        numberQuestions={0}
      />
    );
    expect(rendered.getByText('No questions')).toBeTruthy();
  });

  it('should show resume button when started survey', () => {
    const rendered = render(<SurveyItem {...startedSurvey} />);
    expect(rendered.getByText('Click to resume')).toBeTruthy();
  });

  it('not should show resume button when started survey', () => {
    const notStartedSurvey = startedSurvey;
    notStartedSurvey.surveyData.answers_surveys = [];

    const rendered = render(<SurveyItem {...notStartedSurvey} />);
    expect(rendered.queryAllByText('Click to resume')).toHaveLength(0);
  });
});
