import { maskDate } from './index';

describe('maskDate format', () => {
  it('Should mask to date', () => {
    const masked = maskDate.format('22122020');

    expect(masked).toBe('22/12/2020');
  });

  it('Should keep the format', () => {
    const masked = maskDate.format('22/12/2020');

    expect(masked).toBe('22/12/2020');
  });

  it('Should return partial masks', () => {
    expect(maskDate.format('2212')).toBe('22/12');
    expect(maskDate.format('221219')).toBe('22/12/19');
    expect(maskDate.format('221')).toBe('22/1');
    expect(maskDate.format('1/1/1')).toBe('11/1');
  });

  it('Should keep null/undefined values', () => {
    expect(maskDate.format(null)).toBe(null);
    expect(maskDate.format(undefined)).toBe(undefined);
  });

  it('Should filter only numbers', () => {
    expect(maskDate.format('1a2b0c5d2e0f2g0h8i3j0k2as58sd87')).toBe('12/05/2020');
  });

  it('Should return empty on invalid values', () => {
    expect(maskDate.format('abcdefgh')).toBe('');
    expect(maskDate.format('')).toBe('');
    expect(maskDate.format('99/99/9999')).toBe('');
  });
});

describe('maskDate parse', () => {
  it('Should parse date to numbers only', () => {
    const parsed = maskDate.parse('22/12/2020');

    expect(parsed).toBe('22122020');
  });

  it('Should parse partial dates', () => {
    expect(maskDate.parse('22/12')).toBe('2212');
    expect(maskDate.parse('22/12/20')).toBe('221220');
  });

  it('Should parse invalid dates to an empty value', () => {
    expect(maskDate.parse('99/99/9999')).toBe('');
  });

  it('Should keep null/undefined values on parse', () => {
    expect(maskDate.parse(null)).toBe(null);
    expect(maskDate.parse(undefined)).toBe(undefined);
  });
});
