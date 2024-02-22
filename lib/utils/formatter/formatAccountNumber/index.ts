const formatAccountNumber = (accountNumber: string) => {
  const stripped = accountNumber.replace(/\D/g, '');
  return stripped.replace(/^(\d+)(\d)$/, '$1-$2');
};

export default formatAccountNumber;
