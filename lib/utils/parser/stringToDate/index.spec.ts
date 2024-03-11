import stringToDate from '.';

describe('stringToDate', () => {
  it('Parse string to date with custom format', () => {
    const date = stringToDate('01/08/2022', 'dd/MM/yyyy');

    const nativeDate = new Date('2022-08-01');

    expect(date.getUTCDate()).toEqual(nativeDate.getUTCDate());
    expect(date.getUTCMonth()).toEqual(nativeDate.getUTCMonth());
    expect(date.getUTCFullYear()).toEqual(nativeDate.getUTCFullYear());
  });

  it('Parse string to date with ISO', () => {
    const date = stringToDate('2022-08-01');

    const nativeDate = new Date('2022-08-01');

    expect(date.getUTCDate()).toEqual(nativeDate.getUTCDate());
    expect(date.getUTCMonth()).toEqual(nativeDate.getUTCMonth());
    expect(date.getUTCFullYear()).toEqual(nativeDate.getUTCFullYear());
  });
});
