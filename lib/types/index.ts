import type { AppConfigType, AppContextStateType } from '../context';

export type SubmoduleMiniAppType = {
  name: string;
  navigator: import('react').ComponentType;
};

export type SubmoduleMiniAppRegisterType = (
  config: AppConfigType,
  appState: AppContextStateType,
) => SubmoduleMiniAppType;
