import { render, screen } from 'test-utils';
import AsnweredQuestion, { ResultAnswerProps } from './answered-question';

const answeredQuestionDefault: ResultAnswerProps = {
  id: 1,
  correct: true,
  name: 'Edimo is corno manso?',
  answered_options: [
    {
      id: 1,
      name: 'Yep',
      correct: true,
    },
  ],
  options: [
    {
      id: 1,
      name: 'Yep',
      correct: true,
    },
    {
      id: 2,
      name: 'Maybe',
      correct: true,
    },
    {
      id: 3,
      name: 'No',
      correct: false,
    },
    {
      id: 3,
      name: 'I believe',
    },
  ],
};

describe('ResultAnswer', () => {
  it('should render component', () => {
    const rendered = render(<AsnweredQuestion {...answeredQuestionDefault} />);
    expect(rendered).toBeTruthy();
  });

  it('should show the question name', () => {
    render(<AsnweredQuestion {...answeredQuestionDefault} />);
    expect(screen.getByText(answeredQuestionDefault.name)).toBeTruthy();
  });

  it('should show correct icon when answered is correct', () => {
    render(<AsnweredQuestion {...answeredQuestionDefault} />);
    expect(screen.queryAllByTestId('correct-icon')).toHaveLength(1);
  });

  it('should show correct icon when answered is incorrect', () => {
    const incorrectQuestion = { ...answeredQuestionDefault };
    incorrectQuestion.correct = false;
    render(<AsnweredQuestion {...incorrectQuestion} />);
    expect(screen.queryAllByTestId('incorrect-icon')).toHaveLength(1);
  });

  it('should show answered option', () => {
    render(<AsnweredQuestion {...answeredQuestionDefault} />);
    expect(
      screen.queryAllByText(answeredQuestionDefault.answered_options[0].name)
    ).toHaveLength(1);
  });

  it('should show all correct options when is multiple', () => {
    render(<AsnweredQuestion {...answeredQuestionDefault} />);
    ['Yep', 'Maybe'].forEach((answer) => {
      expect(screen.queryAllByText(answer)).toHaveLength(1);
    });
  });
});
