import { MaskedRange } from 'imask';

import createMaskFactory from '../factory';

export const maskMonth = createMaskFactory(
  {
    mask: MaskedRange,
    from: 1,
    to: 12,
    autofix: 'pad',
  },
);
