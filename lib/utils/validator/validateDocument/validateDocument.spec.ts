import validadeDocument from '.';

describe('validateDocument', () => {
  it('Should required filed', () => {
    expect(validadeDocument('')).toBe('Campo obrigatório');
  });

  it('Should return invalid and valid CPF', () => {
    expect(validadeDocument('647.766.010-53')).toBe('Número de CPF inválido');
    expect(validadeDocument('647.766.010-52')).toBe(undefined);
  });

  it('Should return invalid and valid CNPJ', () => {
    expect(validadeDocument('09.647.491/0001-32')).toBe('Número de CNPJ inválido');
    expect(validadeDocument('09.647.491/0001-31')).toBe(undefined);
  });
});
