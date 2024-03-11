import { accessTokenInterceptor } from '.';
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

describe(('accessTokenInterceptor'), () => {
  it('should test accessToken interceptor', async () => {
    AppHolder.setState({
      roles: [],
      auth: {
        accessToken: 'accessToken',
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

    const result = accessTokenInterceptor({});

    expect(result.headers?.authorization).toBe('Bearer accessToken');
  });

  it('should test token interceptor without token', async () => {
    const result = accessTokenInterceptor({});

    expect(result.headers?.authorization).toBeUndefined();
  });
});
