import { maskBarCode } from '.';

describe('should format maskBarCode', () => {
  it('should mask unmasked text', () => {
    const masked = maskBarCode.format('23793391004000946202571005540209793820003846153');

    expect(masked).toBe('23793.39100 40009.462025 71005.540209 7 93820003846153');
  });

  it('should mask with diff masked text', () => {
    const masked = maskBarCode.format('237933910040009.462025 71005.540209 7 93820003846153');

    expect(masked).toBe('23793.39100 40009.462025 71005.540209 7 93820003846153');
  });

  it('should mask partial text', () => {
    const masked = maskBarCode.format('237933');

    expect(masked).toBe('23793.3');
  });

  it('should mask invalid text', () => {
    expect(maskBarCode.format('2a3b7c9d3e3f9g1h0i0j0k')).toBe('23793.39100 0');
    expect(maskBarCode.format('')).toBe('');
  });
});

describe('should parse maskBarCode', () => {
  it('should parse masked text', () => {
    const parsed = maskBarCode.parse('237933910040009.462025 71005.540209 7 93820003846153');

    expect(parsed).toBe('23793391004000946202571005540209793820003846153');
  });
});
