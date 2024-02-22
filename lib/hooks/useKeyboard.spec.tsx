import React from 'react';
import { Text } from 'react-native';

import { render, act } from '@testing-library/react-native';

import { hideKeyboardMock, showKeyboardMock } from '../utils';
import useKeyboard from './useKeyboard';

const FakeScreen = () => {
  const { isOpen, height } = useKeyboard();
  const isKeyboardOpen = `Keyboard is ${isOpen ? 'open' : 'closed'}`;
  const keyboardHeight = `Keyboard has a height of ${height}`;
  return (
    <>
      <Text>{isKeyboardOpen}</Text>
      <Text>{keyboardHeight}</Text>
    </>
  );
};

describe('useKeyboard', () => {
  it('Should have the initial keyboard values', async () => {
    const screen = render(<FakeScreen />);
    await screen.findByText('Keyboard is closed');
    screen.getByText('Keyboard has a height of 0');
  });
  it('Should update keyboard values', async () => {
    const screen = render(<FakeScreen />);
    act(() => showKeyboardMock());
    await screen.findByText('Keyboard is open');
    screen.getByText('Keyboard has a height of 250');
  });
  it('Should restore values back to initial', async () => {
    const screen = render(<FakeScreen />);
    act(() => showKeyboardMock());
    await screen.findByText('Keyboard is open');
    screen.getByText('Keyboard has a height of 250');
    act(() => hideKeyboardMock());
    await screen.findByText('Keyboard is closed');
    screen.getByText('Keyboard has a height of 0');
  });
});
