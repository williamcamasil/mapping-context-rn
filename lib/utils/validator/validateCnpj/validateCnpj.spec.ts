import { validateCnpj, CNPJ_BLACKLIST } from '.';

describe('validateCnpj', () => {
  it.each(CNPJ_BLACKLIST)('Should return all numbers from blacklist as invalid', cnpj => {
    expect(validateCnpj(cnpj)).toBe('Número de CNPJ inválido');
  });
  it('Should return all numbers as invalid', () => {
    expect(validateCnpj('11111111111111')).toBe('Número de CNPJ inválido');
    expect(validateCnpj('12345678910')).toBe('Número de CNPJ inválido');
    expect(validateCnpj('111111111')).toBe('Número de CNPJ inválido');
    expect(validateCnpj('')).toBe('Número de CNPJ inválido');
  });
  it('Should return all numbers as valid', () => {
    expect(validateCnpj('41047492000158')).toBeUndefined();
    expect(validateCnpj('38570502000120')).toBeUndefined();
    expect(validateCnpj('09647491000131')).toBeUndefined();
  });
});
