import React from 'react';
import { Text, View } from 'react-native';

import { render } from '@testing-library/react-native';

import { AppProvider } from './AppProvider';
import { useAppContext } from './useAppContext';

describe('useAppContext', () => {
  it('Should give access to the app context', () => {
    const FakeScreen = () => {
      const appContext = useAppContext();
      return (
        <View>
          <Text>
            Document number:
            {' '}
            {appContext.loggedUser?.documentNumber}
          </Text>
        </View>
      );
    };

    const screen = render(
      <AppProvider initialState={{ roles: ['CARTAO_CREDITO'], loggedUser: { documentNumber: '12345678910' } }}>
        <FakeScreen />
      </AppProvider>,
    );
    screen.getByText('Document number: 12345678910');
  });
});
