import ConsoleLogProvider from './ConsoleLogProvider';

const config = {
  appName: 'MappingApp',
  eventEmitterDebug: true,
  reactotron: true,
};

const logProvider = new ConsoleLogProvider(config);

let log: jest.SpyInstance;
let warn: jest.SpyInstance;
let error: jest.SpyInstance;

afterEach(() => {
  log.mockRestore();
  warn.mockRestore();
  error.mockRestore();
});

beforeEach(() => {
  log = jest.spyOn(console, 'log').mockImplementation(() => {});
  warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
  error = jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('ConsoleLogProvider', () => {
  it('Should call log with concatenated args', () => {
    logProvider.log(1, 2, 3);
    expect(log).toHaveBeenCalledWith('1, 2, 3');
  });
  it('Should call log as warn with concatenated args', () => {
    logProvider.warn(1, 2, 3);
    expect(warn).toHaveBeenCalledWith('WARN: 1, 2, 3');
  });
  it('Should throw error', () => {
    logProvider.error(new Error('Parameter error'));
    expect(error).toHaveBeenCalledWith(new Error('Parameter error'));
  });
});
