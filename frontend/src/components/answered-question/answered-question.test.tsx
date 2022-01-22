import { render, screen } from 'test-utils';
import AsnweredQuestion from './answered-question';

interface AnswerdOption {
  id: number;
  name: string;
  correct: boolean;
}

interface ResultAnswerProps {
  id: number;
  correct: boolean;
  name: string;
  answered_options: AnswerdOption[];
}

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
    screen.debug();
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
});
