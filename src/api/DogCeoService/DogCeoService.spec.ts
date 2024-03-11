import { DogCeoService } from '.';
import {
  isResponseError, MockHttpAdapter,
} from '../../../lib';

describe('HttpService', () => {
  it('requestRandomImageByBreed success', async () => {
    const fakeResponse = {
      data: {
        message: 'https://images.dog.ceo/breeds/havanese/00100trPORTRAIT_00100_BURST20191103202017556_COVER.jpg',
        status: 'success',
      },
      headers: {},
      status: 200,
      url: 'breed/pitbull/images/random',
    };

    const service = new DogCeoService(new MockHttpAdapter({
      '/breed/pitbull/images/random': fakeResponse,
    }));

    const responseSuccess = await service.requestRandomImageByBreed('pitbull');

    expect(responseSuccess).toEqual(fakeResponse);
  });

  it('requestRandomImageByBreed not found', async () => {
    const service = new DogCeoService(new MockHttpAdapter({
      // fake responses
    }));

    const responseError = await service.requestRandomImageByBreed('foo-bar');

    const isError = isResponseError(responseError);

    expect(isError).toBeTruthy();

    expect(responseError).toEqual({
      data: {
        status: 'error',
      },
      headers: {},
      status: 404,
      url: '/error/404',
      error: 'BREED_NOT_FOUND',
    });
  });

  it('requestRandomImageByBreed custom error', async () => {
    const breed = 'foo-bar';

    const service = new DogCeoService(new MockHttpAdapter({
      [`/breed/${breed}/images/random`]: {
        data: {
          status: 'error',
        },
        headers: {},
        status: 401,
        url: `/breed/${breed}/images/random`,
        error: 'UNKNOWN',
      },
    }));

    const responseError = await service.requestRandomImageByBreed(breed);

    const isError = isResponseError(responseError);

    expect(isError).toBeTruthy();
    expect(responseError.status).toBe(401);
  });

  it('global error handler', async () => {
    const service = new DogCeoService(new MockHttpAdapter({
      // fake responses
    }));

    const response = await service.requestSimulateGlobalError();

    const isError = isResponseError(response);

    expect(isError).toBeTruthy();

    if (isError) {
      expect(response.error).toEqual('GLOBAL_NOT_FOUND');
    }
  });

  it('generic error handler', async () => {
    const service = new DogCeoService(new MockHttpAdapter({
      '/batatinha/123': {
        error: 'UNKNOWN',
      },
    }));

    const response = await service.requestSimulateGlobalError();

    const isError = isResponseError(response);

    expect(isError).toBeTruthy();

    if (isError) {
      expect(response.error).toEqual('GLOBAL_DOG_CEO_ERROR');
    }
  });

});
