import { AxiosRequestConfig } from 'axios';

import { AppHolder } from '../../../context';
import { getBearerTokenInterceptor } from '../bearerTokenInterceptor';

export const accessTokenInterceptor = (request: AxiosRequestConfig) => {
  const token = AppHolder.getState().auth?.accessToken!;
  return getBearerTokenInterceptor(request, token);
};

