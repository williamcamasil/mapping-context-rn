import createMaskFactory from '../factory';

export const maskCpf = createMaskFactory(
  {
    mask: '000.000.000-00',
  },
);
