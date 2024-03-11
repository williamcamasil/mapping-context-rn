import React from 'react';
import { Text } from 'react-native';

import { waitFor, render, act } from '@testing-library/react-native';

import { AppHolder } from './AppHolder';
import { AppProvider } from './AppProvider';
import { getAdhesionByAccountNumber, updateSelectedAccountDataState } from './utils';

const defaultSelectedAccount = {
  agency: '0001',
  cpfCnpj: '04669723936',
  accountNumber: 4696704,
  power: ['TRANSACIONAR'],
  accountType: 5,
  holderName: 'NOME TITULAR',
  personType: 'F',
  accountName: 'Nome Conta',
  systemCode: 7,
  uniqueIdentification: '123',
};

const defaultUserAccount = {
  selectedAccount: defaultSelectedAccount,
  accountData: {
    NomeUsuario: 'Nome Usuário',
    TipoToken: 'Mapping',
    CPF: '16975032092',
    Celular: '+5511992002000',
    EmailUsuario: 'TESTE@MAPPING.COM.BR',
    UltimoAcessoData: '2023-08-04T19:28:52',
    Adesoes: [
      {
        CodSistema: 7,
        Poder: [
          'TRANSACIONAR',
        ],
        Dados: {
          TipoConta: 5,
          NumeroConta: 4695708,
          NomeTitular: 'Nome Usuário Titular',
          CpfCnpj: '16975032092',
          TipoPessoa: 'F',
          NomeConta: 'Nome Usuário Conta',
          Agencia: '0001',
        },
      },
      {
        CodSistema: 7,
        Poder: [
          'TRANSACIONAR',
        ],
        Dados: {
          TipoConta: 5,
          NumeroConta: 4696704,
          NomeTitular: 'NOME TITULAR',
          CpfCnpj: '04669723936',
          TipoPessoa: 'F',
          NomeConta: 'Nome Conta',
          Agencia: '0001',
        },
      },
    ],
  },
};

const renderEmptyStateApp = async () => {
  const screen = render(
    <AppProvider>
      <Text>Children</Text>
    </AppProvider>,
  );
  await screen.findByText('Children');
};

const renderAppWithState = async () => {
  const screen = render(
    <AppProvider>
      <Text>Children</Text>
    </AppProvider>,
  );
  await screen.findByText('Children');
  const { _setUserAccount } = AppHolder.getState();
  const defaultUserAccountClone = JSON.parse(JSON.stringify(defaultUserAccount));
  act(() => {
    _setUserAccount(defaultUserAccountClone);
  });
  await waitFor(() => {
    expect(AppHolder.getState().userAccount?.selectedAccount?.accountName).toBe('Nome Conta');
  });
};

describe('Context utils', () => {
  describe('updateSelectedAccountDataState', () => {
    it('Should not set data when there is no selectedAccount', async () => {
      await renderEmptyStateApp();
      act(() => {
        updateSelectedAccountDataState({ TipoPessoa: 'F' });
      });
      expect(AppHolder.getState().userAccount?.selectedAccount).toBeUndefined();
    });
    it('Should update the correct account in both selectedAccount and adhesions list', async () => {
      await renderAppWithState();
      act(() => {
        updateSelectedAccountDataState({ NomeConta: 'Novo Nome Conta', NomeTitular: 'Novo Nome Titular' });
      });
      await waitFor(() => {
        expect(AppHolder.getState().userAccount?.selectedAccount).toEqual({
          agency: '0001',
          cpfCnpj: '04669723936',
          accountNumber: 4696704,
          power: ['TRANSACIONAR'],
          accountType: 5,
          holderName: 'Novo Nome Titular',
          personType: 'F',
          accountName: 'Novo Nome Conta',
          systemCode: 7,
          uniqueIdentification: '123',
        });
      });
      expect(AppHolder.getState()?.userAccount?.accountData.Adesoes).toEqual([
        {
          CodSistema: 7,
          Poder: ['TRANSACIONAR'],
          Dados: {
            TipoConta: 5,
            NumeroConta: 4695708,
            NomeTitular: 'Nome Usuário Titular',
            CpfCnpj: '16975032092',
            TipoPessoa: 'F',
            NomeConta: 'Nome Usuário Conta',
            Agencia: '0001',
          },
        },
        {
          CodSistema: 7,
          Poder: ['TRANSACIONAR'],
          Dados: {
            TipoConta: 5,
            NumeroConta: 4696704,
            NomeTitular: 'Novo Nome Titular',
            CpfCnpj: '04669723936',
            TipoPessoa: 'F',
            NomeConta: 'Novo Nome Conta',
            Agencia: '0001',
          },
        },
      ]);
    });
    it('Should update all data in both selectedAccount and adhesions list', async () => {
      await renderAppWithState();
      act(() => {
        updateSelectedAccountDataState({
          TipoConta: 10,
          NumeroConta: 123456,
          NomeTitular: 'Novo Nome Titular',
          CpfCnpj: '12345678910',
          TipoPessoa: 'J',
          NomeConta: 'Novo Nome Conta',
          Agencia: '0002',
        });
      });
      await waitFor(() => {
        expect(AppHolder.getState().userAccount?.selectedAccount).toEqual({
          agency: '0002',
          cpfCnpj: '12345678910',
          accountNumber: 123456,
          power: ['TRANSACIONAR'],
          accountType: 10,
          holderName: 'Novo Nome Titular',
          personType: 'J',
          accountName: 'Novo Nome Conta',
          systemCode: 7,
          uniqueIdentification: '123',
        });
      });
      expect(AppHolder.getState()?.userAccount?.accountData.Adesoes).toEqual([
        {
          CodSistema: 7,
          Poder: ['TRANSACIONAR'],
          Dados: {
            TipoConta: 5,
            NumeroConta: 4695708,
            NomeTitular: 'Nome Usuário Titular',
            CpfCnpj: '16975032092',
            TipoPessoa: 'F',
            NomeConta: 'Nome Usuário Conta',
            Agencia: '0001',
          },
        },
        {
          CodSistema: 7,
          Poder: ['TRANSACIONAR'],
          Dados: {
            TipoConta: 10,
            NumeroConta: 123456,
            NomeTitular: 'Novo Nome Titular',
            CpfCnpj: '12345678910',
            TipoPessoa: 'J',
            NomeConta: 'Novo Nome Conta',
            Agencia: '0002',
          },
        },
      ]);
    });
    it('Should keep the info in both selectedAccount and adhesions list', async () => {
      await renderAppWithState();
      act(() => {
        updateSelectedAccountDataState({});
      });
      await waitFor(() => {
        expect(AppHolder.getState().userAccount?.selectedAccount).toEqual(defaultSelectedAccount);
      });
      expect(AppHolder.getState()?.userAccount?.accountData.Adesoes).toEqual(defaultUserAccount.accountData.Adesoes);
    });
  });
  describe('getAdhesionByAccountNumber', () => {
    it('Should return the second adhesion', async () => {
      await renderAppWithState();
      const adhesion = getAdhesionByAccountNumber(4696704);
      expect(adhesion).toEqual(defaultUserAccount.accountData.Adesoes[1]);
    });
    it('Should return null when no accountNumber is passed', async () => {
      await renderAppWithState();
      const adhesion = getAdhesionByAccountNumber();
      expect(adhesion).toBeNull();
    });
    it('Should return null when there are no adhesions', async () => {
      await renderEmptyStateApp();
      const adhesion = getAdhesionByAccountNumber();
      expect(adhesion).toBeNull();
    });
  });
});
