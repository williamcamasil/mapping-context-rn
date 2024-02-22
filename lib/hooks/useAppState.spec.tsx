import React from 'react';
import { AppState, AppStateStatus, Text } from 'react-native';

import { render, act } from '@testing-library/react-native';

import useAppState from './useAppState';

const FakeScreen = () => {
  const state = useAppState();
  return <Text>{state}</Text>;
};

describe('useAppState', () => {
  it('Should update app state', async () => {
    let appStateListener: (state: AppStateStatus) => void;

    const originalAppStateMock = jest.spyOn(AppState, 'addEventListener').getMockImplementation();

    jest.spyOn(AppState, 'addEventListener').mockImplementation((type, listener) => {
      appStateListener = listener;
      return {
        remove: jest.fn(),
      };
    });

    const screen = render(<FakeScreen />);

    act(() => {
      appStateListener('active');
    });

    await screen.findByText('active');

    act(() => {
      appStateListener('background');
    });

    await screen.findByText('background');

    jest.spyOn(AppState, 'addEventListener').mockImplementation(originalAppStateMock);
  });
});
