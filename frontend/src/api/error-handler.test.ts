import { AxiosError, AxiosInstance } from 'axios';
import { httpClient } from '.';
import { AuthService } from './services';
import { UserCreate } from './models/user';

const mockUserCreate: UserCreate = {
  email: 'admin@gmail.com',
  password: '123456',
  role_id: 1,
};

jest.mock('.', () => ({
  httpClient: {
    post: jest.fn(),
  },
}));

describe('Error Handler', () => {
  const axiosErrorDefault: AxiosError<any> = {
    config: {},
    isAxiosError: true,
    toJSON: () => ({}),
    message: 'Error to start survey',
    name: 'teste',
    response: {
      status: 400,
      config: {},
      data: {
        error: 'teste',
      },
      statusText: 'bad request',
      headers: {},
    },
  };
  let instance: AuthService;

  const sut = async (error = axiosErrorDefault) => {
    (httpClient as jest.Mocked<AxiosInstance>).post.mockImplementationOnce(
      jest.fn((url: string, body: UserCreate) => {
        return Promise.reject(error);
      })
    );
    instance = new AuthService(httpClient as any);
    return await instance.register(mockUserCreate);
  };

  it('should create toast with error', async () => {
    sut();
    expect(httpClient.post).toHaveBeenCalled();
  });

  it('should create toast with error message in data response', async () => {
    const errorWithMessage = { ...axiosErrorDefault };
    errorWithMessage.response.data = {
      error_message: 'Error to start survey',
    };
    sut(errorWithMessage);
    expect(httpClient.post).toHaveBeenCalled();
  });

  it('should create toast without error message', async () => {
    const errorWithoutMessage = { ...axiosErrorDefault };
    errorWithoutMessage.response.data = {};
    delete errorWithoutMessage.message;
    sut(errorWithoutMessage);
    expect(httpClient.post).toHaveBeenCalled();
  });
});
