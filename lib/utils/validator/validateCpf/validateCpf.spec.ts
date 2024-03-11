import { validateCpf, CPF_BLACKLIST } from '.';

describe('validateCpf', () => {
  it.each(CPF_BLACKLIST)('Should return all numbers from blacklist as invalid', cpf => {
    expect(validateCpf(cpf)).toBe('Número de CPF inválido');
  });
  it('Should return all numbers as invalid', () => {
    expect(validateCpf('1111111111111')).toBe('Número de CPF inválido');
    expect(validateCpf('12345678910')).toBe('Número de CPF inválido');
    expect(validateCpf('111111111')).toBe('Número de CPF inválido');
    expect(validateCpf('')).toBe('Número de CPF inválido');
  });
  it('Should return all numbers as valid', () => {
    expect(validateCpf('21217722009')).toBeUndefined();
    expect(validateCpf('45200623065')).toBeUndefined();
    expect(validateCpf('29479411016')).toBeUndefined();
  });
});
