import type { AppConfigType } from '../../context';
import ConsoleLogProvider from './ConsoleLogProvider';
import Logger from './Logger';
import ReactotronLogProvider from './ReactotronLogProvider';

let logger: Logger;

export const createLogger = (config: AppConfigType) => {
  logger = new Logger([
    new ReactotronLogProvider(config),
    new ConsoleLogProvider(config),
  ]);
};

export const getLogger = (): Logger => logger;
