import formatAccountNumber from '.';

describe('Format account number', () => {
  it('Should format account number', () => {
    const account1 = formatAccountNumber('1234567');
    const account2 = formatAccountNumber('25648995');

    expect(account1).toStrictEqual('123456-7');
    expect(account2).toStrictEqual('2564899-5');
  });
});
