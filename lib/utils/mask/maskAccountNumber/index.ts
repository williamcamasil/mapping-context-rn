const extractNumbersFromString = (value: string) => {
  const valueNumbers = value.replace(/[^\d]/g, '');
  if (!valueNumbers) return '';
  return valueNumbers;
};

const format = (value: string = '') => {
  const account = extractNumbersFromString(value);
  return account.replace(/^(\d{1,13})(\d)/, '$1-$2');
};

const parse = (value: string = '') => extractNumbersFromString(value);

export const maskAccountNumber = { format, parse };

