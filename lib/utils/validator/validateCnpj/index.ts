import { maskCnpj } from '../../mask';

export const CNPJ_BLACKLIST = [
  '00000000000000',
  '11111111111111',
  '22222222222222',
  '33333333333333',
  '44444444444444',
  '55555555555555',
  '66666666666666',
  '77777777777777',
  '88888888888888',
  '99999999999999',
];

const verifyCNPJVerifierDigit = (cleanCnpj: string, digits: string, size: number) => {
  let sum = 0;
  let position = size - 7;

  for (let i = size; i >= 1; i -= 1) {
    sum += parseInt(cleanCnpj.charAt(size - i), 10) * position;
    position -= 1;
    if (position < 2) position = 9;
  }

  const result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  return result === parseInt(digits, 10);
};

export const validateCnpj = (value?: string | null) => {
  const stripped = maskCnpj.parse(value);

  if (stripped && stripped.length === 14 && CNPJ_BLACKLIST.indexOf(stripped) === -1) {
    const cnpjSize = stripped.length - 2;
    const firstDigitValid = verifyCNPJVerifierDigit(stripped, stripped.charAt(cnpjSize), cnpjSize);
    const secondDigitValid = verifyCNPJVerifierDigit(stripped, stripped.charAt(cnpjSize + 1), cnpjSize + 1);

    if (firstDigitValid && secondDigitValid) return undefined;
  }

  return 'Número de CNPJ inválido';
};

export default validateCnpj;
