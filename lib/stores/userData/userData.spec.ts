
import 'react-native';
import {
  deleteUserData,
  getUserData,
  setUserData,
  storeKey,
  storeOptionsValue,
  UserDataStoreType,
} from '.';
import Store from '../store';

const fakeUser: UserDataStoreType = {
  name: 'John Doe',
  documentNumber: '12345678900',
  withBiometry: false,
  variant: 'loan',
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('userData', () => {
  it('should set User Data', async () => {
    jest.spyOn(Store, 'setItemAsync');

    await setUserData(fakeUser);
    expect(Store.setItemAsync).toBeCalledWith(
      storeKey,
      JSON.stringify(fakeUser),
      storeOptionsValue,
    );
  });

  it('should get User Data', async () => {
    jest.spyOn(Store, 'getItemAsync');

    await Store.setItemAsync(storeKey, JSON.stringify(fakeUser), storeOptionsValue);
    const result = await getUserData();

    expect(Store.getItemAsync).toBeCalledWith(storeKey, storeOptionsValue);
    expect(result).toEqual(fakeUser);
  });

  it('should get User Data with empty object', async () => {
    jest.spyOn(Store, 'getItemAsync');

    const fakeUserObjectError = '';
    await Store.setItemAsync(storeKey, fakeUserObjectError, storeOptionsValue);
    const result = await getUserData();

    expect(Store.getItemAsync).toBeCalledWith(storeKey, storeOptionsValue);
    expect(result).toEqual(null);
  });

  it('should get User Data with incomplete object', async () => {
    jest.spyOn(Store, 'getItemAsync');

    const fakeUserObjectError = '{id:';
    await Store.setItemAsync(storeKey, fakeUserObjectError, storeOptionsValue);
    const result = await getUserData();

    expect(Store.getItemAsync).toBeCalledWith(storeKey, storeOptionsValue);
    expect(result).toEqual(null);
  });

  it('should delete User Data', async () => {
    jest.spyOn(Store, 'deleteItemAsync');

    await deleteUserData();

    expect(Store.deleteItemAsync).toBeCalledWith(storeKey, storeOptionsValue);
  });
});
