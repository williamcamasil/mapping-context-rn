import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import { AppProvider } from '../lib';
import { DogProvider } from './providers/DogProvider';
import DogCeoScreen from './screens/DogCeoScreen';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 28,
  },
});

const App = () => (
  <AppProvider>
    <SafeAreaView style={styles.safeArea}>
      <DogProvider>
        <DogCeoScreen />
      </DogProvider>
    </SafeAreaView>
  </AppProvider>
);

export default App;
