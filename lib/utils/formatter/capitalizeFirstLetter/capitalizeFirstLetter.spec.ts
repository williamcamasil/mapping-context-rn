import capitalizeFirstLetter from '.';

describe('Format to capitalizeFirstLetter', () => {
  it('should format to captalize first letter to uppercase', () => {
    const text = capitalizeFirstLetter('EBAY');
    const description = capitalizeFirstLetter('AMAZON MUSIC');
    const textEmpty = capitalizeFirstLetter('');

    expect(text).toStrictEqual('Ebay');
    expect(description).toStrictEqual('Amazon music');
    expect(textEmpty).toStrictEqual('');
  });
});
