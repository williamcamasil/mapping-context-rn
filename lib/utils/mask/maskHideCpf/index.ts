const format = (value: string) => {
  if (!value) return value;

  if (value.replace(/[a-zA-Z]/g, '') === '') return '';

  return value.replace(/\D/g, '').replace(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/, '***.$2.$3-**');
};

export const maskHideCpf = { format };

