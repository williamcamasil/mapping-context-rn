import React from 'react';

import {
  render, fireEvent,
} from '@testing-library/react-native';

import DogCeoScreen from '.';
import { MockHttpAdapter } from '../../../lib';
import { DogCeoService } from '../../api/DogCeoService';
import { DogHolder, DogProvider } from '../../providers/DogProvider';

const renderScreen = (dogCeoService?: DogCeoService) => render(
  <DogProvider>
    <DogCeoScreen dogCeoService={dogCeoService} />
  </DogProvider>,
);

describe('DogCeoScreen without mock', () => {
  it('test without injected props', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    expect(() => {
      render(
        <DogCeoScreen />,
      );
    }).toThrowError();
    spy.mockRestore();
  });
});

describe('DogCeoScreen with mock', () => {
  it('test request pitbull', async () => {
    const mockResponse = {
      data: {
        message: 'https://images.dog.ceo/breeds/pitbull/20190801_154956.jpg',
        status: 'success',
      },
      status: 200,
      headers: {
        'content-type': 'application/json',
        'content-length': '107',
        'cache-control': 'no-cache, private',
      },
      url: '/breed/pitbull/images/random',
    };

    const screen = renderScreen(new DogCeoService(new MockHttpAdapter({
      '/breed/pitbull/images/random': mockResponse,
    })));

    const requestButton = screen.getByTestId('request-pitbull-button');

    fireEvent.press(requestButton);

    await screen.findByTestId('loading-text');

    await screen.findByTestId('result-image');

    await screen.findByTestId('result-text');

    const resultText = screen.getByTestId('result-text');

    expect(resultText.children[0]).toEqual(JSON.stringify(mockResponse, null, 2));

    expect(DogHolder.getState()).toEqual({
      data: {
        message: 'https://images.dog.ceo/breeds/pitbull/20190801_154956.jpg',
        status: 'success',
      },
      headers: {
        'cache-control': 'no-cache, private',
        'content-length': '107',
        'content-type': 'application/json',
      },
      status: 200,
      url: '/breed/pitbull/images/random',
    });
  });

  it('test request not found breed', async () => {
    const screen = renderScreen(new DogCeoService(new MockHttpAdapter()));

    const requestButton = screen.getByTestId('request-breed-not-found-button');

    fireEvent.press(requestButton);

    await screen.findByTestId('loading-text');

    await screen.findByTestId('result-text');

    const resultText = screen.getByTestId('result-text');

    expect(resultText.children[0]).toEqual('BREED_NOT_FOUND');
  });

  it('test request global error', async () => {
    const screen = renderScreen(new DogCeoService(new MockHttpAdapter()));

    const requestButton = screen.getByTestId('request-global-error-button');

    fireEvent.press(requestButton);

    await screen.findByTestId('loading-text');

    await screen.findByTestId('result-text');

    const resultText = screen.getByTestId('result-text');

    expect(resultText.children[0]).toEqual('GLOBAL_NOT_FOUND');
  });
});
