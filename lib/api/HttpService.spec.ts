import {
  FAKE_RESPONSES, MockErrorDataType, MockHttpAdapter, MockSuccessDataType,
} from './adapters/MockHttpAdapter';
import { HttpService } from './HttpService';
import {
  ErrorHandlerType, ErrorIdentifierType, IResponseError, isResponseError,
} from './IHttpAdapter';

type MockErrorType = ErrorIdentifierType<'GLOBAL_MOCK_ERROR' | 'LOCAL_MOCK_ERROR'>;

const globalErrorHandler: ErrorHandlerType<
IResponseError<MockErrorDataType, MockErrorType>,
MockErrorType
> = response => {
  if (response.data?.status === 'error') {
    return 'GLOBAL_MOCK_ERROR';
  }

  return 'UNKNOWN';
};

class MockService extends HttpService<MockErrorType> {

  constructor(errorHandler?: ErrorHandlerType<IResponseError<MockErrorDataType, MockErrorType>, MockErrorType>) {
    super(new MockHttpAdapter(), errorHandler);
  }

  serviceGetSuccess() {
    return this.get<MockSuccessDataType, MockErrorDataType>('/success/200', undefined);
  }

  serviceGetLocalError() {
    return this.get<MockSuccessDataType, MockErrorDataType>('/error/404', undefined, response => {
      if (response.data?.status === 'error') {
        return 'LOCAL_MOCK_ERROR';
      }

      return 'UNKNOWN';
    });
  }

  serviceGetGlobalError() {
    return this.get<MockSuccessDataType, MockErrorDataType>('/error/404', undefined);
  }

  servicePostSuccess() {
    return this.post<MockSuccessDataType, MockErrorDataType>('/success/200');
  }

  servicePutSuccess() {
    return this.put<MockSuccessDataType, MockErrorDataType>('/success/200');
  }

  servicePatchSuccess() {
    return this.patch<MockSuccessDataType, MockErrorDataType>('/success/200');
  }

  serviceDeleteSuccess() {
    return this.delete<MockSuccessDataType, MockErrorDataType>('/success/200');
  }

}

describe('HttpService', () => {
  it('all methods', async () => {
    const service = new MockService();

    const responses = await Promise.all([
      service.serviceGetSuccess(),
      service.servicePostSuccess(),
      service.servicePutSuccess(),
      service.servicePatchSuccess(),
      service.serviceDeleteSuccess(),
    ]);

    responses.forEach(response => {
      expect(response).toEqual(FAKE_RESPONSES['/success/200']);
    });
  });

  it('global error handler', async () => {
    const service = new MockService(globalErrorHandler);

    const response = await service.serviceGetGlobalError();

    const isError = isResponseError(response);

    expect(isError).toBeTruthy();

    if (isError) {
      expect(response.error).toEqual('GLOBAL_MOCK_ERROR');
    }
  });

  it('local error handler', async () => {
    const service = new MockService(globalErrorHandler);

    const response = await service.serviceGetLocalError();

    const isError = isResponseError(response);

    expect(isError).toBeTruthy();

    if (isError) {
      expect(response.error).toEqual('LOCAL_MOCK_ERROR');
    }
  });

  it('unknown error', async () => {
    const service = new MockService();

    const response = await service.serviceGetGlobalError();

    const isError = isResponseError(response);

    expect(isError).toBeTruthy();

    if (isError) {
      expect(response.error).toEqual('UNKNOWN');
    }
  });

});
