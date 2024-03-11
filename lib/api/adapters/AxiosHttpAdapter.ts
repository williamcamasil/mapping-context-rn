import Axios, { AxiosInstance, AxiosError } from 'axios';

import { getLogger } from '../../utils';
import {
  ErrorIdentifierType,
  IHttpAdapter,
  IRequestOptions,
  IResponseError,
  IResponseSuccess,
  MethodsType,
} from '../IHttpAdapter';

export class AxiosHttpAdapter implements IHttpAdapter {

  private axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    if (axiosInstance === Axios) {
      throw new Error('Crie uma instância customizada do Axios para o ser ApiService. Use `Axios.create(...)`.');
    }
    this.axiosInstance = axiosInstance;
  }

  private handleAxiosError(
    error: AxiosError | Error | any,
  ): ErrorIdentifierType<any> {
    /* istanbul ignore next */
    if (__DEV__) {
      getLogger().warn(error);
    }

    if (!Axios.isAxiosError(error)) return 'UNKNOWN';

    if (!error.response?.status) {
      /**
       * Erros de rede, como por exemplo, quando o usuário está offline ou o servidor caiu.
       */
      return 'NETWORK';
    }

    if (error.response.status >= 500) {
      /**
       * Erros de servidor, onde o status é 500 ou superior
       */
      return 'SERVER';
    }

    return 'UNKNOWN';
  }

  private async executeRequest<SuccessData, ErrorData, RequestBody>(
    method: MethodsType,
    url: string,
    body?: RequestBody,
    options?: IRequestOptions,
  ): Promise<IResponseError<ErrorData, any> | IResponseSuccess<SuccessData>> {
    try {
      const response = await this.axiosInstance.request({
        url,
        method,
        data: body,
        params: options?.params,
        headers: options?.headers,
      });

      return {
        data: response.data,
        status: response.status,
        headers: response.headers,
        url: response.config.url!,
      };
    } catch (error) {
      if (Axios.isAxiosError(error)) {
        const responseError = {
          data: error.response?.data as ErrorData,
          status: error.response?.status,
          headers: error.response?.headers,
          url: error.response?.config?.url,
          error,
        };

        return {
          ...responseError,
          error: this.handleAxiosError(error),
        };
      }

      return {
        error: this.handleAxiosError(error),
      };
    }
  }

  get<SuccessData, ErrorData = SuccessData>(
    url: string,
    options?: IRequestOptions,
  ): Promise<IResponseError<ErrorData, any> | IResponseSuccess<SuccessData>> {
    return this.executeRequest('GET', url, undefined, options);
  }

  post<SuccessData, ErrorData = SuccessData, RequestBody = any>(
    url: string,
    body?: RequestBody,
    options?: IRequestOptions,
  ): Promise<IResponseError<ErrorData, any> | IResponseSuccess<SuccessData>> {
    return this.executeRequest('POST', url, body, options);
  }

  put<SuccessData, ErrorData = SuccessData, RequestBody = any>(
    url: string,
    body?: RequestBody,
    options?: IRequestOptions,
  ): Promise<IResponseError<ErrorData, any> | IResponseSuccess<SuccessData>> {
    return this.executeRequest('PUT', url, body, options);
  }

  patch<SuccessData, ErrorData = SuccessData, RequestBody = any>(
    url: string,
    body?: RequestBody,
    options?: IRequestOptions,
  ): Promise<IResponseError<ErrorData, any> | IResponseSuccess<SuccessData>> {
    return this.executeRequest('PATCH', url, body, options);
  }

  delete<SuccessData, ErrorData = SuccessData, RequestBody = any>(
    url: string,
    body?: RequestBody,
    options?: IRequestOptions,
  ): Promise<IResponseError<ErrorData, any> | IResponseSuccess<SuccessData>> {
    return this.executeRequest('DELETE', url, body, options);
  }

}
