import { DeviceEventEmitterStatic } from 'react-native';

import { createNavigationMock, hideKeyboardMock, showKeyboardMock } from '.';
import { getNavigationHolder } from '../../navigation';

const DeviceEventEmitterMock = require('react-native/Libraries/EventEmitter/RCTDeviceEventEmitter').default as DeviceEventEmitterStatic;

describe('test mocks', () => {
  it('Should create a navigation mock', () => {
    const navigation = createNavigationMock();
    expect(getNavigationHolder().getRef().current).toEqual(navigation);
    expect(navigation.goBack).toBeDefined();
  });
  it('Should emit keyboardDidShow with the correct parameters', () => {
    const spy = jest.spyOn(DeviceEventEmitterMock, 'emit');
    showKeyboardMock();
    expect(spy).toHaveBeenCalledWith('keyboardDidShow', {
      endCoordinates: {
        height: 250,
      },
    });
  });
  it('Should emit keyboardDidHide', () => {
    const spy = jest.spyOn(DeviceEventEmitterMock, 'emit');
    hideKeyboardMock();
    expect(spy).toHaveBeenCalledWith('keyboardDidHide', {});
  });
});
