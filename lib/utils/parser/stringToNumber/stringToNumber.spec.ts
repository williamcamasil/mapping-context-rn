import stringToNumber from './index';

describe('stringToNumber', () => {
  it('Should return all numbers as invalid', () => {
    expect(stringToNumber('abc')).toBe(NaN);
    expect(stringToNumber('')).toBe(0);
    expect(stringToNumber('ab0')).toBe(NaN);
  });
  it('Should return all numbers as valid', () => {
    expect(stringToNumber('1111111111111')).toBe(1111111111111);
    expect(stringToNumber('2')).toBe(2);
  });
});
