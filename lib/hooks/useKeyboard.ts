import { useState } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

import useDidMount from './useDidMount';

const useKeyboard = () => {
  const [keyboardState, setKeyboardState] = useState({
    isOpen: false,
    height: 0,
  });

  const handleKeyboardDidShow = (event: KeyboardEvent) => {
    setKeyboardState({
      isOpen: true,
      height: event.endCoordinates.height,
    });
  };

  const handleKeyboardDidHide = () => {
    setKeyboardState({
      isOpen: false,
      height: 0,
    });
  };

  useDidMount(() => {
    const listeners = [
      Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow),
      Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide),
    ];

    return () => {
      listeners.forEach(listener => listener.remove());
    };
  });

  return keyboardState;
};

export default useKeyboard;
