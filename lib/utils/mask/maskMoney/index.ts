const insertRadix = (value: string) => {
  const charactersList = value.split('');
  const precision = 2;
  const deleteCount = 0;
  let itemsToReplace;
  switch (charactersList.length) {
    case 1:
      itemsToReplace = ['0', '.', '0'];
      break;
    case 2:
      itemsToReplace = ['0', '.'];
      break;
    default:
      itemsToReplace = ['.'];
  }
  charactersList.splice(-precision, deleteCount, ...itemsToReplace);
  return charactersList.join('');
};

const removeLeadingZeroes = (valueCharactersList: string) => valueCharactersList.replace(/^0+\B/, '');

const numbersStringToFloatString = (value: string) => {
  const valueNumbers = value.replace(/[^\d]/g, '');
  if (!valueNumbers) return '';
  const splitListWithRadix = insertRadix(valueNumbers);
  return removeLeadingZeroes(splitListWithRadix);
};

const removeNonBreakingSpace = (value: string) => value.replace('\xa0', ' ');

const format = (value: string = '') => {
  const floatString = numbersStringToFloatString(value);
  if (!floatString) return value;

  const numberToFormat = parseFloat(floatString);
  const currencyString = new Intl.NumberFormat(
    'pt-BR',
    { style: 'currency', currency: 'BRL', maximumFractionDigits: 2 },
  ).format(numberToFormat);
  return removeNonBreakingSpace(currencyString);
};

const parse = (value: string = '') => numbersStringToFloatString(value);

export const maskMoney = { format, parse };
