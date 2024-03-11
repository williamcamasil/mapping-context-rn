import createMaskFactory from '../factory';

export const maskBarCode = createMaskFactory(
  {
    mask: '00000.00000 00000.000000 00000.000000 0 00000000000000',
  },
);
