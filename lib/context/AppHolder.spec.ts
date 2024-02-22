import { AppHolder } from './AppHolder';

describe('AppHolder', () => {
  it('Should set config', () => {
    AppHolder.setConfig({
      appName: 'AppHolderTest',
      eventEmitterDebug: true,
      reactotron: true,
    });
    expect(AppHolder.getConfig()).toEqual({
      appName: 'AppHolderTest',
      eventEmitterDebug: true,
      reactotron: true,
    });
  });
  it('Should throw error, config is empty', () => {
    const config: any = null;
    AppHolder.setConfig(config);
    expect(() => AppHolder.getConfig()).toThrowError('Chamada não permitida, app não foi iniciado.');
  });
  it('Should set state', () => {
    AppHolder.setState({
      roles: [],
      logout: () => {},
      _setAuth: () => {},
      _setLoggedUser: () => {},
      _setLegacyCentralPanelData: () => {},
      _setRoles: () => {},
      _setUserAccount: () => {},
      _setMessagingDeviceToken: () => {},
    });
    expect(AppHolder.getState()).toEqual({
      roles: [],
      logout: expect.any(Function),
      _setAuth: expect.any(Function),
      _setLoggedUser: expect.any(Function),
      _setLegacyCentralPanelData: expect.any(Function),
      _setRoles: expect.any(Function),
      _setUserAccount: expect.any(Function),
      _setMessagingDeviceToken: expect.any(Function),
    });
  });
  it('Should throw error, state is empty', () => {
    const state: any = null;
    AppHolder.setState(state);
    expect(() => AppHolder.getState()).toThrowError('Chamada não permitida, app não foi iniciado.');
  });
  it('Should merge state', () => {
    AppHolder.setState({
      roles: [],
      logout: () => {},
      _setAuth: () => {},
      _setLoggedUser: () => {},
      _setLegacyCentralPanelData: () => {},
      _setRoles: () => {},
      _setUserAccount: () => {},
      _setMessagingDeviceToken: () => {},
    });
    AppHolder.updateState({
      auth: {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
        ibAccessToken: 'ibAccessToken',
        variant: 'bank',
      },
    });
    expect(AppHolder.getState()).toEqual({
      roles: [],
      auth: {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
        ibAccessToken: 'ibAccessToken',
        variant: 'bank',
      },
      logout: expect.any(Function),
      _setAuth: expect.any(Function),
      _setLoggedUser: expect.any(Function),
      _setLegacyCentralPanelData: expect.any(Function),
      _setRoles: expect.any(Function),
      _setUserAccount: expect.any(Function),
      _setMessagingDeviceToken: expect.any(Function),
    });
  });
});
