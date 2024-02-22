import React from 'react';
import { Text } from 'react-native';

import { render, act } from '@testing-library/react-native';

import { useDidMount } from '../hooks';
import createContextFactory from './createContextFactory';

type StateType = {
  key: string;
  key2?: string;
};

const {
  Context: TestContext,
  Holder: TestHolder,
  Provider: TestProvider,
  useContext: useTestContext,
} = createContextFactory<StateType>();

const FakeScreen: React.FC = () => {
  const { state } = useTestContext();
  return (
    <>
      <Text>{state?.key}</Text>
      <Text>{state?.key2}</Text>
    </>
  );
};

const FakeHookScreen: React.FC = () => {
  const { state, setState } = useTestContext();
  useDidMount(() => {
    setState({ key: 'hook value' });
  });
  return <Text>{state?.key}</Text>;
};

describe('createContextFactory', () => {
  it('Should set state through Holder', async () => {
    const screen = render(
      <TestProvider value={{ key: 'initial' }}>
        <FakeScreen />
      </TestProvider>,
    );
    act(() => {
      TestHolder.setState({ key: 'value' });
    });
    await screen.findByText('value');
  });
  it('Should set state through hook', async () => {
    const screen = render(
      <TestProvider value={{ key: 'initial' }}>
        <FakeHookScreen />
      </TestProvider>,
    );
    await screen.findByText('hook value');
  });
  it('Should update state through Holder', async () => {
    const screen = render(
      <TestProvider value={{ key: 'initial' }}>
        <FakeScreen />
      </TestProvider>,
    );
    act(() => {
      TestHolder.updateState({ key2: 'new value' });
    });
    await screen.findByText('new value');
  });
  it('Should provide the context', () => {
    const screen = render(
      <TestProvider value={{ key: 'initial value' }}>
        <FakeScreen />
      </TestProvider>,
    );
    screen.getByText('initial value');
    expect(TestHolder.getState()).toEqual({ key: 'initial value' });
  });
  it('Should clear state on unmount', () => {
    const screen = render(
      <TestProvider value={{ key: 'initial value' }}>
        <FakeScreen />
      </TestProvider>,
    );
    screen.unmount();
    expect(TestHolder.getState()).toBeUndefined();
    TestHolder.setState({ key: 'after unmount' });
    expect(TestHolder.getState()).toBeUndefined();
  });
  it('Should create the context object', () => {
    expect(TestContext.Provider).toBeTruthy();
    expect(TestContext.Consumer).toBeTruthy();
  });
  it('Should not set state, there is no provider', async () => {
    render(<FakeHookScreen />);
    expect(TestHolder.getState()).toBeUndefined();
  });
});
