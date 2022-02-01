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

    it('should select an option', () => {
      const mockSurvey = JSON.parse(JSON.stringify(surveyDefault));

      render(<SurveyPage survey={mockSurvey} />);
      const option = mockSurvey.current_answers_survey.questions[0].options[0];
      const optionElement = screen.getByText(option.name);
      expect(optionElement).toBeInTheDocument();

      act(() => {
        fireEvent.click(optionElement);
      });

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

      const progress_bar = await waitFor(() =>
        screen.getByTestId('progress_bar')
      );
      const progress_text = await waitFor(() =>
        screen.getByTestId('progress_text')
      );
      const option =
        surveyDefault.current_answers_survey.questions[0].options[0];
      const optionElement = await waitFor(() => screen.getByText(option.name));

      act(() => {
        fireEvent.click(optionElement);
      });

      await waitFor(() => {
        expect(mockCreate).toHaveBeenCalledTimes(1);
        expect(progress_bar.getAttribute('aria-valuenow')).toEqual('100');
        expect(progress_text.textContent).toEqual('2 / 2');
      });
    });
  });
});
