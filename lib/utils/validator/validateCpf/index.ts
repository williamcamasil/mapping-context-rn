import { maskCpf } from '../../mask';

export const CPF_BLACKLIST = [
  '00000000000',
  '11111111111',
  '22222222222',
  '33333333333',
  '44444444444',
  '55555555555',
  '66666666666',
  '77777777777',
  '88888888888',
  '99999999999',
  '12345678909',
];

const verifyCPFVerifierDigit = (value: string) => {
  const numbers = value
    .split('')
    .map(number => Number(number));
  const modulus = numbers.length + 1;
  const multiplied = numbers.map((number, index) => number * (modulus - index));
  const mod = multiplied.reduce((buffer, number) => buffer + number) % 11;
  return (mod < 2 ? 0 : 11 - mod);
};

export const validateCpf = (value?: string | null) => {
  const stripped = maskCpf.parse(value);

  if (stripped && stripped.length === 11 && CPF_BLACKLIST.indexOf(stripped) === -1) {
    let numbers = stripped.substring(0, 9);
    numbers += verifyCPFVerifierDigit(numbers);
    numbers += verifyCPFVerifierDigit(numbers);

    if (numbers.endsWith(stripped.substring(-2))) {
      return undefined;
    }
  }

  return 'Número de CPF inválido';
};

export default validateCpf;
