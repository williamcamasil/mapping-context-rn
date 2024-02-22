import dateToString from '.';

describe('Date to string format', () => {
  it('Format date to string', () => {
    const text = dateToString(new Date('2022/08/01'), 'MMMM');

    expect(text).toBe('agosto');
  });
});
