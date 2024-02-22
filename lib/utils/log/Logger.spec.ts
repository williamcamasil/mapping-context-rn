import { createLogger, getLogger } from './factory';

const mockLog = jest.fn();
const mockWarn = jest.fn();
const mockError = jest.fn();

jest.mock('reactotron-react-native', () => {
  const reactotron = jest.requireActual('reactotron-react-native');

  return {
    ReactotronReactNative: reactotron.ReactotronReactNative,
    setAsyncStorageHandler: jest.fn(
      () => ({
        configure: jest.fn(
          () => ({
            useReactNative: jest.fn(
              () => ({
                connect: jest.fn(
                  () => ({
                    log: mockLog,
                    warn: mockWarn,
                    error: mockError,
                  }),
                ),
              }),
            ),
          }),
        ),
      }),
    ),
  };
});

const config = {
  appName: 'MappingApp',
  eventEmitterDebug: true,
  reactotron: true,
};

createLogger(config);

let log: jest.SpyInstance;
let warn: jest.SpyInstance;
let error: jest.SpyInstance;

beforeEach(() => {
  process.env.NODE_ENV = 'dev';
  log = jest.spyOn(console, 'log').mockImplementation(() => {});
  warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
  error = jest.spyOn(console, 'error').mockImplementation(() => {});

  mockLog.mockClear();
  mockWarn.mockClear();
  mockError.mockClear();
});

afterEach(() => {
  process.env.NODE_ENV = 'test';
  log.mockRestore();
  warn.mockRestore();
  error.mockRestore();
});

describe('Logger', () => {
  it('Should log on all providers', () => {
    getLogger().log(1, 2, 3);
    expect(log).toHaveBeenCalledWith('1, 2, 3');
    expect(mockLog).toHaveBeenCalledWith(1, 2, 3);
  });
  it('Should not log on providers, node env is test', () => {
    process.env.NODE_ENV = 'test';
    getLogger().log(4, 5, 6);
    expect(log).not.toHaveBeenCalledWith('4, 5, 6');
    expect(mockLog).not.toHaveBeenCalledWith(4, 5, 6);
  });
  it('Should log as warn on all providers', () => {
    getLogger().warn(1, 2, 3);
    expect(warn).toHaveBeenCalledWith('WARN: 1, 2, 3');
    expect(mockWarn).toHaveBeenCalledWith('1, 2, 3');
  });
  it('Should not log as warn providers, node env is test', () => {
    process.env.NODE_ENV = 'test';
    getLogger().warn(4, 5, 6);
    expect(log).not.toHaveBeenCalledWith('WARN: 4, 5, 6');
    expect(mockWarn).not.toHaveBeenCalledWith(4, 5, 6);
  });
  it('Should log error on all providers', () => {
    getLogger().error(new Error('parameter error'));
    expect(error).toHaveBeenCalledWith(new Error('parameter error'));
    expect(mockError).toHaveBeenCalledWith('Error: parameter error', null);
  });
  it('Should not log error on providers, node env is test', () => {
    process.env.NODE_ENV = 'test';
    getLogger().error(new Error('silent error'));
    expect(error).not.toHaveBeenCalledWith(new Error('silent error'));
    expect(mockError).not.toHaveBeenCalledWith('Error: silent error', null);
  });
});
