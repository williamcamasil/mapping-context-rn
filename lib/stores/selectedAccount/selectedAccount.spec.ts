
import 'react-native';

import {
  SelectedAccountStoreType,
  deleteSelectedAccount,
  getSelectedAccount,
  storeKey,
  storeOptionsValue,
  setSelectedAccount,
} from '.';
import Store from '../store';

const fakeDocumentNumber = '12345678900';

const fakeKey = storeKey + fakeDocumentNumber;

const fakeUser: SelectedAccountStoreType = {
  accountNumber: 123456,
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('selectedAccount', () => {
  it('should set Selected account', async () => {
    jest.spyOn(Store, 'setItemAsync');

    await setSelectedAccount(fakeDocumentNumber, fakeUser);
    expect(Store.setItemAsync).toBeCalledWith(
      fakeKey,
      JSON.stringify(fakeUser),
      storeOptionsValue,
    );
  });

  it('should get Selected account', async () => {
    jest.spyOn(Store, 'getItemAsync');

    await Store.setItemAsync(fakeKey, JSON.stringify(fakeUser), storeOptionsValue);
    const result = await getSelectedAccount(fakeDocumentNumber);
    expect(Store.getItemAsync).toBeCalledWith(fakeKey, storeOptionsValue);
    expect(result).toEqual(fakeUser);
  });

  it('should get Selected account with empty object', async () => {
    jest.spyOn(Store, 'getItemAsync');

    const fakeUserObjectError = '';
    await Store.setItemAsync(fakeKey, fakeUserObjectError, storeOptionsValue);
    const result = await getSelectedAccount(fakeDocumentNumber);
    expect(Store.getItemAsync).toBeCalledWith(fakeKey, storeOptionsValue);
    expect(result).toEqual(null);
  });

  it('should get Selected account with incomplete object', async () => {
    jest.spyOn(Store, 'getItemAsync');

    const fakeUserObjectError = '{id:';
    await Store.setItemAsync(fakeKey, fakeUserObjectError, storeOptionsValue);
    const result = await getSelectedAccount(fakeDocumentNumber);
    expect(Store.getItemAsync).toBeCalledWith(fakeKey, storeOptionsValue);
    expect(result).toEqual(null);
  });

  it('should delete Selected account', async () => {
    jest.spyOn(Store, 'deleteItemAsync');
    await deleteSelectedAccount(fakeDocumentNumber);
    expect(Store.deleteItemAsync).toBeCalledWith(fakeKey, storeOptionsValue);
  });
});
