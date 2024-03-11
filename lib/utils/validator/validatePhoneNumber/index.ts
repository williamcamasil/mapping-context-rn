function isValidPhoneNumber(phone: string) {
  const phoneNumber = phone.replace(/\D/g, '');
  return phoneNumber[2] === '9' && phoneNumber.length === 11;
}

function validatePhoneNumber(value?: string | null) {
  if (!value) {
    return 'Campo obrigatório';
  }

  if (!isValidPhoneNumber(value)) {
    return 'Informe um número válido';
  }
  return undefined;
}

export default validatePhoneNumber;
