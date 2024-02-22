
import {
  ErrorDataType,
  ErrorHandlerType, IHttpAdapter, IRequestOptions, IResponseError, IResponseSuccess, isResponseError,
} from './IHttpAdapter';

export abstract class HttpService<ErrorType extends string = 'UNKNOWN'> {

  private apiAdapter: IHttpAdapter;

  private errorHandler?: ErrorHandlerType<any, ErrorType>;

  constructor(
    apiAdapter: IHttpAdapter,
    errorHandler?: ErrorHandlerType<any, ErrorType>,
  ) {
    this.apiAdapter = apiAdapter;
    this.errorHandler = errorHandler;
  }

  private async requestHandler<SuccessData, ErrorData = ErrorDataType>(
    request: Promise<IResponseSuccess<SuccessData> | IResponseError<ErrorData, ErrorType>>,
    errorHandler?: ErrorHandlerType<IResponseError<ErrorData, ErrorType>, ErrorType>,
  ): Promise<IResponseSuccess<SuccessData> | IResponseError<ErrorData, ErrorType>> {
    const response = await request;

    if (!isResponseError(response)) {
      return response;
    }

    let { error } = response;

    if (error === 'UNKNOWN' && errorHandler) {
      error = errorHandler(response);
    }

    if (error === 'UNKNOWN' && this.errorHandler) {
      error = this.errorHandler(response);
    }

    return {
      ...response,
      error,
    };
  }

  protected get<SuccessData, ErrorData = ErrorDataType>(
    url: string,
    options?: IRequestOptions,
    errorHandler?: ErrorHandlerType<IResponseError<ErrorData, ErrorType>, ErrorType>,
  ): Promise<IResponseError<ErrorData, ErrorType> | IResponseSuccess<SuccessData>> {
    return this.requestHandler(
      this.apiAdapter.get(url, options),
      errorHandler,
    );
  }

  protected post<SuccessData, ErrorData = ErrorDataType, RequestBody = any>(
    url: string,
    body?: RequestBody,
    options?: IRequestOptions,
    errorHandler?: ErrorHandlerType<IResponseError<ErrorData, ErrorType>, ErrorType>,
  ): Promise<IResponseError<ErrorData, ErrorType> | IResponseSuccess<SuccessData>> {
    return this.requestHandler(
      this.apiAdapter.post(url, body, options),
      errorHandler,
    );
  }

  protected put<SuccessData, ErrorData = ErrorDataType, RequestBody = any>(
    url: string,
    body?: RequestBody,
    options?: IRequestOptions,
    errorHandler?: ErrorHandlerType<IResponseError<ErrorData, ErrorType>, ErrorType>,
  ): Promise<IResponseError<ErrorData, ErrorType> | IResponseSuccess<SuccessData>> {
    return this.requestHandler(
      this.apiAdapter.put(url, body, options),
      errorHandler,
    );
  }

  protected patch<SuccessData, ErrorData = ErrorDataType, RequestBody = any>(
    url: string,
    body?: RequestBody,
    options?: IRequestOptions,
    errorHandler?: ErrorHandlerType<IResponseError<ErrorData, ErrorType>, ErrorType>,
  ): Promise<IResponseError<ErrorData, ErrorType> | IResponseSuccess<SuccessData>> {
    return this.requestHandler(
      this.apiAdapter.patch(url, body, options),
      errorHandler,
    );
  }

  protected delete<SuccessData, ErrorData = ErrorDataType, RequestBody = any>(
    url: string,
    body?: RequestBody,
    options?: IRequestOptions,
    errorHandler?: ErrorHandlerType<IResponseError<ErrorData, ErrorType>, ErrorType>,
  ): Promise<IResponseError<ErrorData, ErrorType> | IResponseSuccess<SuccessData>> {
    return this.requestHandler(
      this.apiAdapter.delete(url, body, options),
      errorHandler,
    );
  }

}
