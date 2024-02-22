import { MaskedRange } from 'imask';

import createMaskFactory from '../factory';

export const maskDate = createMaskFactory(
  {
    mask: 'd/m/Y',
    blocks: {
      d: {
        mask: MaskedRange,
        from: 1,
        to: 31,
      },
      m: {
        mask: MaskedRange,
        from: 1,
        to: 12,
      },
      Y: {
        mask: MaskedRange,
        from: 0,
        to: 9999,
      },
    },
  },
);
