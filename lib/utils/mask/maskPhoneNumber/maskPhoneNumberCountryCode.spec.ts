import { maskPhoneNumberCountryCode } from '.';

describe('maskPhoneNumberCountryCode format', () => {
  it('unmasked', () => {
    const masked = maskPhoneNumberCountryCode.format('+554499594675');

    expect(masked).toBe('+55 (44) 9959-4675');
  });

  it('unmasked with 9', () => {
    const masked = maskPhoneNumberCountryCode.format('+5544999594675');

    expect(masked).toBe('+55 (44) 9 9959-4675');
  });

  it('masked', () => {
    const masked = maskPhoneNumberCountryCode.format('+55 (44) 9959-4675');

    expect(masked).toBe('+55 (44) 9959-4675');
  });

  it('masked with 9', () => {
    const masked = maskPhoneNumberCountryCode.format('+55 (44) 9 9959-4675');

    expect(masked).toBe('+55 (44) 9 9959-4675');
  });

  it('partial', () => {
    expect(maskPhoneNumberCountryCode.format('+55449')).toBe('+55 (44) 9');
    expect(maskPhoneNumberCountryCode.format('+5544999')).toBe('+55 (44) 999');
    expect(maskPhoneNumberCountryCode.format('+554499959')).toBe('+55 (44) 9995-9');
    expect(maskPhoneNumberCountryCode.format('+554499959467')).toBe('+55 (44) 9995-9467');
    expect(maskPhoneNumberCountryCode.format('+5544999594675')).toBe('+55 (44) 9 9959-4675');
  });

  it('invalid', () => {
    expect(maskPhoneNumberCountryCode.format('+554a4b9c9d9e5f9g4h6i7j5k')).toBe('+55 (44) 9 9959-4675');
    expect(maskPhoneNumberCountryCode.format('asdfasdfasdfasdf')).toBe('+');
    expect(maskPhoneNumberCountryCode.format('')).toBe('');
  });
});

describe('maskPhoneNumberCountryCode parse', () => {
  it('masked', () => {
    const parsed = maskPhoneNumberCountryCode.parse('+55 (44) 9959-4675');

    expect(parsed).toBe('554499594675');
  });

  it('masked with 9', () => {
    const parsed = maskPhoneNumberCountryCode.parse('+55 (44) 9 9959-4675');

    expect(parsed).toBe('5544999594675');
  });
});
