
import 'react-native';
import Store from './store';

const fakeOtpData = JSON.stringify(
  {
    deviceId: 'deviceId-as5d4as5d4as54d5as4d',
    otpKey: 'otpKey-a5d5ad5das56d4as56d4asd',
    packetHash: 'packetHash-dsf56ds456f4s56d456dfs',
  },
);

const storeKey = 'storekey_';

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock('react-native/Libraries/Utilities/Platform', () => {
  const Platform = jest.requireActual(
    'react-native/Libraries/Utilities/Platform',
  );
  Platform.OS = 'android';
  return Platform;
});

describe('store', () => {
  it('should set item to store', async () => {

    await Store.setItemAsync(storeKey, fakeOtpData);
    const result = await Store.getItemAsync(storeKey);

    expect(result).toEqual(fakeOtpData);
  });

  it('should get item from store', async () => {

    await Store.setItemAsync(storeKey, fakeOtpData);
    const result = await Store.getItemAsync(storeKey);

    expect(result).toEqual(fakeOtpData);
  });

  it('should delete item from store', async () => {
    await Store.setItemAsync(storeKey, fakeOtpData);
    await Store.deleteItemAsync(storeKey);
    const result = await Store.getItemAsync(storeKey);
    expect(result).toBeUndefined();
  });
});
