import { AnswerSurveyStatus } from '@api/models/survey';
import { render } from 'test-utils';
import { images } from './random-images';
import { SurveyItem, SurveyItemProps } from './survey-item';

const mockSurveyDefault: SurveyItemProps = {
  title: 'Wild Animals',
  description: 'Animals that live in the wild',
  numberQuestions: 5,
};

describe('SurveyItem', () => {
  let startedSurvey: SurveyItemProps;

  beforeEach(() => {
    startedSurvey = {
      title: 'Wild Animals',
      description: 'Animals that live in the wild',
      numberQuestions: 5,
      surveyData: {
        id: 1,
        current_answers_survey: {
          id: 1,
          status: AnswerSurveyStatus.NotStarted,
          user_id: 439,
          questions: [],
        },
        total_questions_quantity: 0,
        description: 'Animals that live in the wild',
        name: 'Wild Animals',
        questions: [],
        survey_subject_id: 1,
        answers_surveys: [
          {
            id: 1,
            status: AnswerSurveyStatus.NotStarted,
            user_id: 394,
            questions: [],
          },
        ],
      },
    };
  });

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

  it('should have a given image in cover', () => {
    const rendered = render(<SurveyItem {...mockSurveyDefault} cover={'test.png'} />);
    expect(rendered.getByTestId('cover-image')).toHaveStyle(
      `background-image: url('test.png')`
    )
  });

  it('should have a random image in cover', () => {
    const rendered = render(
      <SurveyItem {...mockSurveyDefault} cover={''} />
    );
    const coverImageUrl = getComputedStyle(rendered.getByTestId('cover-image')).backgroundImage;
    expect(images.includes(coverImageUrl.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, ''))).toBeTruthy();
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

  describe('should show current status of survey', () => {
    it('should show completed tag when survey is completed', () => {
      const rendered = render(
        <SurveyItem
          title="Survey name"
          description="Available your instincts now"
          numberQuestions={1}
          status={AnswerSurveyStatus.Completed}
        />
      );
      expect(rendered.getByText(AnswerSurveyStatus.Completed)).toBeTruthy();
    });

    it('should show started tag when survey is started', () => {
      const rendered = render(
        <SurveyItem
          title="Survey name"
          description="Available your instincts now"
          numberQuestions={1}
          status={AnswerSurveyStatus.Started}
        />
      );
      expect(rendered.getByText(AnswerSurveyStatus.Started)).toBeTruthy();
    });

    it('should show not started tag when survey is not started', () => {
      const rendered = render(
        <SurveyItem
          title="Survey name"
          description="Available your instincts now"
          numberQuestions={1}
          status={AnswerSurveyStatus.NotStarted}
        />
      );
      expect(rendered.getByText(AnswerSurveyStatus.NotStarted)).toBeTruthy();
    });

    it('should not show tag when does not has an answers survey', () => {
      const rendered = render(
        <SurveyItem
          title="Survey name"
          description="Available your instincts now"
          numberQuestions={1}
          status={null}
        />
      );
      expect(rendered.queryAllByTestId('status-current-tag')).toHaveLength(0);
    });
  });

  it('should show resume button when started survey', () => {
    const rendered = render(
      <SurveyItem {...startedSurvey} status={AnswerSurveyStatus.Started} />
    );
    expect(rendered.getByText('Click to resume')).toBeTruthy();
  });

  it('should not show resume button when started survey', () => {
    const notStartedSurvey = { ...startedSurvey };
    notStartedSurvey.surveyData.answers_surveys = [];

    const rendered = render(<SurveyItem {...notStartedSurvey} />);
    expect(rendered.queryAllByText('Click to resume')).toHaveLength(0);
  });

  it('should not show resume button when completed survey', () => {
    const completedSurvey = { ...startedSurvey };
    const rendered = render(
      <SurveyItem
        title="Survey name"
        description="Available your instincts now"
        numberQuestions={1}
        status={AnswerSurveyStatus.Completed}
        surveyData={completedSurvey.surveyData}
      />
    );

    expect(rendered.getByText(AnswerSurveyStatus.Completed)).toBeTruthy();
    expect(rendered.queryAllByText('Click to resume')).toHaveLength(0);
  });

  it('should show answer again when survey is completed', () => {
    const rendered = render(
      <SurveyItem {...startedSurvey} status={AnswerSurveyStatus.Completed} />
    );
    expect(rendered.getByText('Answer again!')).toBeTruthy();
  });
});
