import React from 'react';

import { render, waitFor } from '@testing-library/react-native';

import { useDidMount } from '../hooks';
import emitter from './emitter';
import useEmitter from './useEmitter';

describe('useEmitter', () => {
  it('Should emit a message through useEmitter', async () => {
    const spy = jest.spyOn(emitter, 'emit');

    const FakeScreen = () => {
      const emitterHook = useEmitter();
      useDidMount(() => {
        emitterHook.emit('eventName', 'new message');
      });

      return null;
    };
    render(
      <FakeScreen />,
    );
    await waitFor(() => expect(spy).toHaveBeenCalledWith('eventName', 'new message'));
  });
});

