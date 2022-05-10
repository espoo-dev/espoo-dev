import { Question, Survey } from '@api/models/survey';
import { AxiosResponse } from 'axios';
import { act, fireEvent, render, screen, waitFor } from 'test-utils';
import surveyMock from 'utils/mocks/survey';
import * as service from '../../api/services/answers';
import { SurveyHandler } from './survey-handler';

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
    } as unknown as AxiosResponse<Question>)
  );
};

describe('SurveyHandler', () => {
  describe('Questions', () => {
    const mockCreate = service.AnswerService.prototype.create;
    const surveyDefault: Survey = JSON.parse(JSON.stringify(surveyMock));

    beforeEach(() => {
      doServiceMock();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should render first question', () => {
      render(<SurveyHandler survey={surveyDefault} />);
      expect(
        screen.getByText('What is your favorite animal?')
      ).toBeInTheDocument();

      expect(screen.getByText('Question 1')).toBeInTheDocument();
    });

    it('should not render next button when does not has a question', () => {
      const mockSurvey = JSON.parse(JSON.stringify(surveyDefault)) as Survey;
      mockSurvey.current_answers_survey.questions = [];
      render(<SurveyHandler survey={mockSurvey} />);
      expect(screen.queryByTestId('next_question_btn')).not.toBeInTheDocument();
    });

    it('should render all question options to question', () => {
      render(<SurveyHandler survey={surveyDefault} />);
      surveyDefault.current_answers_survey.questions[0].options.forEach(
        (option) => {
          expect(screen.getByText(option.name)).toBeInTheDocument();
        }
      );
    });

    it('should render the Next question button disabled', () => {
      const mockSurvey = JSON.parse(JSON.stringify(surveyDefault));
      const nextBtnId = 'next_question_btn';

      const { getByTestId } = render(<SurveyHandler survey={mockSurvey} />);
      const nextBtn = getByTestId(nextBtnId);

      expect(nextBtn).toBeInTheDocument();
      expect(nextBtn).toBeDisabled();
    });

    it('should enable next button when selecting a question', () => {
      const mockSurvey = JSON.parse(JSON.stringify(surveyDefault));
      const { current_answers_survey } = mockSurvey;
      const [question] = current_answers_survey.questions;

      const { getByTestId, getByText } = render(
        <SurveyHandler survey={mockSurvey} />
      );
      const option = question.options[0];
      const optionElement = getByText(option.name);
      expect(optionElement).toBeInTheDocument();

      act(() => {
        fireEvent.click(optionElement);
      });

      const nextBtnId = 'next_question_btn';

      const nextBtn = getByTestId(nextBtnId);

      expect(nextBtn).toBeInTheDocument();
      expect(nextBtn).toBeEnabled();
    });

    it('should call answerService.create when clicking next button', async () => {
      const mockSurvey = JSON.parse(JSON.stringify(surveyDefault));
      const { current_answers_survey } = mockSurvey;
      const [question] = current_answers_survey.questions;

      act(() => {
        render(<SurveyHandler survey={mockSurvey} />);
      });

      const { getByTestId, getByText } = screen;

      const option = question.options[0];
      const optionElement = await waitFor(() => getByText(option.name));

      await act(async () => {
        fireEvent.click(optionElement);
      });

      const nextBtnId = 'next_question_btn';

      const nextBtn = await waitFor(() => getByTestId(nextBtnId));

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

      render(<SurveyHandler survey={surveyIncomplete} />);
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
    const surveyDefault: Survey = JSON.parse(JSON.stringify(surveyMock));

    beforeEach(() => {
      doServiceMock();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should render the progress component', async () => {
      act(() => {
        render(<SurveyHandler survey={surveyDefault} />);
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
        render(<SurveyHandler survey={surveyDefault} />);
      });

      const { getByTestId, getByText } = screen;

      const progress_bar = await waitFor(() => getByTestId('progress_bar'));
      const progress_text = await waitFor(() => getByTestId('progress_text'));
      const { current_answers_survey } = surveyMock;
      const [question] = current_answers_survey.questions;
      const option = question.options[0];
      const optionElement = await waitFor(() => getByText(option.name));

      act(() => {
        fireEvent.click(optionElement);
      });

      const nextBtnId = 'next_question_btn';
      const nextBtn = await waitFor(() => getByTestId(nextBtnId));

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

  describe('Question image', () => {
    const surveyDefault: Survey = JSON.parse(JSON.stringify(surveyMock));

    it('should not render an image when question does not have an image url', () => {
      const mockSurvey = JSON.parse(JSON.stringify(surveyDefault)) as Survey;
      mockSurvey.current_answers_survey.questions[0].image_url = '';
      render(<SurveyHandler survey={mockSurvey} />);
      expect(screen.queryByTestId("question_image")).not.toBeInTheDocument();
    })

    it('should render an image when question has an image url', () => {
      const mockSurvey = JSON.parse(JSON.stringify(surveyDefault)) as Survey;
      mockSurvey.current_answers_survey.questions[0].image_url = 'image_test.png';
      render(<SurveyHandler survey={mockSurvey} />);
      const image = screen.getByTestId("question_image");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'image_test.png');
    })
  })
});
