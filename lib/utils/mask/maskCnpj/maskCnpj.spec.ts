import { maskCnpj } from '.';

describe('maskCnpj format', () => {
  it('Should add mask', () => {
    const masked = maskCnpj.format('10577887000139');

    expect(masked).toBe('10.577.887/0001-39');
  });

  it('Should return masked value ', () => {
    const masked = maskCnpj.format('10.577.887/0001-39');

    expect(masked).toBe('10.577.887/0001-39');
  });

  it('Should return to partial mask', () => {
    expect(maskCnpj.format('10577')).toBe('10.577');
    expect(maskCnpj.format('10577887')).toBe('10.577.887');
    expect(maskCnpj.format('105778870001')).toBe('10.577.887/0001');
    expect(maskCnpj.format('10577887000139')).toBe('10.577.887/0001-39');
  });

  it('Should validade null/undefined values', () => {
    expect(maskCnpj.format(null)).toBe(null);
    expect(maskCnpj.format(undefined)).toBe(undefined);
  });

  it('Should validade invalid values', () => {
    expect(maskCnpj.format('asdfasdfasdfasdf')).toBe('');
    expect(maskCnpj.format('')).toBe('');
  });
});

describe('maskCnpj parse', () => {
  it('Should remove mask', () => {
    const parsed = maskCnpj.parse('10.577.887/0001-39');

    expect(parsed).toBe('10577887000139');
  });

  it('Should remove partial mask', () => {
    expect(maskCnpj.parse('10.577')).toBe('10577');
    expect(maskCnpj.parse('10.577.887')).toBe('10577887');
    expect(maskCnpj.parse('10.577.887/0001')).toBe('105778870001');
    expect(maskCnpj.parse('10.577.887/0001-39')).toBe('10577887000139');
  });

  it('Should validate null/undefined values', () => {
    expect(maskCnpj.parse(null)).toBe(null);
    expect(maskCnpj.parse(undefined)).toBe(undefined);
  });
});
