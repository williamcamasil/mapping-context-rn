import Axios from 'axios';

import {
  AxiosHttpAdapter,
  ErrorHandlerType,
  ErrorIdentifierType,
  HttpService,
  IHttpAdapter,
  IResponseError,
} from '../../../lib';
import ENV from '../../env';

export type DogCeoResponseDataType = {
  message: string;
  status: 'success' | 'error';
};

export type DogCeoErrorType = ErrorIdentifierType<
'GLOBAL_DOG_CEO_ERROR' |
'GLOBAL_NOT_FOUND' |
'BREED_NOT_FOUND'
>;

const dogCeoGlobalErrorHandler: ErrorHandlerType<
IResponseError<any, DogCeoErrorType>,
DogCeoErrorType
> = response => {
  if (response.status === 404) {
    return 'GLOBAL_NOT_FOUND';
  }

  return 'GLOBAL_DOG_CEO_ERROR';
};

export class DogCeoService extends HttpService<DogCeoErrorType> {

  constructor(apiAdapter: IHttpAdapter) {
    super(apiAdapter, dogCeoGlobalErrorHandler);
  }

  requestSimulateGlobalError() {
    return this.get('/batatinha/123');
  }

  requestRandomImageByBreed(breed: string) {
    return this.get<DogCeoResponseDataType>(`/breed/${breed}/images/random`, undefined, response => {
      if (response.status === 404) {
        return 'BREED_NOT_FOUND';
      }

      return 'UNKNOWN';
    });
  }

}

const axios = Axios.create({
  baseURL: ENV.getValue('dogApiBaseUrl'),
  // headers: {
  //   'Content-Type': 'application/x-www-form-data',
  // },
});

// axios.interceptors.request.use(request => {
//   request.headers = request.headers || {};

//   if (!request.headers.authorization) {
//     request.headers.authorization = 'token';
//   }

//   return request;
// });

// axios.interceptors.response.use(response => {
//   if (!response.data.Sucesso) {
//     response.status = 400;
//     throw new AxiosErrorImpl(response);
//   }
//   return response;
// }, error => Promise.reject(error));

const dogCeoServiceInstance = new DogCeoService(
  new AxiosHttpAdapter(
    axios,
  ),
);

export default dogCeoServiceInstance;
