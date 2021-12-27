import { httpClient } from '@api/client';
import { AnswerCreate } from '@api/models/answer';
import { AxiosInstance } from 'axios';
import { fireEvent, render, screen, waitFor } from 'test-utils';
import SingleChoice from './single-choice';

const options = [
  {
    id: 1,
    name: 'Cat',
  },
  {
    id: 2,
    name: 'Dog',
  },
  {
    id: 3,
    name: 'A bigger name',
  },
];

jest.mock('../../api/client', () => ({
  httpClient: {
    post: jest.fn(),
  },
}));

describe('SingleChoice', () => {
  it('should render all options', () => {
    render(<SingleChoice options={options} setResult={jest.fn()} />);
    options.map((option) => {
      expect(screen.getByText(option.name)).toBeInTheDocument();
    });
  });

  it('should call api when click in any option', async () => {
    const mockResponse = {
      mock: true,
    };

    (httpClient as jest.Mocked<AxiosInstance>).post.mockImplementationOnce(
      jest.fn((url: string, body: AnswerCreate) => {
        return Promise.resolve({ data: mockResponse });
      })
    );

    const { getByText } = render(
      <SingleChoice options={options} setResult={jest.fn()} />
    );
    const buttonItem = getByText('Cat');
    fireEvent.click(buttonItem);

    await waitFor(() =>
      expect(httpClient.post).toHaveBeenCalledWith('api/v1/answers', {
        question_id: 853,
        answers_survey_id: 121,
        user_answer: 'student@gmail.com',
        option_ids: [1],
      })
    );
  });
});
