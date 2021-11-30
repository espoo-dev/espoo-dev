import { AxiosRequestConfig, AxiosResponse } from "axios";
import { httpClient } from ".";

jest.mock("next/router");

const requestInterceptor = () => {
  return httpClient.interceptors.request['handlers'][0];
}

const responseInterceptor = ()=> {
  return httpClient.interceptors.response['handlers'][0];
}

const mockRequest: AxiosRequestConfig = {
  url: undefined,
  headers: {}
}

const mockResponse = {
  response: {
    status: undefined,
  }
}

describe('Client interceptors', () => {
  describe('Request interceptors', () => {
    it('should work without authorization when endpoint is public', () => {
      mockRequest.url = '/users/sign_in';
      const resolvedReq = requestInterceptor().fulfilled(mockRequest);
      expect(resolvedReq).toMatchObject(mockRequest);
      expect('Authorization' in resolvedReq.headers).toBeFalsy();
    });
    it('should work with authorization when endpoint is private', () => {
      mockRequest.url = '/users/test';
      const resolvedReq = requestInterceptor().fulfilled(mockRequest);
      expect(resolvedReq).toMatchObject(mockRequest);
      expect('Authorization' in resolvedReq.headers).toBeTruthy();
    });
    it('should fail without authorization when endpoint is private', () => {
      const mockError = new Error('test');
      const rejectedReq = requestInterceptor().rejected(mockError);
      expect(rejectedReq).rejects.toMatchObject<Error>(mockError);
    });
  });

  describe('Response interceptors', () => {
    it('should return correct response when response status is 200', () => {
      mockResponse.response.status = 200;
      const resolvedRes = responseInterceptor().fulfilled(mockResponse);
      expect(resolvedRes).toMatchObject(mockResponse);
    });

    it('should return error without redirect when response status is 400', () => {
      mockResponse.response.status = 400;
      const rejectedRes = responseInterceptor().rejected(mockResponse);
      expect(rejectedRes).rejects.toMatchObject(mockResponse);
    });

    it('should return error and redirect when response status is 401', () => {
      mockResponse.response.status = 401;
      const rejectedRes = responseInterceptor().rejected(mockResponse);
      expect(rejectedRes).rejects.toMatchObject(mockResponse);
    });
  });
});
