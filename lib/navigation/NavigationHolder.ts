import {
  createNavigationContainerRef, ParamListBase, NavigationContainerRefWithCurrent,
  NavigationAction, NavigationState, StackActions, PartialState,
} from '@react-navigation/native';

class NavigationHolder<ParamsList extends ParamListBase, State
extends NavigationState = NavigationState> {

  private ref: NavigationContainerRefWithCurrent<ParamsList>;

  constructor() {
    this.ref = createNavigationContainerRef<ParamsList>();
  }

  getRef() {
    return this.ref;
  }

  getState() {
    return this.ref.getState();
  }

  dispatch(action: NavigationAction | ((state: State) => NavigationAction)) {
    if (this.ref?.isReady()) {
      this.ref.dispatch(action as any);
    }
  }

  navigate<RouteName extends keyof ParamsList>(
    ...args: RouteName extends unknown
      ? undefined extends ParamsList[RouteName]
        ? [screen: RouteName] | [screen: RouteName, params: ParamsList[RouteName]]
        : [screen: RouteName, params: ParamsList[RouteName]]
      : never
  ) {
    if (this.ref?.isReady()) {
      this.ref.navigate<RouteName>(...args);
    }
  }

  goBack() {
    if (this.ref.isReady()) {
      this.ref.goBack();
    }
  }

  replace<RouteName extends keyof ParamsList>(screen: RouteName, params?: ParamsList[RouteName]) {
    if (this.ref?.isReady()) {
      this.ref.dispatch(StackActions.replace(screen as any, params));
    }
  }

  push<RouteName extends keyof ParamsList>(screen: RouteName, params?: ParamsList[RouteName]) {
    if (this.ref?.isReady()) {
      this.ref.dispatch(StackActions.push(screen as any, params));
    }
  }

  pop(count?: number) {
    if (this.ref?.isReady()) {
      this.ref.dispatch(StackActions.pop(count));
    }
  }

  popToTop() {
    if (this.ref?.isReady()) {
      this.ref.dispatch(StackActions.popToTop());
    }
  }

  reset(state: PartialState<State> | State) {
    if (this.ref?.isReady()) {
      this.ref.reset(state);
    }
  }

  resetRoot(state: PartialState<State> | State) {
    if (this.ref?.isReady()) {
      this.ref.resetRoot(state);
    }
  }

  canGoBack() {
    if (this.ref?.isReady()) {
      return this.ref.canGoBack();
    }
    return false;
  }

  getParent() {
    return this.ref.getParent();
  }

  getCurrentRoute() {
    return this.ref.getCurrentRoute();
  }

}

let navigationRef: any;

export const getNavigationHolder = <
  Params extends ParamListBase,
>(): NavigationHolder<Params> => {
  if (!navigationRef) {
    navigationRef = new NavigationHolder<Params>();
  }
  return navigationRef;
};

export const useNavigationHolder = <
  Params extends ParamListBase,
>() => getNavigationHolder<Params>();
