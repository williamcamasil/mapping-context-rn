
import 'react-native';

import {
  deleteOtpData,
  getOtpData,
  keyOtp,
  optionsValue,
  OtpStoreType,
  setOtpData,
} from '.';
import Store from '../store';

const fakeOtpData: OtpStoreType = {
  deviceId: 'deviceId-as5d4as5d4as54d5as4d',
  otpKey: 'otpKey-a5d5ad5das56d4as56d4asd',
  packetHash: 'packetHash-dsf56ds456f4s56d456dfs',
};

const fakeDocument = '654787932156';

const storeKey = keyOtp + fakeDocument;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('otp', () => {
  it('setOtpData', async () => {
    jest.spyOn(Store, 'setItemAsync');

    await setOtpData(fakeDocument, fakeOtpData);
    expect(Store.setItemAsync).toBeCalledWith(storeKey, JSON.stringify(fakeOtpData), optionsValue);
  });

  it('getOtpData', async () => {
    jest.spyOn(Store, 'getItemAsync');

    await Store.setItemAsync(storeKey, JSON.stringify(fakeOtpData), optionsValue);
    const result = await getOtpData(fakeDocument);
    expect(Store.getItemAsync).toBeCalledWith(storeKey, optionsValue);
    expect(result).toEqual(fakeOtpData);
  });

  it('getOtpData empty object', async () => {
    jest.spyOn(Store, 'getItemAsync');

    const fakeObjectError = '';
    await Store.setItemAsync(storeKey, fakeObjectError, optionsValue);
    const result = await getOtpData(fakeDocument);
    expect(Store.getItemAsync).toBeCalledWith(storeKey, optionsValue);
    expect(result).toEqual(null);
  });

  it('getOtpData incomplete object', async () => {
    jest.spyOn(Store, 'getItemAsync');

    const fakeUserObjectError = '{deviceId:';
    await Store.setItemAsync(storeKey, fakeUserObjectError, optionsValue);
    const result = await getOtpData(fakeDocument);
    expect(Store.getItemAsync).toBeCalledWith(storeKey, optionsValue);
    expect(result).toEqual(null);
  });

  it('deleteUserCredentials', async () => {
    jest.spyOn(Store, 'deleteItemAsync');

    await deleteOtpData(fakeDocument);
    expect(Store.deleteItemAsync).toBeCalledWith(storeKey, optionsValue);
  });
});
