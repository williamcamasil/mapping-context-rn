export type PromiseAllSettledStatus = 'fulfilled' | 'rejected';
export type PromiseAllSettledResult<Value> = {
  status: PromiseAllSettledStatus;
  value: Value;
};

const promiseAllSettled = <Value>(promises: Promise<Value>[]): Promise<PromiseAllSettledResult<Value>[]> => Promise.all(
  promises.map(promise => promise
    .then(value => ({
      status: 'fulfilled' as PromiseAllSettledStatus,
      value,
    }))
    .catch(value => ({
      status: 'rejected' as PromiseAllSettledStatus,
      value,
    }))),
);

export default promiseAllSettled;
