import { zxcvbn, zxcvbnOptions, ZxcvbnResult } from '@zxcvbn-ts/core';
import { MatchExtended } from '@zxcvbn-ts/core/dist/types';
import zxcvbnPtBrPackage from '@zxcvbn-ts/language-pt-br';

zxcvbnOptions.setOptions(zxcvbnPtBrPackage);

const validateStrongPin = (pin: string | undefined): string | undefined => {
  if (!pin) return 'Por segurança recomendamos que você tente uma senha forte.';

  const result: ZxcvbnResult = zxcvbn(pin);

  const resultSequence = result?.sequence.filter((seq: MatchExtended) => seq.pattern === 'sequence');
  const resultRepeat = result?.sequence.filter((seq: MatchExtended) => seq.pattern === 'repeat' && seq.repeatCount >= 3);

  if (resultSequence?.length > 0) {
    return 'Não utilize números em sequência na sua senha.';
  }

  if (resultRepeat?.length > 0) {
    return 'Não utilize repetição de números em sua senha.';
  }

  return undefined;
};

export default validateStrongPin;
