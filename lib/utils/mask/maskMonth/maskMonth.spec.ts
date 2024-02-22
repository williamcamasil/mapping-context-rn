import { maskMonth } from '.';

describe('maskMonth format', () => {
  it('Should mask to valid date', () => {
    const masked = maskMonth.format('99');

    expect(masked).toBe('09');
  });

  it('Should keep the format', () => {
    const masked = maskMonth.format('01');

    expect(masked).toBe('01');
  });

  it('Should keep null/undefined values', () => {
    expect(maskMonth.format(null)).toBe(null);
    expect(maskMonth.format(undefined)).toBe(undefined);
  });

  it('Should filter only first two numbers', () => {
    expect(maskMonth.format('1a2b0c5d2e0f2g0h8i3j0k2as58sd87')).toBe('12');
  });

  it('Should return empty on invalid values', () => {
    expect(maskMonth.format('abcdefgh')).toBe('');
    expect(maskMonth.format('')).toBe('');
  });
});
