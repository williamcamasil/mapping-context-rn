/*
 * Importa a lib de forma inline e opcional para não obrigar os demais repositórios
 * a instalarem o também.
 */
// @ts-ignore
let ExpoImageManipulator: typeof import('expo-image-manipulator');
// @ts-ignore
type Action = import('expo-image-manipulator').Action;
// @ts-ignore
type SaveOptions = import('expo-image-manipulator').SaveOptions;
/* istanbul ignore next */
try {
  if (require('expo-image-manipulator')) {
    ExpoImageManipulator = require('expo-image-manipulator');
  }
} catch (err) {
  if (process.env.NODE_ENV !== 'test') {
    console.warn(err);
  }
}

export const ImageManipulator = {
  async manipulate(
    uri: string,
    actions: Action[],
    saveOptions?: SaveOptions,
  ) {
    return ExpoImageManipulator.manipulateAsync(uri, actions, saveOptions);
  },
};
