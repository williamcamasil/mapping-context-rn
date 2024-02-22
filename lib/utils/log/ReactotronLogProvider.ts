import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron, { ReactotronReactNative } from 'reactotron-react-native';

import type { AppConfigType } from '../../context';
import AbstractLogProvider from './AbstractLogProvider';

type ReactotronType = typeof Reactotron & ReactotronReactNative;

class ReactotronLogProvider extends AbstractLogProvider {

  private reactotron?: ReactotronType;

  constructor(config: AppConfigType) {
    super(config);

    if (!config.reactotron || !__DEV__ || !Reactotron) {
      return;
    }

    this.reactotron = Reactotron.setAsyncStorageHandler?.(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
      .configure({
        name: config.appName,
      }) // controls connection & communication settings
      .useReactNative() // add all built-in react native plugins
      .connect(); // let's connect!
  }

  log(...args: any[]): void {
    this.reactotron?.log?.(...args);
  }

  warn(...args: any[]): void {
    this.reactotron?.warn?.(args.map(String).join(', '));
  }

  error(...args: any[]): void {
    this.reactotron?.error?.(args.map(String).join(', '), null);
  }

}

export default ReactotronLogProvider;
