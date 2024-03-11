import 'react-native';
import * as ExpoImageManipulator from 'expo-image-manipulator';

import { ImageManipulator } from '.';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('imageManipulator', () => {
  it('should manipulate image with resize action', async () => {
    await ImageManipulator.manipulate(
      'file://path/to/file.jpg',
      [
        {
          resize: {
            height: 100,
            width: 200,
          },
        },
      ],
    );

    expect(ExpoImageManipulator.manipulateAsync).toBeCalledWith(
      'file://path/to/file.jpg',
      [
        {
          resize: {
            height: 100,
            width: 200,
          },
        },
      ],
      undefined,
    );
  });

  it('should manipulate image with flip action', async () => {
    await ImageManipulator.manipulate(
      'file://path/to/file.jpg',
      [
        {
          flip: ExpoImageManipulator.FlipType.Horizontal,
        },
      ],
    );

    expect(ExpoImageManipulator.manipulateAsync).toBeCalledWith(
      'file://path/to/file.jpg',
      [
        {
          flip: ExpoImageManipulator.FlipType.Horizontal,
        },
      ],
      undefined,
    );
  });

  it('should manipulate image with save option', async () => {
    await ImageManipulator.manipulate(
      'file://path/to/file.jpg',
      [
        {
          resize: {
            height: 100,
            width: 200,
          },
        },
      ],
      {
        base64: true,
        compress: 0.5,
        format: ExpoImageManipulator.SaveFormat.JPEG,
      },
    );

    expect(ExpoImageManipulator.manipulateAsync).toBeCalledWith(
      'file://path/to/file.jpg',
      [
        {
          resize: {
            height: 100,
            width: 200,
          },
        },
      ],
      {
        base64: true,
        compress: 0.5,
        format: ExpoImageManipulator.SaveFormat.JPEG,
      },
    );
  });

});
