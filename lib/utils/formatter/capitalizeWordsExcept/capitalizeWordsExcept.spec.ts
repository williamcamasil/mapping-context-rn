import capitalizeWordsExcept from '.';

describe('capitalizeWordsExcept', () => {
  it('should capitalize included words only', () => {
    expect(capitalizeWordsExcept('TESTE MAPPING', ['JS'])).toBe('Teste Mapping');
    expect(capitalizeWordsExcept('simple sentence with lowercase words', ['with', 'sentence'])).toBe('Simple sentence with Lowercase Words');
  });
});
