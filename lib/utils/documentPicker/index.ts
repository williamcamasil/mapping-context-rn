/*
 * Importa a lib de câmera de forma inline para não obrigar os demais repositórios
 * a instalarem o pacote "expo-camera".
 */
// @ts-ignore
let ExpoDocumentPicker: typeof import('expo-document-picker');
// @ts-ignore
type DocumentPickerOptions = import('expo-document-picker').DocumentPickerOptions;
// @ts-ignore
type DocumentResult = import('expo-document-picker').DocumentResult;
/* istanbul ignore next */
try {
  if (require('expo-document-picker')) {
    ExpoDocumentPicker = require('expo-document-picker');
  }
} catch (err) {
  if (process.env.NODE_ENV !== 'test') {
    console.warn(err);
  }
}

export const DocumentPicker = {
  async getDocumentPicker(documentPickerParams?: DocumentPickerOptions):
  Promise<DocumentResult> {
    return ExpoDocumentPicker.getDocumentAsync(documentPickerParams);
  },
};
