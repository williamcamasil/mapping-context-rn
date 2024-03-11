import { validateStrongPin } from '..';

describe('ValidateStrongPin', () => {

  it('should validate pin with sequencial numbers', () => {
    const result = validateStrongPin('1234');
    const result2 = validateStrongPin('4321');

    const expectedOutcome = 'Não utilize números em sequência na sua senha.';

    expect(result).toEqual(expectedOutcome);
    expect(result2).toEqual(expectedOutcome);
  });

  it('should validate pin with repeated numbers', () => {
    const result = validateStrongPin('1111');
    const result2 = validateStrongPin('0000');

    const expectedOutcome = 'Não utilize repetição de números em sua senha.';

    expect(result).toEqual(expectedOutcome);
    expect(result2).toEqual(expectedOutcome);
  });

  it('should validate with not inserted pin numbers', () => {
    const result = validateStrongPin(undefined);

    expect(result).toEqual('Por segurança recomendamos que você tente uma senha forte.');
  });

  it('should validate pin strong', () => {
    const result = validateStrongPin('2743');

    expect(result).toBeUndefined();
  });
});
