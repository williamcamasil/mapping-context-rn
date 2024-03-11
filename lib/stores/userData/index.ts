import Store, { SecureStoreOptions } from '../store';

export const storeKey = 'keyUserData';
export const storeOptionsValue: SecureStoreOptions = {
  keychainService: 'userData_keychainService',
};

export type UserDataVariantType = 'bank' | 'loan';

export type UserDataStoreType = {
  name?: string;
  documentNumber?: string;
  withBiometry?: boolean;
  isBiometryActive?: boolean;
  variant?: UserDataVariantType;
};

export async function setUserData(userDataObj: UserDataStoreType): Promise<void> {
  await Store.setItemAsync(
    storeKey,
    JSON.stringify(userDataObj),
    storeOptionsValue,
  );
}

export async function getUserData(): Promise<UserDataStoreType | null> {
  try {
    const result = await Store.getItemAsync(storeKey, storeOptionsValue);
    if (!result) return null;
    return JSON.parse(result);
  } catch (err) {
    return null;
  }
}

export async function deleteUserData(): Promise<void> {
  await Store.deleteItemAsync(storeKey, storeOptionsValue);
}
