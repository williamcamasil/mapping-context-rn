import React, { useState } from 'react';
import { Button, Text } from 'react-native';

import { render, fireEvent, waitFor } from '@testing-library/react-native';

import useDidMountAndUpdate from './useDidMountAndUpdate';

const fakeFn = jest.fn();

const FakeScreen = () => {
  const [state, setState] = useState(0);
  useDidMountAndUpdate(fakeFn);
  return (
    <>
      <Button title="Increase state" onPress={() => setState(prevState => prevState + 1)} />
      <Text>{state}</Text>
    </>
  );
};

describe('useDidMountAndUpdate', () => {
  it('Should call fakeFn twice', async () => {
    const screen = render(<FakeScreen />);
    expect(fakeFn).toHaveBeenCalledTimes(1);
    const button = screen.getByText('Increase state');

    fireEvent.press(button);

    await waitFor(() => expect(fakeFn).toHaveBeenCalledTimes(2));
  });
});
