import Store, { SecureStoreOptions } from '../store';

export const storeKey = 'keySelectedAccount_';
export const storeOptionsValue: SecureStoreOptions = {
  keychainService: 'selectedAccount_keychainService',
};

export type SelectedAccountStoreType = {
  accountNumber: number;
};

export async function setSelectedAccount(documentNumber: string, userDataObj: SelectedAccountStoreType): Promise<void> {
  await Store.setItemAsync(
    storeKey + documentNumber,
    JSON.stringify(userDataObj),
    storeOptionsValue,
  );
}

export async function getSelectedAccount(documentNumber: string): Promise<SelectedAccountStoreType | null> {
  try {
    const result = await Store.getItemAsync(storeKey + documentNumber, storeOptionsValue);
    if (!result) return null;
    return JSON.parse(result);
  } catch (err) {
    return null;
  }
}

export async function deleteSelectedAccount(documentNumber: string): Promise<void> {
  await Store.deleteItemAsync(storeKey + documentNumber, storeOptionsValue);
}
