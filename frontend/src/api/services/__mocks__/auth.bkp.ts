import { AxiosInstance } from 'axios';
import { httpClient } from '../../client';

jest.mock('../../client');

const mockClient = httpClient as unknown as jest.Mock<AxiosInstance>;

const mockAuth = jest.fn().mockImplementation(() => {
  return {
    authenticate: jest.fn(() => mockClient().post('')),
    register: jest.fn(() => Promise.resolve({ data: {} })),
  };
});

export const AuthService = mockAuth;
