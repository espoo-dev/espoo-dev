import { fireEvent, render } from 'test-utils';
import { SurveyItem, SurveyItemProps } from './survey-item';

const mockSurveyDefault: SurveyItemProps = {
  title: 'Wild Animals',
  description: 'Animals that live in the wild',
  numberQuestions: 5
};

describe('SurveyItem', () => {
  it('should render component on screen', () => {
    const rendered = render(
      <SurveyItem {...mockSurveyDefault} />
    );
    expect(rendered).toBeTruthy();
  });

  it('should render the title of survey and description', () => {
    const rendered = render(
      <SurveyItem {...mockSurveyDefault} />
    );
    expect(rendered.getByText(mockSurveyDefault.title)).toBeTruthy();
    expect(rendered.getByText(mockSurveyDefault.description)).toBeTruthy();
  });

  it('should have the number correct of questions on card', () => {
    const rendered = render(
      <SurveyItem {...mockSurveyDefault} />
    );
    expect(rendered.getByText(mockSurveyDefault.numberQuestions)).toBeTruthy();
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
});
