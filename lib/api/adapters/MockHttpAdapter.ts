import {
  IHttpAdapter,
  IRequestOptions,
  IResponseError,
  IResponseSuccess,
  MethodsType,
} from '../IHttpAdapter';

export type MockSuccessDataType = {
  status: 'success';
};

export type MockErrorDataType = {
  status: 'error';
};

type FakeResponsesType = {
  [key: string]: IResponseError<any, any> | IResponseSuccess<any> | (
    (
      method: MethodsType,
      url: string,
      body?: any,
      options?: IRequestOptions,
    ) => IResponseError<any, any> | IResponseSuccess<any>
  );
};

export const FAKE_RESPONSES: FakeResponsesType = {
  '/success/200': {
    data: {
      status: 'success',
    },
    headers: {},
    status: 200,
    url: '/success/200',
  },
  '/error/404': {
    data: {
      status: 'error',
    },
    headers: {},
    status: 404,
    url: '/error/404',
    error: 'UNKNOWN',
  },
  '/error/500': {
    data: {
      status: 'error',
    },
    headers: {},
    status: 500,
    url: '/error/500',
    error: 'SERVER',
  },
  '/error/network': {
    url: '/error/network',
    error: 'NETWORK',
  },
  '/error/unknown': {
    error: 'UNKNOWN',
  },
};

export class MockHttpAdapter implements IHttpAdapter {

  private fakeResponses: FakeResponsesType;

  constructor(fakeResponses?: FakeResponsesType) {
    this.fakeResponses = fakeResponses ?? FAKE_RESPONSES;
  }

  private async executeRequest(
    method: MethodsType,
    url: string,
    body?: any,
    options?: IRequestOptions,
  ): Promise<IResponseError<any, any> | IResponseSuccess<any>> {
    // Resolve uma Promise vazia apenas para simular uma chamada
    // assíncrona para permitir que os casos de testes mais rodem
    // mais próximo do real.
    await Promise.resolve();

    const request = this.fakeResponses[url] || FAKE_RESPONSES['/error/404'];

    if (typeof request === 'function') {
      return request(method, url, body, options);
    }

    return request;
  }

  public updateFakeResponses(fakeResponses: FakeResponsesType) {
    this.fakeResponses = {
      ...this.fakeResponses,
      ...fakeResponses,
    };
  }

  public setFakeResponses(fakeResponses: FakeResponsesType) {
    this.fakeResponses = fakeResponses;
  }

  async get<SuccessData = MockSuccessDataType, ErrorData = MockErrorDataType>(
    url: string,
    options?: IRequestOptions,
  ): Promise<IResponseError<ErrorData, any> | IResponseSuccess<SuccessData>> {
    return this.executeRequest('GET', url, undefined, options);
  }

  async post<SuccessData = MockSuccessDataType, ErrorData = MockErrorDataType, RequestBody = any>(
    url: string,
    body?: RequestBody,
    options?: IRequestOptions,
  ): Promise<IResponseError<ErrorData, any> | IResponseSuccess<SuccessData>> {
    return this.executeRequest('POST', url, body, options);
  }

  async put<SuccessData = MockSuccessDataType, ErrorData = MockErrorDataType, RequestBody = any>(
    url: string,
    body?: RequestBody,
    options?: IRequestOptions,
  ): Promise<IResponseError<ErrorData, any> | IResponseSuccess<SuccessData>> {
    return this.executeRequest('PUT', url, body, options);
  }

  async patch<SuccessData = MockSuccessDataType, ErrorData = MockErrorDataType, RequestBody = any>(
    url: string,
    body?: RequestBody,
    options?: IRequestOptions,
  ): Promise<IResponseError<ErrorData, any> | IResponseSuccess<SuccessData>> {
    return this.executeRequest('PATCH', url, body, options);
  }

  async delete<SuccessData = MockSuccessDataType, ErrorData = MockErrorDataType, RequestBody = any>(
    url: string,
    body?: RequestBody,
    options?: IRequestOptions,
  ): Promise<IResponseError<ErrorData, any> | IResponseSuccess<SuccessData>> {
    return this.executeRequest('DELETE', url, body, options);
  }

}
