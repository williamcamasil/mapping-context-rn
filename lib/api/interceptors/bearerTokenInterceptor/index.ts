import { AxiosRequestConfig } from 'axios';

export const getBearerTokenInterceptor = (request: AxiosRequestConfig, token: string) => {
  request.headers = request.headers || {};

  if (!request.headers.authorization && token) {
    request.headers.authorization = `Bearer ${token}`;
  }

  return request;
};

