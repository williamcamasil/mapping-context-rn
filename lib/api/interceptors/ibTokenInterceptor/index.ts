import { AxiosRequestConfig } from 'axios';

import { AppHolder } from '../../../context';
import { getBearerTokenInterceptor } from '../bearerTokenInterceptor';

export const ibTokenInterceptor = (request: AxiosRequestConfig) => {
  const token = AppHolder.getState().auth?.ibAccessToken!;
  return getBearerTokenInterceptor(request, token);
};
