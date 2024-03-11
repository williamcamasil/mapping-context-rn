import { useState } from 'react';
import {
  AppState,
} from 'react-native';

import useDidMount from './useDidMount';

const useAppState = () => {
  const [appState, setAppState] = useState(AppState.currentState);

  useDidMount(() => {
    const listener = AppState.addEventListener('change', state => {
      setAppState(state);
    });

    return () => {
      listener.remove();
    };
  });

  return appState;
};

export default useAppState;
