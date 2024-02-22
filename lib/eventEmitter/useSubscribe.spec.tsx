import React from 'react';

import { render } from '@testing-library/react-native';

import emitter from './emitter';
import useSubscribe from './useSubscribe';

describe('useSubscribe', () => {
  it('Should subscribe to a message through useSubscribe', async () => {
    const callback = jest.fn();

    const FakeScreen = () => {
      useSubscribe('eventName', callback);
      return null;
    };
    render(
      <FakeScreen />,
    );
    emitter.emit('anotherEvent');
    expect(callback).not.toHaveBeenCalled();
    emitter.emit('eventName');
    expect(callback).toHaveBeenCalled();
  });
});

