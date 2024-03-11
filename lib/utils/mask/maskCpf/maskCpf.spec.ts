import { maskCpf } from '.';

describe('maskCpf format', () => {
  it('unmasked', () => {
    const masked = maskCpf.format('38340691830');

    expect(masked).toBe('383.406.918-30');
  });

  it('masked', () => {
    const masked = maskCpf.format('383.406.918-30');

    expect(masked).toBe('383.406.918-30');
  });

  it('partial', () => {
    expect(maskCpf.format('3834')).toBe('383.4');
    expect(maskCpf.format('3834069')).toBe('383.406.9');
    expect(maskCpf.format('3834069183')).toBe('383.406.918-3');
  });

  it('null/undefined', () => {
    expect(maskCpf.format(null)).toBe(null);
    expect(maskCpf.format(undefined)).toBe(undefined);
  });

  it('invalid', () => {
    expect(maskCpf.format('3a8b3c4d0e6f9g1h8i3j0k')).toBe('383.406.918-30');
    expect(maskCpf.format('asdfasdfasdfasdf')).toBe('');
    expect(maskCpf.format('')).toBe('');
  });
});

describe('maskCpf parse', () => {
  it('masked', () => {
    const parsed = maskCpf.parse('383.406.918-30');

    expect(parsed).toBe('38340691830');
  });

  it('partial', () => {
    expect(maskCpf.parse('383.4')).toBe('3834');
    expect(maskCpf.parse('383.406.9')).toBe('3834069');
    expect(maskCpf.parse('383.406.918-3')).toBe('3834069183');
  });

  it('null/undefined', () => {
    expect(maskCpf.parse(null)).toBe(null);
    expect(maskCpf.parse(undefined)).toBe(undefined);
  });
});
