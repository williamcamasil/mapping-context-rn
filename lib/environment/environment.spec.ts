import DeviceInfo from 'react-native-device-info';

import { createEnvironment } from '.';

const createController = () => {
  const controller = createEnvironment({
    development: {
      url: 'https://development.com',
    },
    homologation: {
      url: 'https://homologation.com',
    },
    production: {
      url: 'https://production.com',
    },
  });
  return controller;
};

describe('EnvironmentController', () => {
  it('getCurrent', () => {
    jest.spyOn(DeviceInfo, 'getBundleId').mockReturnValueOnce('com.teste');
    jest.spyOn(DeviceInfo, 'getBundleId').mockReturnValueOnce('com.teste.hmg');
    jest.spyOn(DeviceInfo, 'getBundleId').mockReturnValueOnce('com.teste.dev');

    expect(createController().getCurrent()).toBe('production');

    expect(createController().getCurrent()).toBe('homologation');

    expect(createController().getCurrent()).toBe('development');
  });

  it('getValue development', () => {
    jest.spyOn(DeviceInfo, 'getBundleId').mockReturnValue('com.teste.dev');

    const controller = createController();

    expect(controller.getValue('url')).toBe('https://development.com');
  });

  it('getValue homologation', () => {
    jest.spyOn(DeviceInfo, 'getBundleId').mockReturnValue('com.teste.hmg');

    const controller = createController();

    expect(controller.getValue('url')).toBe('https://homologation.com');
  });

  it('getValue production', () => {
    jest.spyOn(DeviceInfo, 'getBundleId').mockReturnValue('com.teste');

    const controller = createController();

    expect(controller.getValue('url')).toBe('https://production.com');
  });

  it('getValue getConfig', () => {
    jest.spyOn(DeviceInfo, 'getBundleId').mockReturnValue('com.teste');

    const controller = createController();

    expect(controller.getConfig()).toEqual({
      development: {
        url: 'https://development.com',
      },
      homologation: {
        url: 'https://homologation.com',
      },
      production: {
        url: 'https://production.com',
      },
    });
  });

  it('getValue getValues', () => {
    jest.spyOn(DeviceInfo, 'getBundleId').mockReturnValue('com.teste');

    const controller = createController();

    expect(controller.getValues()).toEqual({
      environment: 'production',
      url: 'https://production.com',
    });
  });
});
