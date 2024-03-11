import React, {
  PropsWithChildren, useCallback, useMemo, useState,
} from 'react';

import { enableEventEmitterDebug } from '../eventEmitter/emitter';
import { useDidMount } from '../hooks';
import { createLogger } from '../utils/log/factory';
import {
  AppContext,
  AppContextStateType,
  AuthTokenVariantType,
  AuthType,
  LegacyCentralPanelDataType,
  LoggedUserType,
  RoleType,
  UserAccountType,
} from './AppContext';
import { AppConfigType, AppHolder } from './AppHolder';

const DEFAULT_CONFIG: AppConfigType = {
  appName: 'MappingApp',
  eventEmitterDebug: __DEV__,
  reactotron: __DEV__,
};

function setupApp(config: AppConfigType) {
  createLogger(config);
  enableEventEmitterDebug(config);
}

export type ProviderPropsType = PropsWithChildren & {
  config?: AppConfigType;
  initialState?: Pick<AppContextStateType, 'auth' | 'loggedUser' | 'legacyCentralPanelData' | 'roles' | 'userAccount' | 'messagingDeviceToken'>;
  /**
   * Conteúdo a ser exibido quando o setup do provider
   * é realizado de forma assíncrona.
   */
  placeholder?: React.ReactNode;

  onAppWillMount?: (config: AppConfigType) => Promise<undefined | void>;
  onAppMount?: (config: AppConfigType) => Promise<AuthType | undefined | void>;
  onAppDidMount?: (config: AppConfigType, auth?: AuthType) => Promise<undefined | void>;
  onAppLogout?: (origin?: AuthTokenVariantType) => undefined | void;
};

export const AppProvider: React.FC<ProviderPropsType> = ({
  children,
  config,
  initialState,
  placeholder,
  onAppWillMount,
  onAppMount,
  onAppDidMount,
  onAppLogout,
}) => {
  const [auth, setAuth] = useState<AuthType | undefined>(initialState?.auth);
  const [loggedUser, setLoggedUser] = useState<LoggedUserType | undefined>(initialState?.loggedUser);
  const [
    legacyCentralPanelData, setLegacyCentralPanelData,
  ] = useState<LegacyCentralPanelDataType | undefined>(initialState?.legacyCentralPanelData);
  const [roles, setRoles] = useState<RoleType[]>(initialState?.roles ?? []);
  const [userAccount, setUserAccount] = useState<UserAccountType | undefined>(initialState?.userAccount);
  const [messagingDeviceToken, setMessagingDeviceToken] = useState<string | undefined>(
    initialState?.messagingDeviceToken,
  );

  const [setupCompleted, setSetupCompleted] = useState(false);

  const logout = useCallback(() => {
    const origin = AppHolder.getState().auth?.variant;
    setAuth(undefined);
    setLoggedUser({
      email: loggedUser?.email!,
      isAdminUser: loggedUser?.isAdminUser!,
    });
    setRoles([]);
    onAppLogout?.(origin);
  }, [loggedUser, onAppLogout]);

  const startApp = useCallback(async () => {
    try {
      const appConfig = {
        ...DEFAULT_CONFIG,
        ...config,
      };

      AppHolder.setConfig(appConfig);

      if (onAppWillMount) {
        await onAppWillMount(appConfig);
      }

      setupApp(appConfig);

      let initialAuth: AuthType | undefined | void;

      if (onAppMount) {
        initialAuth = await onAppMount(appConfig);
        setAuth(initialAuth ?? undefined);
      }

      if (onAppDidMount) {
        await onAppDidMount(appConfig, initialAuth ?? undefined);
      }
    } finally {
      setSetupCompleted(true);
    }
  }, [config, onAppDidMount, onAppMount, onAppWillMount]);

  const state = useMemo<AppContextStateType>(() => ({
    auth,
    loggedUser,
    legacyCentralPanelData,
    roles,
    userAccount,
    logout,
    messagingDeviceToken,
    _setAuth: setAuth,
    _setLoggedUser: setLoggedUser,
    _setLegacyCentralPanelData: setLegacyCentralPanelData,
    _setRoles: setRoles,
    _setUserAccount: setUserAccount,
    _setMessagingDeviceToken: setMessagingDeviceToken,
  }), [auth, loggedUser, legacyCentralPanelData, roles, userAccount, logout, messagingDeviceToken]);

  AppHolder.setState(state);

  useDidMount(() => {
    startApp();
  });

  return (
    <AppContext.Provider value={state}>
      {setupCompleted ? children : placeholder}
    </AppContext.Provider>
  );
};
