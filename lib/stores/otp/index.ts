import Store, { SecureStoreOptions } from '../store';

export const keyOtp = 'keyOtp_';

export const optionsValue: SecureStoreOptions = {
  keychainService: 'keyOtp_keychain',
};

export type OtpStoreType = {
  deviceId: string;
  otpKey: string;
  packetHash: string;
};

export async function setOtpData(document: string, data: OtpStoreType): Promise<void> {
  await Store.setItemAsync(keyOtp + document, JSON.stringify(data), optionsValue);
}

export async function getOtpData(document: string): Promise<OtpStoreType | null> {
  try {
    const result = await Store.getItemAsync(keyOtp + document, optionsValue);
    if (!result) return null;
    return JSON.parse(result);
  } catch (err) {
    return null;
  }
}

export async function deleteOtpData(document: string): Promise<void> {
  await Store.deleteItemAsync(keyOtp + document, optionsValue);
}
