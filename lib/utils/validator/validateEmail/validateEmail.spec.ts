import validateEmail from '.';

describe('validateEmail', () => {
  it('Should check if all emails are valid', () => {
    const validEmail1 = validateEmail('teste@teste.com');
    const validEmail2 = validateEmail('teste.teste_20@teste.com');
    const validEmail3 = validateEmail('teste@teste.com.br');
    expect(validEmail1).toBe(undefined);
    expect(validEmail2).toBe(undefined);
    expect(validEmail3).toBe(undefined);
  });
  it('Should check if all emails are invalid', () => {
    const invalidEmail1 = validateEmail('teste@.com');
    const invalidEmail2 = validateEmail('teste@');
    const invalidEmail3 = validateEmail('teste@.com.br.br');
    const invalidEmail4 = validateEmail('teste@teste.');
    const invalidEmail5 = validateEmail('@teste.com');
    const invalidEmail6 = validateEmail('teste.com');
    const invalidEmail7 = validateEmail('teste.com');
    const invalidEmail8 = validateEmail('teste@teste.com xyz');

    expect(invalidEmail1).toBe('Informe um e-mail válido');
    expect(invalidEmail2).toBe('Informe um e-mail válido');
    expect(invalidEmail3).toBe('Informe um e-mail válido');
    expect(invalidEmail4).toBe('Informe um e-mail válido');
    expect(invalidEmail5).toBe('Informe um e-mail válido');
    expect(invalidEmail6).toBe('Informe um e-mail válido');
    expect(invalidEmail7).toBe('Informe um e-mail válido');
    expect(invalidEmail8).toBe('Informe um e-mail válido');
  });
  it('Should validate if the parameter was not informed', () => {
    const emptyEmail = validateEmail('');
    expect(emptyEmail).toBe('Campo obrigatório');
  });
});

