function isValidEmail(email: string) {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return regex.test(email);
}

function validateEmail(value?: string | null) {
  if (!value) {
    return 'Campo obrigatório';
  }

  if (!isValidEmail(value)) {
    return 'Informe um e-mail válido';
  }
  return undefined;
}

export default validateEmail;
