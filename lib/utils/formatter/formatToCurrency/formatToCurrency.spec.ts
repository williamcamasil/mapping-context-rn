import formatToCurrency from '.';

describe('Format to currency', () => {
  it('Format to currency to string', () => {
    const text = formatToCurrency(1900);
    const textCents = formatToCurrency(1900.15);

    expect(text).toStrictEqual('R$\xa01.900,00');
    expect(textCents).toStrictEqual('R$\xa01.900,15');
  });
});
