import getLastName from '.';

describe('GetLastName', () => {
  it('Should take the first name', () => {
    const text = getLastName('Fabrício Almeida');

    expect(text).toBe('Almeida');
  });
});
