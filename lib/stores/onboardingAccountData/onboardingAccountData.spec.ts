
import 'react-native';

import {
  OnboardingAccountDataStoreType,
  deleteOnboardingAccountData,
  getOnboardingAccountData,
  storeKey,
  storeOptionsValue,
  setOnboardingAccountData,
} from '.';
import Store from '../store';

const fakeDocumentNumber = '12345678900';

const fakeKey = storeKey + fakeDocumentNumber;

const fakeOnboardingAccount: OnboardingAccountDataStoreType = {
  accountDigit: '01',
  accountNumber: '22334',
  agency: '001',
  bank: '001',
  bankCode: '120',
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('onboardingAccountData', () => {
  it('should set Onboarding account data', async () => {
    jest.spyOn(Store, 'setItemAsync');

    await setOnboardingAccountData(fakeDocumentNumber, fakeOnboardingAccount);

    expect(Store.setItemAsync).toBeCalledWith(
      fakeKey,
      JSON.stringify(fakeOnboardingAccount),
      storeOptionsValue,
    );
  });

  it('should get Onboarding account data', async () => {
    jest.spyOn(Store, 'getItemAsync');

    await Store.setItemAsync(fakeKey, JSON.stringify(fakeOnboardingAccount), storeOptionsValue);
    const result = await getOnboardingAccountData(fakeDocumentNumber);

    expect(Store.getItemAsync).toBeCalledWith(fakeKey, storeOptionsValue);
    expect(result).toEqual(fakeOnboardingAccount);
  });

  it('should get Onboarding account data with empty object', async () => {
    const fakeOnboardingObjectError = '';
    await Store.setItemAsync(fakeKey, fakeOnboardingObjectError, storeOptionsValue);
    const result = await getOnboardingAccountData(fakeDocumentNumber);

    expect(Store.getItemAsync).toBeCalledWith(fakeKey, storeOptionsValue);
    expect(result).toEqual(null);
  });

  it('should get Onboarding account data with incomplete object', async () => {
    jest.spyOn(Store, 'getItemAsync');

    const fakeOnboardingObjectError = '{id:';
    await Store.setItemAsync(fakeKey, fakeOnboardingObjectError, storeOptionsValue);
    const result = await getOnboardingAccountData(fakeDocumentNumber);

    expect(Store.getItemAsync).toBeCalledWith(fakeKey, storeOptionsValue);
    expect(result).toEqual(null);
  });

  it('should delete Onboarding account data', async () => {
    jest.spyOn(Store, 'deleteItemAsync');

    await deleteOnboardingAccountData(fakeDocumentNumber);
    expect(Store.deleteItemAsync).toBeCalledWith(fakeKey, storeOptionsValue);
  });
});
