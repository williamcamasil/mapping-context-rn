import { maskPhoneNumber } from '.';

describe('maskPhoneNumber format', () => {
  it('unmasked', () => {
    const masked = maskPhoneNumber.format('4499594675');

    expect(masked).toBe('(44) 9959-4675');
  });

  it('unmasked with 9', () => {
    const masked = maskPhoneNumber.format('44999594675');

    expect(masked).toBe('(44) 9 9959-4675');
  });

  it('masked', () => {
    const masked = maskPhoneNumber.format('(44) 9959-4675');

    expect(masked).toBe('(44) 9959-4675');
  });

  it('masked with 9', () => {
    const masked = maskPhoneNumber.format('(44) 9 9959-4675');

    expect(masked).toBe('(44) 9 9959-4675');
  });

  it('partial', () => {
    expect(maskPhoneNumber.format('449')).toBe('(44) 9');
    expect(maskPhoneNumber.format('44999')).toBe('(44) 999');
    expect(maskPhoneNumber.format('4499959')).toBe('(44) 9995-9');
    expect(maskPhoneNumber.format('4499959467')).toBe('(44) 9995-9467');
    expect(maskPhoneNumber.format('44999594675')).toBe('(44) 9 9959-4675');
  });

  it('invalid', () => {
    expect(maskPhoneNumber.format('4a4b9c9d9e5f9g4h6i7j5k')).toBe('(44) 9 9959-4675');
    expect(maskPhoneNumber.format('asdfasdfasdfasdf')).toBe('(');
    expect(maskPhoneNumber.format('')).toBe('');
  });
});

describe('maskPhoneNumber parse', () => {
  it('masked', () => {
    const parsed = maskPhoneNumber.parse('(44) 9959-4675');

    expect(parsed).toBe('4499594675');
  });

  it('masked with 9', () => {
    const parsed = maskPhoneNumber.parse('(44) 9 9959-4675');

    expect(parsed).toBe('44999594675');
  });
});
