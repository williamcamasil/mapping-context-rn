import { AppContextStateType } from './AppContext';

export type AppConfigType = {
  appName?: string;
  eventEmitterDebug?: boolean;
  reactotron?: boolean;
};
class AppHolderImpl {

  private config?: AppConfigType;

  private state?: AppContextStateType;

  setConfig(config: AppConfigType) {
    this.config = config;
  }

  public getConfig() {
    if (!this.config) {
      throw new Error('Chamada não permitida, app não foi iniciado.');
    }
    return this.config;
  }

  public setState(state: AppContextStateType) {
    this.state = state;
  }

  public updateState(state: Partial<AppContextStateType>) {
    this.setState({
      ...this.state!,
      ...state,
    });
  }

  public getState() {
    if (!this.state) {
      throw new Error('Chamada não permitida, app não foi iniciado.');
    }
    return this.state;
  }

}

export const AppHolder = new AppHolderImpl();
