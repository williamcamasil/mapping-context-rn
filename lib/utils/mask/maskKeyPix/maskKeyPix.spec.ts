import { maskKeyPix } from '.';

describe('should format maskKeyPix', () => {
  it('should mask unmasked text', () => {
    const masked = maskKeyPix.format('j4750b21ed0a4489b9a6566848fcb811');

    expect(masked).toBe('j4750b21-ed0a-4489-b9a6-566848fcb811');
  });

  it('should mask partial text', () => {
    const masked = maskKeyPix.format('j4750b21ed0a');

    expect(masked).toBe('j4750b21-ed0a');
  });

  it('should mask invalid text', () => {
    expect(maskKeyPix.format('')).toBe('');
  });
});

describe('should parse maskKeyPix', () => {
  it('should parse masked text', () => {
    const parsed = maskKeyPix.parse('j4750b21-ed0a-4489-b9a6-566848fcb811');

    expect(parsed).toBe('j4750b21ed0a4489b9a6566848fcb811');
  });
});
