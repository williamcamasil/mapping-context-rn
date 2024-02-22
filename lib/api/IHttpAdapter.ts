export interface IResponseSuccess<T> {
  data: T;
  status: number;
  headers: {
    [key: string]: string;
  };
  url: string;
}

export type MethodsType = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export type ErrorIdentifierType<ErrorType extends string> = ErrorType | 'SERVER' | 'NETWORK' | 'UNKNOWN';

export type ErrorLegacyType = {
  status: string;
  mappingSpanId?: string;
  Tipo?: string;
  Sucesso?: boolean;
  Existe?: boolean;
  Mensagem?: string;
};

export type ErrorDefaultType = {
  status: string;
  messages?: string[];
  mappingSpanId?: string;
  error_description?: string;
};

export type ErrorDataType = ErrorLegacyType & ErrorDefaultType;

export type ErrorHandlerType<Response, ErrorType extends string> = (
  response: Response
) => ErrorIdentifierType<ErrorType>;

export function isResponseError<SuccessData, ErrorData, ErrorType extends string>(
  response: IResponseSuccess<SuccessData> | IResponseError<ErrorData, ErrorType>,
): response is IResponseError<ErrorData, ErrorType> {
  return 'error' in response;
}

export interface IResponseError<ErrorData, ErrorType extends string>
  extends Partial<IResponseSuccess<ErrorData>> {
  error: ErrorIdentifierType<ErrorType>;
}

export interface IRequestOptions {
  headers?: {
    [key: string]: string | number | boolean;
  };
  params?: {
    [key: string]: any;
  };
}

export interface IHttpAdapter {

  get<SuccessData, ErrorData = ErrorDataType>(
    url: string,
    params?: IRequestOptions,
  ): Promise<IResponseSuccess<SuccessData> | IResponseError<ErrorData, any>>;

  post<SuccessData, ErrorData = ErrorDataType, RequestBody = any>(
    url: string,
    body?: RequestBody,
    options?: IRequestOptions,
  ): Promise<IResponseSuccess<SuccessData> | IResponseError<ErrorData, any>>;

  put<SuccessData, ErrorData = ErrorDataType, RequestBody = any>(
    url: string,
    body?: RequestBody,
    options?: IRequestOptions,
  ): Promise<IResponseSuccess<SuccessData> | IResponseError<ErrorData, any>>;

  patch<SuccessData, ErrorData = ErrorDataType, RequestBody = any>(
    url: string,
    body?: RequestBody,
    options?: IRequestOptions,
  ): Promise<IResponseSuccess<SuccessData> | IResponseError<ErrorData, any>>;

  delete<SuccessData, ErrorData = ErrorDataType, RequestBody = any>(
    url: string,
    body?: RequestBody,
    options?: IRequestOptions,
  ): Promise<IResponseSuccess<SuccessData> | IResponseError<ErrorData, any>>;

}
