import getFirstName from '.';

describe('GetFirstName', () => {
  it('Should take the first name', () => {
    const text = getFirstName('Fabrício Almeida');

    expect(text).toBe('Fabrício');
  });
});
