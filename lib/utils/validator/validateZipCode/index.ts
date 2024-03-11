function validateZipCode(value?: string | null) {
  if (!value) {
    return 'Campo obrigatório';
  }
  if (!(/\d{5}-\d{3}/g).test(value)) {
    return 'Informe um CEP válido';
  }
  return undefined;
}

export default validateZipCode;
