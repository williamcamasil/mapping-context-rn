import { maskCep } from '.';

describe('maskCep format', () => {
  it('unmasked', () => {
    const masked = maskCep.format('06694000');

    expect(masked).toBe('06694-000');
  });

  it('masked', () => {
    const masked = maskCep.format('06694-000');

    expect(masked).toBe('06694-000');
  });

  it('partial', () => {
    expect(maskCep.format('066')).toBe('066');
    expect(maskCep.format('066940')).toBe('06694-0');
    expect(maskCep.format('06694000')).toBe('06694-000');
  });

  it('invalid', () => {
    expect(maskCep.format('0a6b6c9d4e0f0g0h6i7j5k')).toBe('06694-000');
    expect(maskCep.format('')).toBe('');
  });
});

describe('maskCep parse', () => {
  it('masked', () => {
    const parsed = maskCep.parse('06694-000');

    expect(parsed).toBe('06694000');
  });
});
