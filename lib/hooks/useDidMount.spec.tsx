import React, { useState } from 'react';
import { Button, Text } from 'react-native';

import { render, fireEvent } from '@testing-library/react-native';

import useDidMount from './useDidMount';

const fakeFn = jest.fn();

const FakeScreen = () => {
  const [state, setState] = useState(0);
  useDidMount(fakeFn);
  return (
    <>
      <Button title="Increase state" onPress={() => setState(prevState => prevState + 1)} />
      <Text>{state}</Text>
    </>
  );
};

describe('useDidMount', () => {
  it('Should call fakeFn only once', async () => {
    const screen = render(<FakeScreen />);
    expect(fakeFn).toHaveBeenCalledTimes(1);
    const button = screen.getByText('Increase state');

    fireEvent.press(button);
    await screen.findByText('1');
    expect(fakeFn).toHaveBeenCalledTimes(1);
  });
});
