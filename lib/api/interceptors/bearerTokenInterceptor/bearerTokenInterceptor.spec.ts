import { getBearerTokenInterceptor } from '.';

describe(('getBearerTokenInterceptor'), () => {
  it('should test accessToken interceptor', async () => {
    const result = getBearerTokenInterceptor({}, 'accessToken');

    expect(result.headers?.authorization).toBe('Bearer accessToken');
  });

  it('should test ibToken interceptor', async () => {
    const result = getBearerTokenInterceptor({}, 'ibAccessToken');

    expect(result.headers?.authorization).toBe('Bearer ibAccessToken');
  });

  it('should test token interceptor without token', async () => {
    const result = getBearerTokenInterceptor({}, '');

    expect(result.headers?.authorization).toBeUndefined();
  });
});
