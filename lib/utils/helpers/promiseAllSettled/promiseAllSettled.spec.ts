import promiseAllSettled from '.';

describe('promiseAllSettled', () => {
  it('should return all results as PromiseAllSettledResult', async () => {
    const firstResult = { value: true };
    const firstGuard = Promise.resolve(firstResult);
    const secondGuard = Promise.reject(new Error('error'));
    const thirdGuard = Promise.resolve({ value: false });
    const result = await promiseAllSettled([firstGuard, secondGuard, thirdGuard]);
    expect(result).toEqual([
      {
        status: 'fulfilled',
        value: firstResult,
      },
      {
        status: 'rejected',
        value: new Error('error'),
      },
      {
        status: 'fulfilled',
        value: { value: false },
      },
    ]);
  });
});
