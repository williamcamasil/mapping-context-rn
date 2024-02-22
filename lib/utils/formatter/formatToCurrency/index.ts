const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

function formatToCurrency(number: number) {
  return formatter.format(number);
}

export default formatToCurrency;
