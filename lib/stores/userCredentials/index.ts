import Store, { SecureStoreOptions } from '../store';

export const storeKey = 'keyUserCredentials_';
export const storeOptionsValue: SecureStoreOptions = {
  requireAuthentication: true,
  authenticationPrompt: 'Autorize o acesso às credenciais de usuário.',
};

export type UserCredentialsStoreType = {
  password: string;
};

export async function setUserCredentials(documentNumber: string, userDataObj: UserCredentialsStoreType): Promise<void> {
  await Store.setItemAsync(
    storeKey + documentNumber,
    JSON.stringify(userDataObj),
    storeOptionsValue,
  );
}

export async function getUserCredentials(documentNumber: string): Promise<UserCredentialsStoreType | null> {
  try {
    const result = await Store.getItemAsync(storeKey + documentNumber, storeOptionsValue);
    if (!result) return null;
    return JSON.parse(result);
  } catch (err) {
    return null;
  }
}

export async function deleteUserCredentials(documentNumber: string): Promise<void> {
  await Store.deleteItemAsync(storeKey + documentNumber, storeOptionsValue);
}
