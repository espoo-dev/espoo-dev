import { Survey } from '@api/models/survey';
import SurveyPage from '@pages/survey';
import { act, fireEvent, render, screen, waitFor } from 'test-utils';
import mockSurvey from 'utils/mocks/survey';
import * as service from '../../api/services/answers';

jest.mock('../../api/services/answers');

const doServiceMock = () => {
  (
    service.AnswerService.prototype.create as jest.MockedFunction<
      typeof service.AnswerService.prototype.create
    >
  ).mockImplementationOnce(() =>
    Promise.resolve({
      data: {
        id: 1,
        name: '',
        question_type: {
          id: 1,
          name: '',
        },
        options: [],
      },
    } as any)
  );
};

describe('SurveyPage', () => {
  describe('Questions', () => {
    const mockCreate = service.AnswerService.prototype.create;
    const surveyDefault: Survey = JSON.parse(JSON.stringify(mockSurvey));

    beforeEach(() => {
      doServiceMock();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should render first question', () => {
      render(<SurveyPage survey={surveyDefault} />);
      expect(
        screen.getByText('What is your favorite animal?')
      ).toBeInTheDocument();

      expect(screen.getByText('Question 1')).toBeInTheDocument();
    });

    it('should render all question options to question', () => {
      render(<SurveyPage survey={surveyDefault} />);
      surveyDefault.current_answers_survey.questions[0].options.map(
        (option) => {
          expect(screen.getByText(option.name)).toBeInTheDocument();
        }
      );
    });

    it('should render the Next question button disabled', () => {
      const mockSurvey = JSON.parse(JSON.stringify(surveyDefault));
      const testId = 'next_question_btn';

      const { getByTestId } = render(<SurveyPage survey={mockSurvey} />);
      const nextBtn = getByTestId(testId);

      expect(nextBtn).toBeInTheDocument();
      expect(nextBtn).toBeDisabled();
    });

    it('should enable next button when selecting a question', () => {
      const mockSurvey = JSON.parse(JSON.stringify(surveyDefault));
      const { questions } = mockSurvey;
      const [question] = questions;

      const { getByTestId, getByText } = render(
        <SurveyPage survey={mockSurvey} />
      );
      const option = question.options[0];
      const optionElement = getByText(option.name);
      expect(optionElement).toBeInTheDocument();

      act(() => {
        fireEvent.click(optionElement);
      });

      const testId = 'next_question_btn';

      const nextBtn = getByTestId(testId);

      expect(nextBtn).toBeInTheDocument();
      expect(nextBtn).toBeEnabled();
    });

    it('should call answerService.create when clicking next button', async () => {
      const mockSurvey = JSON.parse(JSON.stringify(surveyDefault));
      const { questions } = mockSurvey;
      const [question] = questions;

      act(() => {
        render(<SurveyPage survey={mockSurvey} />);
      });

      const { getByTestId, getByText } = screen;

      const option = question.options[0];
      const optionElement = await waitFor(() => getByText(option.name));

      await act(async () => {
        fireEvent.click(optionElement);
      });

      const testId = 'next_question_btn';

      const nextBtn = await waitFor(() => getByTestId(testId));

      act(() => {
        fireEvent.click(nextBtn);
      });

      expect(getByTestId('loading_icon')).toBeInTheDocument();

      expect(mockCreate).toHaveBeenCalledTimes(1);
    });

    it('should render second question when continue a survey with one answer', () => {
      const surveyIncomplete = JSON.parse(JSON.stringify(surveyDefault));

      surveyIncomplete.current_answers_survey.answered_questions = [
        {
          id: 1022,
          name: 'What is your favorite animal?',
          options: [
            {
              id: 1,
              name: 'Cat',
            },
          ],
          question_type: {
            id: 328,
            name: 'Single Choice',
          },
        },
      ];

      surveyIncomplete.current_answers_survey.current_question_index = 1;

      surveyIncomplete.current_answers_survey.not_answered_questions = [
        {
          id: 1023,
          name: 'What is the bigger animal?',
          options: [
            {
              id: 1370,
              name: 'Cat',
            },
          ],
          question_type: {
            id: 328,
            name: 'Single Choice',
          },
        },
      ];

      render(<SurveyPage survey={surveyIncomplete} />);
      expect(
        screen.getByText(
          surveyIncomplete.current_answers_survey.questions[1].name
        )
      ).toBeInTheDocument();

      expect(screen.getByText('Question 2')).toBeInTheDocument();
    });
  });

  describe('Progress bar', () => {
    const mockCreate = service.AnswerService.prototype.create;
    const surveyDefault: Survey = JSON.parse(JSON.stringify(mockSurvey));

    beforeEach(() => {
      doServiceMock();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should render the progress component', async () => {
      act(() => {
        render(<SurveyPage survey={surveyDefault} />);
      });

      const progress_bar = await waitFor(() =>
        screen.getByTestId('progress_bar')
      );
      const progress_text = await waitFor(() =>
        screen.getByTestId('progress_text')
      );

      expect(progress_bar).toBeInTheDocument();
      expect(progress_text).toBeInTheDocument();
      expect(progress_bar.getAttribute('aria-valuenow')).toEqual('50');
      expect(progress_text.textContent).toEqual('1 / 2');
    });

    it('should update progress bar when answering a question', async () => {
      await act(async () => {
        render(<SurveyPage survey={surveyDefault} />);
      });

      const { getByTestId, getByText } = screen;

      const progress_bar = await waitFor(() =>
        getByTestId('progress_bar')
      );
      const progress_text = await waitFor(() =>
        getByTestId('progress_text')
      );
      const { questions } = mockSurvey;
      const [question] = questions;
      const option = question.options[0];
      const optionElement = await waitFor(() => getByText(option.name));

      act(() => {
        fireEvent.click(optionElement);
      });

      const testId = 'next_question_btn';
      const nextBtn = await waitFor(() => getByTestId(testId));

      act(() => {
        fireEvent.click(nextBtn);
      });

      await waitFor(() => {
        expect(mockCreate).toHaveBeenCalledTimes(1);
        expect(progress_bar.getAttribute('aria-valuenow')).toEqual('100');
        expect(progress_text.textContent).toEqual('2 / 2');
      });
    });
  });
});
