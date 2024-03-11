import { ibTokenInterceptor } from '.';
import { AppHolder } from '../../../context';

afterEach(() => {
  AppHolder.setState({
    _setAuth: jest.fn(),
    _setLoggedUser: jest.fn(),
    _setRoles: jest.fn(),
    _setUserAccount: jest.fn(),
    _setMessagingDeviceToken: jest.fn(),
    logout: jest.fn(),
    roles: [],
  });
});

describe(('ibAccessTokenInterceptor'), () => {
  it('should test ibAccessToken interceptor', async () => {
    AppHolder.setState({
      roles: [],
      auth: {
        accessToken: 'accessToken',
        ibAccessToken: 'ibAccessToken',
        variant: 'loan',
        refreshToken: 'refreshToken',
      },
      _setUserAccount: jest.fn(),
      logout: jest.fn(),
      _setAuth: jest.fn(),
      _setLoggedUser: jest.fn(),
      _setRoles: jest.fn(),
      _setMessagingDeviceToken: jest.fn(),
    });

    const result = ibTokenInterceptor({});

    expect(result.headers?.authorization).toBe('Bearer ibAccessToken');
  });

  it('should test token interceptor without token', async () => {
    const result = ibTokenInterceptor({});

    expect(result.headers?.authorization).toBeUndefined();
  });
});
