import { maskHideCpf } from '.';

describe('maskHideCpf format', () => {
  it('Should validate when using the unmasked value', () => {
    const masked = maskHideCpf.format('38340691830');

    expect(masked).toBe('***.406.918-**');
  });

  it('Should validate when using the masked value', () => {
    const masked = maskHideCpf.format('383.406.918-30');

    expect(masked).toBe('***.406.918-**');
  });

  it('Should validate when using the partial value', () => {
    expect(maskHideCpf.format('3834')).toBe('***.4.-**');
    expect(maskHideCpf.format('3834069')).toBe('***.406.9-**');
    expect(maskHideCpf.format('3834069183')).toBe('***.406.918-**');
  });

  it('Should validate when using the invalid value', () => {
    expect(maskHideCpf.format('3a8b3c4d0e6f9g1h8i3j0k')).toBe('***.406.918-**');
    expect(maskHideCpf.format('asdfasdfasdfasdf')).toBe('');
    expect(maskHideCpf.format('')).toBe('');
  });
});
