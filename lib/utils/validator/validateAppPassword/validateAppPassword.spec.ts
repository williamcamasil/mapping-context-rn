import validatePassword from '.';

describe('validateAppPassword', () => {
  it('valid', () => {
    const result = validatePassword('123456');

    expect(result).toEqual(undefined);
  });

  it('validate number of characters entered', () => {
    const result = validatePassword('123');

    expect(result).toEqual('Senha deve conter no mínimo 6 digitos.');
  });

  it('validate without password', () => {
    const result = validatePassword('');

    expect(result).toEqual('Informe a senha de acesso');
  });

  it('Should tell to inform password when value is undefined', () => {
    const result = validatePassword();

    expect(result).toEqual('Informe a senha de acesso');
  });
});
