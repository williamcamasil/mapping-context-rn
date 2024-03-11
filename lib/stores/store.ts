import { Platform, Settings } from 'react-native';

/*
* Importa a lib de forma inline e opcional para não obrigar os demais repositórios
* a instalarem o também.
*/
// @ts-ignore
type SecureStoreType = typeof import('expo-secure-store');
let SecureStore: SecureStoreType = {} as any;
// @ts-ignore
export type SecureStoreOptions = import('expo-secure-store').SecureStoreOptions;
/* istanbul ignore next */
try {
  if (require('expo-secure-store')) {
    SecureStore = require('expo-secure-store');
  }
} catch (err) {
  if (process.env.NODE_ENV !== 'test') {
    console.warn(err);
  }
}

const SETTINGS_STORE_KEY_PREFIX = 'SETTINGS_STORE_KEY_PREFIX';

const removeInvalidCharacters = (key: string) => key.replace(/[^\w.-]g/, '_');

/**
 * Esse prefixo de key é necessário devido a forma com que o iOS trata os dados armazenados
 * no "keychain", que é a store criptografada utilizada pela lib "expo-secure-store".
 *
 * No iOS, os dados armazenados aqui não são apagados se o aplicativo for desinstalado, e ainda pode
 * acontecer do usuário restaurar o bkp dos dados de um iPhone em outro iPhone, e com isso serão
 * transferidos juntos todos os dados armazenados pela "expo-secure-store".
 *
 * Para contornar este problema, é concatenado na `key` utilizada na store um prefixo baseado no
 * "Date.now()", sendo criado e armazenado no "Settings" sempre que o app for aberto pela primeira vez
 * em um determinado aparelho.
 *
 * Como os dados armazenados no "Settings" são apagados se o app for desinstalado, e não é restaurado com
 * o bkp de um iPhone para outro, então garantimos que sempre teremos a "expo-secure-store" limpa também
 * nestes casos.
 *
 * @param key
 * @returns
 */
const addStoreKeyPrefix = (key: string) => {

  if (Platform.OS !== 'ios') return removeInvalidCharacters(`key_${key}`);

  let keyPrefix = Settings.get(SETTINGS_STORE_KEY_PREFIX);
  if (!keyPrefix) {
    keyPrefix = String(Date.now());
    Settings.set({
      [SETTINGS_STORE_KEY_PREFIX]: keyPrefix,
    });
  }

  return removeInvalidCharacters(`${keyPrefix}_${key}`);
};

const defaultStoreProps: SecureStoreOptions = {
  keychainService: 'super_app_mapping',
  keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY,
};

const deleteItemAsync = (
  key: string,
  options: SecureStoreOptions = {},
) => {
  const prefixKey = addStoreKeyPrefix(key);

  return SecureStore.deleteItemAsync(prefixKey, {
    ...defaultStoreProps,
    ...options,
  });
};

const setItemAsync = (
  key: string,
  value: string,
  options: SecureStoreOptions = {},
) => {
  const prefixKey = addStoreKeyPrefix(key);

  return SecureStore.setItemAsync(prefixKey, value, {
    ...defaultStoreProps,
    ...options,
  });
};

const getItemAsync = (
  key: string,
  options: SecureStoreOptions = {},
) => {
  const prefixKey = addStoreKeyPrefix(key);

  return SecureStore.getItemAsync(prefixKey, {
    ...defaultStoreProps,
    ...options,
  });
};

const Store = {
  deleteItemAsync,
  setItemAsync,
  getItemAsync,
};

export default Store;
