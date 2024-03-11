import { DeviceEventEmitterStatic } from 'react-native';

import { NavigationContainerRef, ParamListBase } from '@react-navigation/native';

import { getNavigationHolder } from '../../navigation';

const DeviceEventEmitterMock = require('react-native/Libraries/EventEmitter/RCTDeviceEventEmitter').default as DeviceEventEmitterStatic;

export const createNavigationMock = <ParamsList extends ParamListBase = ParamListBase>(
  customMocks?: Partial<NavigationContainerRef<ParamsList>>,
) => {
  const navigationMock: NavigationContainerRef<ParamsList> = {
    goBack: jest.fn(),
    dispatch: jest.fn(),
    navigate: jest.fn(),
    reset: jest.fn(),
    isFocused: jest.fn().mockReturnValue(true),
    canGoBack: jest.fn().mockReturnValue(true),
    getId: jest.fn().mockReturnValue('abc-123'),
    getParent: jest.fn(),
    getState: jest.fn().mockReturnValue({
      key: 'string',
      index: 0,
      routeNames: [],
      history: [],
      routes: [
        {
          key: 'route-key',
          name: 'route-name',
        },
      ],
      type: 'string',
      stale: false,
    }),
    addListener: jest.fn(),
    emit: jest.fn(),
    getCurrentOptions: jest.fn(),
    getCurrentRoute: jest.fn(),
    getRootState: jest.fn(),
    removeListener: jest.fn(),
    resetRoot: jest.fn(),
    setParams: jest.fn(),
    isReady: jest.fn().mockReturnValue(true),
    ...customMocks,
  };
  getNavigationHolder<ParamsList>().getRef().current = navigationMock;
  return navigationMock;
};

export const showKeyboardMock = () => {
  DeviceEventEmitterMock.emit('keyboardDidShow', {
    endCoordinates: {
      height: 250,
    },
  });
};

export const hideKeyboardMock = () => {
  DeviceEventEmitterMock.emit('keyboardDidHide', {});
};
