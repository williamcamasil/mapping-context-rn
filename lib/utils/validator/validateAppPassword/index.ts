const validateAppPassword = (password?: string | null) => {
  const stripped = (password ?? '').replace(/\D/g, '');

  if (!stripped) {
    return 'Informe a senha de acesso';
  }

  if (stripped.length !== 6) return 'Senha deve conter no mínimo 6 digitos.';

  return undefined;
};

export default validateAppPassword;
