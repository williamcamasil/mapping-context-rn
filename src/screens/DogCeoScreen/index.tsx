import React, { useCallback, useState } from 'react';
import {
  Alert, Button, Image, ScrollView, StyleSheet, Text, View,
} from 'react-native';

import {
  isResponseError, useAsync, withPropsInjection,
} from '../../../lib';
import dogCeoServiceInstance, { DogCeoErrorType, DogCeoService } from '../../api/DogCeoService';
import { useDogContext } from '../../providers/DogProvider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: { width: '100%', height: 300, marginTop: 28 },
});

type DogCeoScreenPropsType = {
  dogCeoService: DogCeoService;
};

const DogCeoScreen: React.FC<DogCeoScreenPropsType> = ({ dogCeoService }) => {
  // const [response, setResponse] = useState<IResponseSuccess<DogCeoResponseDataType>>();
  const dogContext = useDogContext();

  const [error, setError] = useState<DogCeoErrorType>();

  const { call: handleDogRequest, loading: loadingDogs } = useAsync(async (breed: string) => {
    dogContext.setState(undefined);
    setError(undefined);

    const responseApi = await dogCeoService.requestRandomImageByBreed(breed);

    if (isResponseError(responseApi)) {
      /*
         * Trata o erro conforme desejado, exibindo uma mensagem para o usuário
         * ou navegando para outra tela.
         * Dependendo do erro tbm está disponível o response de erro com o `data`, `status`, `header`, etc...
         */
      Alert.alert(responseApi.error);
      setError(responseApi.error);
    } else {
      /*
         * Obtém o response de sucesso com o `data`, `status`, `header`, etc...
         */
      dogContext.setState(responseApi);
    }
  }, [dogCeoService, dogContext]);

  const { call: handleSimulateGlobalError, loading: loadingSimulateError } = useAsync(async () => {
    dogContext.setState(undefined);
    setError(undefined);

    const responseApi = await dogCeoService.requestSimulateGlobalError();

    /* istanbul ignore else */
    if (isResponseError(responseApi)) {
      /*
         * Trata o erro conforme desejado, exibindo uma mensagem para o usuário
         * ou navegando para outra tela.
         * Dependendo do erro tbm está disponível o response de erro com o `data`, `status`, `header`, etc...
         */
      Alert.alert(responseApi.error);
      setError(responseApi.error);
    }
  }, [dogCeoService, dogContext]);

  const handleRequestPitbull = useCallback(() => {
    handleDogRequest('pitbull');
  }, [handleDogRequest]);

  const handleRequestAnything = useCallback(() => {
    handleDogRequest('blablabla');
  }, [handleDogRequest]);

  return (
    <View style={styles.container}>
      <Button
        title="Request pitbull"
        onPress={handleRequestPitbull}
        testID="request-pitbull-button"
      />
      <Button
        title="Request inexistente"
        onPress={handleRequestAnything}
        testID="request-breed-not-found-button"
      />
      <Button
        title="Request simular erro global"
        onPress={handleSimulateGlobalError}
        testID="request-global-error-button"
      />
      <ScrollView>
        {dogContext.state?.data.message ? (
          <Image
            testID="result-image"
            style={styles.image}
            resizeMode="contain"
            source={{
              uri: dogContext.state?.data.message,
            }}
          />
        ) : null}

        {loadingDogs || loadingSimulateError ? (
          <Text testID="loading-text">Carregando</Text>
        ) : (
          <Text testID="result-text">
            {error}
            {JSON.stringify(dogContext.state, null, 2)}
          </Text>
        )}

      </ScrollView>
    </View>
  );
};

export default withPropsInjection(DogCeoScreen, {
  dogCeoService: dogCeoServiceInstance,
});

