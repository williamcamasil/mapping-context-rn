import React from 'react';
import { Text } from 'react-native';

import { render, waitFor, act } from '@testing-library/react-native';

import emitter from '../eventEmitter/emitter';
import { delay, getLogger } from '../utils';
import ConsoleLogProvider from '../utils/log/ConsoleLogProvider';
import ReactotronLogProvider from '../utils/log/ReactotronLogProvider';
import { AuthTokenVariantType, RoleType } from './AppContext';
import { AppHolder } from './AppHolder';
import { AppProvider } from './AppProvider';

describe('AppProvider', () => {
  it('Should correctly set config, merging with default config', async () => {
    const config = {
      eventEmitterDebug: true,
      reactotron: true,
    };
    const screen = render(
      <AppProvider config={config}>
        <Text>Children</Text>
      </AppProvider>,
    );
    expect(AppHolder.getConfig()).toEqual({
      appName: 'MappingApp',
      eventEmitterDebug: true,
      reactotron: true,
    });
    await screen.findByText('Children');
  });
  it('Should call onAppWillMount with appConfig', async () => {
    const onAppWillMount = jest.fn();
    const screen = render(
      <AppProvider onAppWillMount={onAppWillMount}>
        <Text>Children</Text>
      </AppProvider>,
    );
    expect(onAppWillMount).toHaveBeenCalledWith({
      appName: 'MappingApp',
      eventEmitterDebug: true,
      reactotron: true,
    });
    await screen.findByText('Children');
  });
  it('Should create loggers', async () => {
    const screen = render(
      <AppProvider>
        <Text>Children</Text>
      </AppProvider>,
    );
    await waitFor(() => expect(getLogger()).toEqual({
      logProviders: [
        expect.any(ReactotronLogProvider),
        expect.any(ConsoleLogProvider),
      ],
    }));
    await screen.findByText('Children');
  });
  it('Should create analytics', async () => {
    const screen = render(
      <AppProvider>
        <Text>Children</Text>
      </AppProvider>,
    );
    await screen.findByText('Children');
  });
  it('Should create eventEmitter', async () => {
    render(
      <AppProvider>
        <Text>Children</Text>
      </AppProvider>,
    );
    await waitFor(() => expect(getLogger()).toEqual({
      logProviders: [
        expect.any(ReactotronLogProvider),
        expect.any(ConsoleLogProvider),
      ],
    }));
    const logger = getLogger();
    const spy = jest.spyOn(logger, 'log');
    emitter.emit('message');
    expect(spy).toHaveBeenCalledWith('EVENT_EMITTER', 'message');
  });
  it('Should call onAppMount and set its return as the auth', async () => {
    const onAppMount: any = jest.fn(() => ({
      accessToken: 'mount access token',
      refreshToken: 'mount refresh token',
      variant: 'bank',
    }));
    const screen = render(
      <AppProvider onAppMount={onAppMount}>
        <Text>Children</Text>
      </AppProvider>,
    );
    expect(onAppMount).toHaveBeenCalledWith({
      appName: 'MappingApp',
      eventEmitterDebug: true,
      reactotron: true,
    });
    await screen.findByText('Children');
    expect(AppHolder.getState().auth).toEqual({
      accessToken: 'mount access token',
      refreshToken: 'mount refresh token',
      variant: 'bank',
    });
  });
  it('Should call onAppMount and set auth as undefined', async () => {
    const onAppMount: any = jest.fn(() => null);
    const screen = render(
      <AppProvider onAppMount={onAppMount}>
        <Text>Children</Text>
      </AppProvider>,
    );
    expect(onAppMount).toHaveBeenCalledWith({
      appName: 'MappingApp',
      eventEmitterDebug: true,
      reactotron: true,
    });
    await screen.findByText('Children');
    expect(AppHolder.getState().auth).toBeUndefined();
  });
  it('Should call onAppDidMount with appConfig and initialAuth', async () => {
    const onAppDidMount = jest.fn();
    const onAppMount: any = jest.fn(() => ({
      accessToken: 'did mount access token',
      refreshToken: 'did mount refresh token',
      variant: 'bank',
    }));
    const screen = render(
      <AppProvider onAppMount={onAppMount} onAppDidMount={onAppDidMount}>
        <Text>Children</Text>
      </AppProvider>,
    );
    await waitFor(() => expect(onAppDidMount).toHaveBeenCalledWith({
      appName: 'MappingApp',
      eventEmitterDebug: true,
      reactotron: true,
    }, {
      accessToken: 'did mount access token',
      refreshToken: 'did mount refresh token',
      variant: 'bank',
    }));
    await screen.findByText('Children');
  });
  it('Should call onAppDidMount with appConfig', async () => {
    const onAppDidMount = jest.fn();
    const onAppMount: any = jest.fn(() => null);
    const screen = render(
      <AppProvider onAppMount={onAppMount} onAppDidMount={onAppDidMount}>
        <Text>Children</Text>
      </AppProvider>,
    );
    await waitFor(() => expect(onAppDidMount).toHaveBeenCalledWith({
      appName: 'MappingApp',
      eventEmitterDebug: true,
      reactotron: true,
    }, undefined));
    await screen.findByText('Children');
  });
  it('Should show placeholder while setting up the app', async () => {
    const screen = render(
      <AppProvider
        placeholder={<Text>Placeholder</Text>}
        onAppWillMount={() => delay(100)}
      >
        <Text>Children</Text>
      </AppProvider>,
    );
    screen.getByText('Placeholder');
    await screen.findByText('Children');
  });
  it('Should clear App info on logout and call onAppLogout', async () => {
    const onAppDidMount = jest.fn();
    const onAppLogout = jest.fn();
    const onAppMount: any = jest.fn(() => ({
      accessToken: 'did mount access token',
      refreshToken: 'did mount refresh token',
      variant: 'bank',
    }));
    const initialState = {
      roles: ['CONTA_CORRENTE'] as RoleType[],
      loggedUser: { documentNumber: '12345678910' },
      auth: {
        accessToken: '',
        refreshToken: '',
        variant: 'bank' as AuthTokenVariantType,
      },
    };
    render(
      <AppProvider
        onAppMount={onAppMount}
        onAppDidMount={onAppDidMount}
        onAppLogout={onAppLogout}
        initialState={initialState}
      >
        <Text>Children</Text>
      </AppProvider>,
    );
    await waitFor(() => expect(AppHolder.getState()).not.toBeNull());

    act(() => {
      AppHolder.getState().logout();
    });

    expect(AppHolder.getState()).toEqual({
      auth: undefined,
      loggedUser: {
        documentNumber: '12345678910',
      },
      roles: [],
      logout: expect.any(Function),
      userAccount: undefined,
      messagingDeviceToken: undefined,
      _setAuth: expect.any(Function),
      _setLoggedUser: expect.any(Function),
      _setLegacyCentralPanelData: expect.any(Function),
      _setRoles: expect.any(Function),
      _setUserAccount: expect.any(Function),
      _setMessagingDeviceToken: expect.any(Function),
    });

    expect(onAppLogout).toHaveBeenCalledWith('bank');
  });
});
