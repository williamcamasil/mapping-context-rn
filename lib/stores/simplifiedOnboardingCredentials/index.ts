import Store, { SecureStoreOptions } from '../store';

export const keyOnboardingCredentials = 'keyOnboardingCredentials';

export const optionsValue: SecureStoreOptions = {
  keychainService: 'simplifiedOnboardingCredentials_keychain',
};

// TODO: Armazenando dados como medida temporária que deve ser revista.
// Essas informações estão sendo persistidas para garantir a comunicação com o onboarding simplificado,
// no entanto essa não é a forma correta de tratar esses dados e deverá ser revistos a forma compartilhar
// informações entre o Onboarding Simplificado e o Meu Financiamento. Principalmente a parte do token que
// deveria ser tratado pelo backend do Meu financiamento e ficar transparente para o frontend.
export type SimplifiedOnboardingCredentialsStoreType = {

  token: string;
  notifyRefusal: boolean;
  phase: 'CADASTRO_ACIMA_3_MESES' | 'CADASTRO_ATE_3_MESES';
};

export async function setSimplifiedOnboardingCredential(
  credentialData: SimplifiedOnboardingCredentialsStoreType,
): Promise<void> {
  await Store.setItemAsync(keyOnboardingCredentials, JSON.stringify(credentialData), optionsValue);
}

export async function getSimplifiedOnboardingCredential(): Promise<SimplifiedOnboardingCredentialsStoreType | null> {
  try {
    const result = await Store.getItemAsync(keyOnboardingCredentials, optionsValue);
    if (!result) return null;
    return JSON.parse(result);
  } catch (err) {
    return null;
  }
}

export async function deleteSimplifiedOnboardingCredential(): Promise<void> {
  await Store.deleteItemAsync(keyOnboardingCredentials, optionsValue);
}

