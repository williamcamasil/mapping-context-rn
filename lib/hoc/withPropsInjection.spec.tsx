import React from 'react';
import { View } from 'react-native';

import { render } from '@testing-library/react-native';

import { DogCeoService } from '../../src/api/DogCeoService';
import { MockHttpAdapter } from '../api';
import withPropsInjection from './withPropsInjection';

const FakeScreen: React.FC = () => <View testID="fake-screen" />;

const WithPropsScreen = withPropsInjection(FakeScreen, {
  service: new DogCeoService(new MockHttpAdapter()),
});
const propsToInject: any = undefined;
const WithoutPropsScreen = withPropsInjection(FakeScreen, propsToInject);

describe('withPropsInjection', () => {
  it('Should throw error, there are no injected props in the component', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    expect(() => {
      render(
        <WithPropsScreen />,
      );
    }).toThrowError();
    spy.mockRestore();
  });
  it('Should render screen successfully, there are no defined props to inject', async () => {
    const screen = render(<WithoutPropsScreen />);
    screen.getByTestId('fake-screen');
  });
  it('Should render screen successfully', async () => {
    const screen = render(<WithPropsScreen service={new DogCeoService(new MockHttpAdapter())} />);
    screen.getByTestId('fake-screen');
  });
});
