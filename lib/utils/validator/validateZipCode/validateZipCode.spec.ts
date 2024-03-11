import validateZipCode from '.';

describe('validateZipCode', () => {
  it('Should check if zip code is valid', () => {
    const validZipCode1 = validateZipCode('04569-001');
    const validZipCode2 = validateZipCode('00000-000');
    const validZipCode3 = validateZipCode('99999-999');

    expect(validZipCode1).toBe(undefined);
    expect(validZipCode2).toBe(undefined);
    expect(validZipCode3).toBe(undefined);
  });

  it('Should check if zip code is invalid', () => {
    const invalidZipCode1 = validateZipCode('9');
    const invalidZipCode2 = validateZipCode('99');
    const invalidZipCode3 = validateZipCode('999');
    const invalidZipCode4 = validateZipCode('9999');
    const invalidZipCode5 = validateZipCode('99999');
    const invalidZipCode6 = validateZipCode('999999');
    const invalidZipCode7 = validateZipCode('9999999');
    const invalidZipCode8 = validateZipCode('99999999');
    const invalidZipCode9 = validateZipCode('999999999');
    const invalidZipCode10 = validateZipCode('9999999999');
    const invalidZipCode11 = validateZipCode('0406A-000');
    const invalidZipCode12 = validateZipCode('04067-00');
    const invalidZipCode13 = validateZipCode('04067-0');
    const invalidZipCode14 = validateZipCode('04067-');

    expect(invalidZipCode1).toBe('Informe um CEP válido');
    expect(invalidZipCode2).toBe('Informe um CEP válido');
    expect(invalidZipCode3).toBe('Informe um CEP válido');
    expect(invalidZipCode4).toBe('Informe um CEP válido');
    expect(invalidZipCode5).toBe('Informe um CEP válido');
    expect(invalidZipCode6).toBe('Informe um CEP válido');
    expect(invalidZipCode7).toBe('Informe um CEP válido');
    expect(invalidZipCode8).toBe('Informe um CEP válido');
    expect(invalidZipCode9).toBe('Informe um CEP válido');
    expect(invalidZipCode10).toBe('Informe um CEP válido');
    expect(invalidZipCode11).toBe('Informe um CEP válido');
    expect(invalidZipCode12).toBe('Informe um CEP válido');
    expect(invalidZipCode13).toBe('Informe um CEP válido');
    expect(invalidZipCode14).toBe('Informe um CEP válido');
  });

  it('Should validate if the parameter was not informed', () => {
    const validZipCode = validateZipCode('');

    expect(validZipCode).toBe('Campo obrigatório');
  });
});
