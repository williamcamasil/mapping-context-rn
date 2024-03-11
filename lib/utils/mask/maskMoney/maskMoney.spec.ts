import { maskMoney } from './index';

describe('maskMoney format', () => {
  it('Should mask to currency as zero', () => {
    const masked = maskMoney.format('0');

    expect(masked).toBe('R$ 0,00');
  });

  it('Should return an empty string', () => {
    const masked = maskMoney.format();

    expect(masked).toBe('');
  });

  it('Should mask to currency in cents', () => {
    const masked = maskMoney.format('1');

    expect(masked).toBe('R$ 0,01');
  });

  it('Should mask to currency in decimal cents', () => {
    const masked = maskMoney.format('10');

    expect(masked).toBe('R$ 0,10');
  });

  it('Should mask to currency in a real', () => {
    const masked = maskMoney.format('100');

    expect(masked).toBe('R$ 1,00');
  });
  it('Should mask to currency in millions', () => {
    const masked = maskMoney.format('100000000');

    expect(masked).toBe('R$ 1.000.000,00');
  });
});

describe('maskMoney parse', () => {
  it('Should parse currency to a string with numbers only and fractional part', () => {
    const parsed = maskMoney.parse('R$ 1.000,58');

    expect(parsed).toBe('1000.58');
  });

  it('Should return an empty string', () => {
    expect(maskMoney.parse(undefined)).toBe('');
  });
});
