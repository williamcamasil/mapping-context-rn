import { } from '@testing-library/react-native';

import { FAKE_RESPONSES, MockHttpAdapter } from './MockHttpAdapter';

describe('MockHttpAdapter', () => {
  it('all methods', async () => {
    const adapter = new MockHttpAdapter();

    const responses = await Promise.all([
      adapter.get('/success/200'),
      adapter.post('/success/200'),
      adapter.patch('/success/200'),
      adapter.put('/success/200'),
      adapter.delete('/success/200'),
    ]);

    responses.forEach(response => {
      expect(response).toEqual(FAKE_RESPONSES['/success/200']);
    });
  });

  it('erros', async () => {
    const adapter = new MockHttpAdapter();

    const expectedResponses = [
      '/error/404',
      '/error/500',
      '/error/network',
      '/error/unknown',
    ];

    const responses = await Promise.all(expectedResponses.map(url => adapter.get(url)));

    expect(responses).toEqual(expectedResponses.map(url => FAKE_RESPONSES[url]));
  });

  it('not found', async () => {
    const adapter = new MockHttpAdapter();

    const response = await adapter.get('/foo/bar');

    expect(response).toEqual(FAKE_RESPONSES['/error/404']);
  });

  it('update responses', async () => {
    const adapter = new MockHttpAdapter();

    let response = await adapter.get('/foo/bar');

    expect(response).toEqual(FAKE_RESPONSES['/error/404']);

    adapter.updateFakeResponses({
      '/foo/bar': {
        data: {
          status: 'success',
        },
        headers: {},
        status: 200,
        url: '/foo/bar',
      },
    });

    response = await adapter.get('/foo/bar');

    expect(response).toEqual({
      data: {
        status: 'success',
      },
      headers: {},
      status: 200,
      url: '/foo/bar',
    });
  });

  it('set responses', async () => {
    const adapter = new MockHttpAdapter();

    let response = await adapter.get('/foo/bar');

    expect(response).toEqual(FAKE_RESPONSES['/error/404']);

    adapter.setFakeResponses({
      '/foo/bar': {
        data: {
          status: 'success',
        },
        headers: {},
        status: 200,
        url: '/foo/bar',
      },
    });

    response = await adapter.get('/foo/bar');

    expect(response).toEqual({
      data: {
        status: 'success',
      },
      headers: {},
      status: 200,
      url: '/foo/bar',
    });
  });

  it('functional responses', async () => {
    const adapter = new MockHttpAdapter({
      '/foo/bar': () => ({
        data: {
          status: 'success',
        },
        headers: {},
        status: 200,
        url: '/foo/bar',
      }),
    });

    const response = await adapter.get('/foo/bar');

    expect(response).toEqual({
      data: {
        status: 'success',
      },
      headers: {},
      status: 200,
      url: '/foo/bar',
    });
  });

  it('mock functional responses', async () => {
    const adapter = new MockHttpAdapter({
      '/foo/bar': jest.fn().mockReturnValue({
        data: {
          status: 'success',
        },
        headers: {},
        status: 200,
        url: '/foo/bar',
      }),
    });

    const response = await adapter.get('/foo/bar');

    expect(response).toEqual({
      data: {
        status: 'success',
      },
      headers: {},
      status: 200,
      url: '/foo/bar',
    });
  });

});
