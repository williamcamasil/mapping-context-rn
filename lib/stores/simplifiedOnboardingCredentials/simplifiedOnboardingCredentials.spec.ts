
import 'react-native';

import {
  deleteSimplifiedOnboardingCredential,
  getSimplifiedOnboardingCredential,
  keyOnboardingCredentials,
  optionsValue, setSimplifiedOnboardingCredential, SimplifiedOnboardingCredentialsStoreType,
} from '.';
import Store from '../store';

const fakeOnboardingCredentials: SimplifiedOnboardingCredentialsStoreType = {
  token: '32a1s3asd5GGSH82s5',
  notifyRefusal: true,
  phase: 'CADASTRO_ACIMA_3_MESES',
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('simplifiedOnboardingCredentials', () => {
  it('setUserCredentials', async () => {
    jest.spyOn(Store, 'setItemAsync');

    await setSimplifiedOnboardingCredential(fakeOnboardingCredentials);

    expect(Store.setItemAsync).toBeCalledWith(
      keyOnboardingCredentials,
      JSON.stringify(fakeOnboardingCredentials),
      optionsValue,
    );
  });

  it('getSimplifiedOnboardingCredential', async () => {
    jest.spyOn(Store, 'getItemAsync');

    await Store.setItemAsync(
      keyOnboardingCredentials,
      JSON.stringify(fakeOnboardingCredentials),
      optionsValue,
    );
    const result = await getSimplifiedOnboardingCredential();

    expect(Store.getItemAsync).toBeCalledWith(keyOnboardingCredentials, optionsValue);
    expect(result).toEqual(fakeOnboardingCredentials);
  });

  it('getSimplifiedOnboardingCredential empty object', async () => {
    jest.spyOn(Store, 'getItemAsync');

    const fakeOnboardingCredentialsObjectError = '';
    await Store.setItemAsync(keyOnboardingCredentials, fakeOnboardingCredentialsObjectError, optionsValue);
    const result = await getSimplifiedOnboardingCredential();

    expect(Store.getItemAsync).toBeCalledWith(keyOnboardingCredentials, optionsValue);
    expect(result).toEqual(null);
  });

  it('getSimplifiedOnboardingCredential incomplet object', async () => {
    jest.spyOn(Store, 'getItemAsync');

    const fakeOnboardingCredentialsObjectError = '{id:';
    await Store.setItemAsync(keyOnboardingCredentials, fakeOnboardingCredentialsObjectError, optionsValue);
    const result = await getSimplifiedOnboardingCredential();

    expect(Store.getItemAsync).toBeCalledWith(keyOnboardingCredentials, optionsValue);
    expect(result).toEqual(null);
  });

  it('deleteUserCredentials', async () => {
    jest.spyOn(Store, 'deleteItemAsync');

    await deleteSimplifiedOnboardingCredential();
    expect(Store.deleteItemAsync).toBeCalledWith(keyOnboardingCredentials, optionsValue);
  });
});
