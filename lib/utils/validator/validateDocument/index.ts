import { validateCnpj } from '../validateCnpj';
import { validateCpf } from '../validateCpf';

const validateDocument = (value?: string | null) => {
  if (!value) return 'Campo obrigatório';

  if (value.length <= 14) return validateCpf(value);

  return validateCnpj(value);
};

export default validateDocument;
