import Store, { SecureStoreOptions } from '../store';

export const storeKey = 'keyOnboardingAccountData_';
export const storeOptionsValue: SecureStoreOptions = {
  keychainService: 'onboardingAccountData_keychainService',
};

export type OnboardingAccountDataStoreType = {
  accountDigit: string;
  accountNumber: string;
  agency: string;
  bank: string;
  bankCode: string;
};

export async function setOnboardingAccountData(
  documentNumber: string,
  onboardingData: OnboardingAccountDataStoreType,
): Promise<void> {
  await Store.setItemAsync(
    storeKey + documentNumber,
    JSON.stringify(onboardingData),
    storeOptionsValue,
  );
}

export async function getOnboardingAccountData(documentNumber: string): Promise<OnboardingAccountDataStoreType | null> {
  try {
    const result = await Store.getItemAsync(storeKey + documentNumber, storeOptionsValue);
    if (!result) return null;
    return JSON.parse(result);
  } catch (err) {
    return null;
  }
}

export async function deleteOnboardingAccountData(documentNumber: string): Promise<void> {
  await Store.deleteItemAsync(storeKey + documentNumber, storeOptionsValue);
}
