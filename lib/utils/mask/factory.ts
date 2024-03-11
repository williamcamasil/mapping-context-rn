import IMask from 'imask';

type MaskableValueType = string | null | undefined;

/**
 * Cria funções de format e parse para aplicação e remoção de máscara.
 *
 * Utiliza IMask https://imask.js.org
 *
 * @param formatted configuração da máscara do format
 * @param parsed configuração do formato do valor retornado
 * @returns
 */
const createMaskFactory = (
  formatted: IMask.AnyMasked | IMask.AnyMaskedOptions,
  parsed?: IMask.AnyMasked | IMask.AnyMaskedOptions,
) => ({
  format<T extends MaskableValueType>(value: T): T | string {
    if (typeof value !== 'string') return value;
    return IMask.pipe(
      value,
      formatted,
      IMask.PIPE_TYPE.TYPED,
      IMask.PIPE_TYPE.MASKED,
    ) as string;
  },
  parse<T extends MaskableValueType>(value: T): T | string {
    if (typeof value !== 'string') return value;
    return IMask.pipe(
      value,
      parsed ?? formatted,
      IMask.PIPE_TYPE.MASKED,
      IMask.PIPE_TYPE.UNMASKED,
    ) as string;
  },
});

export default createMaskFactory;
