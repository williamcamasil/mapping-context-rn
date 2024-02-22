import { maskAccountNumber } from '.';

describe('maskAccountNumber format', () => {
  it('Should add mask to a value unmasked', () => {
    const masked = maskAccountNumber.format('1234567890123');

    expect(masked).toBe('123456789012-3');
  });

  it('Should keep mask when value is already masked', () => {
    const masked = maskAccountNumber.format('123456789012-3');

    expect(masked).toBe('123456789012-3');
  });

  it('Should mask value with any length removing hyphen', () => {
    expect(maskAccountNumber.format('3834')).toBe('383-4');
    expect(maskAccountNumber.format('3834069')).toBe('383406-9');
    expect(maskAccountNumber.format('1234567890123')).toBe('123456789012-3');
  });

  it('Should return empty value', () => {
    expect(maskAccountNumber.format()).toBe('');
  });

  it('Should validate invalid values', () => {
    expect(maskAccountNumber.format('asdfasdfasdfasdf')).toBe('');
    expect(maskAccountNumber.format('')).toBe('');
  });
});

describe('maskAccountNumber parse', () => {
  it('Should keep parse when value is already masked', () => {
    const parsed = maskAccountNumber.parse('123456789012-3');

    expect(parsed).toBe('1234567890123');
  });

  it('Should parse value with any length removing hyphen', () => {
    expect(maskAccountNumber.parse('383-4')).toBe('3834');
    expect(maskAccountNumber.parse('383406-9')).toBe('3834069');
    expect(maskAccountNumber.parse('383406918-3')).toBe('3834069183');
  });

  it('Should return empty value', () => {
    expect(maskAccountNumber.parse()).toBe('');
  });
});
