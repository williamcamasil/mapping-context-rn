import Axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { createLogger } from '../../utils/log/factory';
import { isResponseError } from '../IHttpAdapter';
import { AxiosErrorImpl } from './AxiosErrorImpl';
import { AxiosHttpAdapter } from './AxiosHttpAdapter';

const axiosInstance = Axios.create({
  baseURL: 'http://localhost',
});

const mock = new AxiosMockAdapter(axiosInstance);

createLogger({
  appName: 'test',
  eventEmitterDebug: false,
  reactotron: false,
});

beforeEach(() => {
  mock.reset();
});

describe('AxiosHttpAdapter', () => {
  it('should call get/delete params and headers', async () => {
    const adapter = new AxiosHttpAdapter(axiosInstance);

    const responseData = {
      status: 'success',
    };

    mock.onAny('/').reply(200, responseData);

    const testRequest = async (method: 'get') => {
      const response = await adapter[method]('/', {
        params: {
          nome: 'Douglas',
        },
        headers: {
          Authorization: 'token-123',
        },
      });

      expect(mock.history[method][0].params.nome).toBe('Douglas');
      expect(mock.history[method][0].headers?.Authorization).toBe('token-123');

      expect(response.data).toEqual(responseData);
      expect(response.status).toEqual(200);
    };

    await Promise.all([
      testRequest('get'),
    ]);
  });

  it('should call post/put/patch params and headers', async () => {
    const adapter = new AxiosHttpAdapter(axiosInstance);

    const responseData = {
      status: 'success',
    };

    mock.onAny('/').reply(200, responseData);

    const testRequest = async (method: 'post' | 'put' | 'patch' | 'delete') => {
      const requestData = {
        foo: 'bar',
      };

      const response = await adapter[method](
        '/',
        requestData,
        {
          params: {
            nome: 'Douglas',
          },
          headers: {
            Authorization: 'token-123',
          },
        },
      );

      expect(mock.history[method][0].params.nome).toBe('Douglas');
      expect(mock.history[method][0].headers?.Authorization).toBe('token-123');
      expect(JSON.parse(mock.history[method][0].data)).toEqual(requestData);

      expect(response.data).toEqual(responseData);
      expect(response.status).toEqual(200);
    };

    await Promise.all([
      testRequest('post'),
      testRequest('put'),
      testRequest('patch'),
      testRequest('delete'),
    ]);
  });

  it('should prevent global axios', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new AxiosHttpAdapter(Axios);
    }).toThrowError();
  });

  it('should handle js error', async () => {
    const adapter = new AxiosHttpAdapter(axiosInstance);

    mock.onAny('/').reply(() => {
      throw new Error('forced error');
    });

    const response = await adapter.get('/');

    const isError = isResponseError(response);

    expect(isError).toBeTruthy();

    if (isError) {
      expect(response.error).toBe('UNKNOWN');
    }
  });

  it('should handle axios error', async () => {
    const adapter = new AxiosHttpAdapter(axiosInstance);

    const responseData = {
      status: 'error',
    };

    mock.onAny('/').reply(404, responseData);

    const response = await adapter.get('/');

    expect(response.data).toEqual(responseData);

    const isError = isResponseError(response);

    expect(isError).toBeTruthy();

    if (isError) {
      expect(response.error).toBe('UNKNOWN');
    }
  });

  it('should handle network error', async () => {
    const adapter = new AxiosHttpAdapter(axiosInstance);

    mock.onAny('/').networkError();

    const response = await adapter.get('/');

    const isError = isResponseError(response);

    expect(isError).toBeTruthy();

    if (isError) {
      expect(response.error).toBe('NETWORK');
    }
  });

  it('should handle server error', async () => {
    const adapter = new AxiosHttpAdapter(axiosInstance);

    const responseData = {
      status: 'error',
    };

    mock.onAny('/').reply(500, responseData);

    const response = await adapter.get('/');

    expect(response.data).toEqual(responseData);

    const isError = isResponseError(response);

    expect(isError).toBeTruthy();

    if (isError) {
      expect(response.error).toBe('SERVER');
    }
  });

  it('should handle custom axios error', async () => {
    const customAxiosInstance = Axios.create({
      baseURL: 'http://localhost',
    });

    const responseErrorData = {
      success: false,
    };

    const responseSuccessData = {
      success: true,
    };

    const customMock = new AxiosMockAdapter(customAxiosInstance);

    customMock.onAny('/success').reply(200, responseSuccessData);
    customMock.onAny('/error').reply(200, responseErrorData);

    customAxiosInstance.interceptors.response.use(response => {
      if (!response.data.success) {
        response.status = 400;
        throw new AxiosErrorImpl(response);
      }
      return response;
    }, error => Promise.reject(error));

    const adapter = new AxiosHttpAdapter(customAxiosInstance);

    const responseError = await adapter.get('/error');

    const isError = isResponseError(responseError);

    expect(isError).toBeTruthy();
    if (isError) {
      expect(responseError.error).toBe('UNKNOWN');
    }
    expect(responseError.data).toEqual(responseErrorData);
    expect(responseError.status).toBe(400);

    const responseSuccess = await adapter.get('/success');
    expect(responseSuccess.data).toEqual(responseSuccessData);
    expect(responseSuccess.status).toBe(200);
  });
});

describe('AxiosErrorImpl', () => {

  it('should return object with toJSON', async () => {
    const customAxiosInstance = Axios.create({
      baseURL: 'http://localhost',
    });

    const customMock = new AxiosMockAdapter(customAxiosInstance);
    customMock.onAny('/').reply(200, {});

    const response = await customAxiosInstance.get('/');

    const customError = new AxiosErrorImpl(response, 'ERROR_CODE');

    expect(customError.toJSON()).toEqual({
      config: response.config,
      code: 'ERROR_CODE',
      request: response.request,
      response,
    });
  });

});
