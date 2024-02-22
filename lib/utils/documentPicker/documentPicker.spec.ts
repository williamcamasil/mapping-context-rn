import * as ExpoDocumentPicker from 'expo-document-picker';

import { DocumentPicker } from '.';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('DocumentPicker', () => {
  it('Should validate return success with data from an image', async () => {
    const responseData = await DocumentPicker.getDocumentPicker({
      multiple: false,
    });

    expect(responseData.type).toBe('success');

    if (responseData.type === 'success') {
      expect(responseData).toEqual({
        mimeType: 'image/jpeg',
        name: 'file.jpg',
        type: 'success',
        uri: 'file://result/file.jpg',
      });
    }

  });

  it('Should validate return cancel', async () => {
    jest.spyOn(ExpoDocumentPicker, 'getDocumentAsync').mockResolvedValueOnce({
      type: 'cancel',
    });

    const responseData = await DocumentPicker.getDocumentPicker({
      multiple: false,
    });

    expect(responseData.type).toBe('cancel');
  });
});
