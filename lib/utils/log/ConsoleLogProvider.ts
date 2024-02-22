/* eslint-disable no-console */

import AbstractLogProvider from './AbstractLogProvider';

class ConsoleLogProvider extends AbstractLogProvider {

  log(...args: any[]): void {
    console.log(args.map(String).join(', '));
  }

  warn(...args: any[]): void {
    console.warn(`WARN: ${args.map(String).join(', ')}`);
  }

  error(error: Error): void {
    console.error(error);
  }

}

export default ConsoleLogProvider;
