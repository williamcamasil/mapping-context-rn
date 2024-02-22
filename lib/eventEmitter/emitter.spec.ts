import { waitFor } from '@testing-library/react-native';

import { createLogger, getLogger } from '../utils';
import ConsoleLogProvider from '../utils/log/ConsoleLogProvider';
import ReactotronLogProvider from '../utils/log/ReactotronLogProvider';
import emitter, { enableEventEmitterDebug } from './emitter';

describe('emitter', () => {
  it('Should create eventEmitter with loggers', async () => {
    const config = {
      appName: 'MappingApp',
      eventEmitterDebug: true,
      reactotron: true,
    };
    createLogger(config);
    await waitFor(() => expect(getLogger()).toEqual({
      logProviders: [
        expect.any(ReactotronLogProvider),
        expect.any(ConsoleLogProvider),
      ],
    }));
    enableEventEmitterDebug(config);
    const logger = getLogger();
    const spy = jest.spyOn(logger, 'log');
    emitter.emit('message');
    expect(spy).toHaveBeenCalledWith('EVENT_EMITTER', 'message');
  });
  it('Should create eventEmitter without loggers', async () => {
    const config = {
      appName: 'MappingApp',
      eventEmitterDebug: false,
      reactotron: true,
    };
    createLogger(config);
    await waitFor(() => expect(getLogger()).toEqual({
      logProviders: [
        expect.any(ReactotronLogProvider),
        expect.any(ConsoleLogProvider),
      ],
    }));
    enableEventEmitterDebug(config);
    const logger = getLogger();
    const spy = jest.spyOn(logger, 'log');
    const emitterSpy = jest.spyOn(emitter, 'emit');
    emitter.emit('message');
    expect(spy).not.toHaveBeenCalled();
    expect(emitterSpy).toHaveBeenCalledWith('message');
  });
});
