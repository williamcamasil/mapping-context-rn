import AbstractLogProvider from './AbstractLogProvider';

const config = {
  appName: 'MappingApp',
  eventEmitterDebug: true,
  reactotron: true,
};

describe('AbstractLogProvider', () => {
  it('Should throw error when does not implement any logic on log', () => {
    const abstractLogProvider = new AbstractLogProvider(config);
    expect(() => abstractLogProvider.log()).toThrowError('Method not implemented.');
  });
  it('Should throw error when does not implement any logic on warn', () => {
    const abstractLogProvider = new AbstractLogProvider(config);
    expect(() => abstractLogProvider.warn()).toThrowError('Method not implemented.');
  });
  it('Should throw error when does not implement any logic on error', () => {
    const abstractLogProvider = new AbstractLogProvider(config);
    expect(() => abstractLogProvider.error(new Error('Parameter'))).toThrowError('Method not implemented. Error: Parameter');
  });
});
