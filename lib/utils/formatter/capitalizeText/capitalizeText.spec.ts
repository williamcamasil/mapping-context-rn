import capitalizeText from './index';

describe('capitalizeText', () => {
  it('Should capitalize texts', () => {
    expect(capitalizeText('PALAVRA')).toBe('Palavra');
    expect(capitalizeText('PALAVRA COMPOSTA')).toBe('Palavra Composta');
    expect(capitalizeText('tEsTe MisTo')).toBe('Teste Misto');
    expect(capitalizeText('palavras lower case')).toBe('Palavras Lower Case');
  });
});
