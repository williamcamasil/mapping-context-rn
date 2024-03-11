import validatePhoneNumber from '.';

describe('validatePhoneNumber', () => {
  it('Should check if the phone number is valid', () => {
    const validPhoneNumber1 = validatePhoneNumber('(44) 999659999');
    const validPhoneNumber2 = validatePhoneNumber('44999659999');
    const validPhoneNumber3 = validatePhoneNumber('(44) 99999-1111');

    expect(validPhoneNumber1).toBe(undefined);
    expect(validPhoneNumber2).toBe(undefined);
    expect(validPhoneNumber3).toBe(undefined);
  });

  it('Should check if the phone number is invalid', () => {
    const invalidPhoneNumber1 = validatePhoneNumber('&@#@&&#123456');
    const invalidPhoneNumber2 = validatePhoneNumber('9999999');
    const invalidPhoneNumber3 = validatePhoneNumber('449999999');
    const invalidPhoneNumber4 = validatePhoneNumber('999999990000');
    const invalidPhoneNumber5 = validatePhoneNumber('(44) 9999-1111');

    expect(invalidPhoneNumber1).toBe('Informe um número válido');
    expect(invalidPhoneNumber2).toBe('Informe um número válido');
    expect(invalidPhoneNumber3).toBe('Informe um número válido');
    expect(invalidPhoneNumber4).toBe('Informe um número válido');
    expect(invalidPhoneNumber5).toBe('Informe um número válido');
  });

  it('Should validate if the parameter was not informed', () => {
    const validPhoneNumber = validatePhoneNumber('');

    expect(validPhoneNumber).toBe('Campo obrigatório');
  });
});
