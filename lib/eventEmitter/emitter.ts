import EventEmitter from 'events';

import type { AppConfigType } from '../context';
import { getLogger } from '../utils';

const emitter = new EventEmitter();

const emitFn = emitter.emit.bind(emitter);

type EmitType = typeof emitter.emit;

export function enableEventEmitterDebug(config: AppConfigType) {
  if (config.eventEmitterDebug) {
    const emitProxy: EmitType = (type, ...args) => {
      getLogger().log('EVENT_EMITTER', type, ...args);
      return emitFn(type, ...args);
    };

    emitter.emit = emitProxy;
  } else {
    emitter.emit = emitFn;
  }
}

export default emitter;
