import ReactotronLogProvider from './ReactotronLogProvider';

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

const reactotronLogger = new ReactotronLogProvider(config);

beforeEach(() => {
  mockLog.mockClear();
  mockWarn.mockClear();
  mockError.mockClear();
});

describe('ReactotronLogProvider', () => {
  it('Should call log with parameters', () => {
    reactotronLogger.log(1, 2, 3);
    expect(mockLog).toHaveBeenCalledWith(1, 2, 3);
  });
  it('Should call warn with parameters', () => {
    reactotronLogger.warn(1, 2, 3);
    expect(mockWarn).toHaveBeenCalledWith('1, 2, 3');
  });
  it('Should call error with parameters', () => {
    reactotronLogger.error(1, 2, 3);
    expect(mockError).toHaveBeenCalledWith('1, 2, 3', null);
  });
});
