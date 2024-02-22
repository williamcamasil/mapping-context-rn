
import 'react-native';

import {
  UserCredentialsStoreType,
  deleteUserCredentials,
  getUserCredentials,
  storeKey,
  storeOptionsValue,
  setUserCredentials,
} from '.';
import Store from '../store';

const fakeDocumentNumber = '12345678900';

const fakeKey = storeKey + fakeDocumentNumber;

const fakeUser: UserCredentialsStoreType = {
  password: 'senha123',
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('userCredentials', () => {
  it('should set User Credentials', async () => {
    jest.spyOn(Store, 'setItemAsync');

    await setUserCredentials(fakeDocumentNumber, fakeUser);

    expect(Store.setItemAsync).toBeCalledWith(
      fakeKey,
      JSON.stringify(fakeUser),
      storeOptionsValue,
    );
  });

  it('should get User Credentials', async () => {
    jest.spyOn(Store, 'getItemAsync');

    await Store.setItemAsync(fakeKey, JSON.stringify(fakeUser), storeOptionsValue);
    const result = await getUserCredentials(fakeDocumentNumber);

    expect(Store.getItemAsync).toBeCalledWith(fakeKey, storeOptionsValue);
    expect(result).toEqual(fakeUser);
  });

  it('should get User Credentials with empty object', async () => {
    const fakeUserObjectError = '';
    await Store.setItemAsync(fakeKey, fakeUserObjectError, storeOptionsValue);
    const result = await getUserCredentials(fakeDocumentNumber);

    expect(Store.getItemAsync).toBeCalledWith(fakeKey, storeOptionsValue);
    expect(result).toEqual(null);
  });

  it('should get User Credentials with incomplete object', async () => {
    jest.spyOn(Store, 'getItemAsync');

    const fakeUserObjectError = '{id:';
    await Store.setItemAsync(fakeKey, fakeUserObjectError, storeOptionsValue);
    const result = await getUserCredentials(fakeDocumentNumber);

    expect(Store.getItemAsync).toBeCalledWith(fakeKey, storeOptionsValue);
    expect(result).toEqual(null);
  });

  it('should delete User Credentials', async () => {
    jest.spyOn(Store, 'deleteItemAsync');

    await deleteUserCredentials(fakeDocumentNumber);
    expect(Store.deleteItemAsync).toBeCalledWith(fakeKey, storeOptionsValue);
  });
});
