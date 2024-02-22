import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export class AxiosErrorImpl<ResponseData> extends Error implements AxiosError {

  config: AxiosRequestConfig;

  code?: string;

  request?: any;

  response?: AxiosResponse<ResponseData>;

  isAxiosError = true;

  toJSON: () => object;

  constructor(response: AxiosResponse<ResponseData>, code?: string) {
    super('Custom axios error');
    this.response = response;
    this.request = response.request;
    this.config = response.config;
    this.code = code;
    this.toJSON = () => ({
      config: this.config,
      code: this.code,
      request: this.request,
      response: this.response,
    });
  }

}
