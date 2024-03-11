import createMaskFactory from '../factory';

export const maskPhoneNumber = createMaskFactory(
  {
    mask: [
      {
        mask: '(00) 0000-0000',
      },
      {
        mask: '(00) 0 0000-0000',
      },
    ],
    dispatch: (appended, dynamicMasked) => {
      const number = dynamicMasked.unmaskedValue + appended;
      if (number.length > 10) {
        return dynamicMasked.compiledMasks[1];
      }
      return dynamicMasked.compiledMasks[0];
    },
  },
);

export const maskPhoneNumberCountryCode = createMaskFactory(
  {
    mask: [
      {
        mask: '+00 (00) 0000-0000',
      },
      {
        mask: '+00 (00) 0 0000-0000',
      },
    ],
    dispatch: (appended, dynamicMasked) => {
      const number = dynamicMasked.unmaskedValue + appended;
      if (number.length > 12) {
        return dynamicMasked.compiledMasks[1];
      }
      return dynamicMasked.compiledMasks[0];
    },
  },
);
