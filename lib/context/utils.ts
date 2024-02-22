import { SummaryAccountModelType } from './AppContext';
import { AppHolder } from './AppHolder';

export const updateSelectedAccountDataState = async (newState: Partial<SummaryAccountModelType>) => {
  const { userAccount, _setUserAccount } = AppHolder.getState();
  if (!userAccount?.selectedAccount) return;

  const accountAdhesionIndex = userAccount.accountData.Adesoes.findIndex(
    item => item.Dados.NumeroConta === userAccount.selectedAccount?.accountNumber,
  );

  _setUserAccount(previous => {
    const newAdhesions = previous!.accountData.Adesoes;
    newAdhesions[accountAdhesionIndex] = {
      ...newAdhesions[accountAdhesionIndex],
      Dados: {
        ...newAdhesions[accountAdhesionIndex].Dados,
        ...newState,
      },
    };

    return {
      ...previous,
      selectedAccount: {
        ...previous!.selectedAccount!,
        agency: newState.Agencia ?? previous!.selectedAccount!.agency,
        cpfCnpj: newState.CpfCnpj ?? previous!.selectedAccount!.cpfCnpj,
        accountNumber: newState.NumeroConta ?? previous!.selectedAccount!.accountNumber,
        accountType: newState.TipoConta ?? previous!.selectedAccount!.accountType,
        holderName: newState.NomeTitular ?? previous!.selectedAccount!.holderName,
        personType: newState.TipoPessoa ?? previous!.selectedAccount!.personType,
        accountName: newState.NomeConta ?? previous!.selectedAccount!.accountName,
      },
      accountData: {
        ...previous!.accountData,
        Adesoes: newAdhesions,
      },
    };
  });
};

export const getAdhesionByAccountNumber = (accountNumber?: number) => {
  const { userAccount } = AppHolder.getState();
  if (!accountNumber || !userAccount?.accountData.Adesoes) {
    return null;
  }
  return userAccount.accountData.Adesoes.find(item => item.Dados.NumeroConta === accountNumber);
};
