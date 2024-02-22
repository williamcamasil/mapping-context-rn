import React, { Dispatch, SetStateAction } from 'react';

export type LoggedUserType = {
  documentNumber?: string;
  activeName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  birthdayDate?: string;
  pictureUrl?: string;
};

export type RoleType = 'FINANCIAMENTO' | 'CONTA_CORRENTE' | 'CARTAO_CREDITO';

export type AuthTokenVariantType = 'bank' | 'loan';

export type AuthType = {
  accessToken: string;
  refreshToken: string;
  ibAccessToken?: string;
  variant: AuthTokenVariantType;
};

export type SelectedAccountType = {
  agency: string;
  cpfCnpj: string;
  accountNumber: number;
  power: string[];
  accountType: number;
  holderName: string;
  personType: string;
  accountName: string;
  systemCode: number;
  uniqueIdentification?: string;
};

export type SummaryAccountModelType = {
  TipoConta: number;
  NumeroConta: number;
  NomeTitular: string;
  CpfCnpj: string;
  TipoPessoa: string;
  NomeConta: string;
  Agencia: string;
};

export type AccountAdhesionModelType = {
  CodSistema: number;
  IdentificacaoUnica?: string;
  Poder: string[];
  Dados: SummaryAccountModelType;
};

export type CredentialUserType = {
  NomeUsuario: string;
  TipoToken: string;
  CPF: string;
  Celular: string;
  EmailUsuario: string;
  UltimoAcessoData: string;
  Adesoes: AccountAdhesionModelType[];
};

export type UserAccountType = {
  selectedAccount?: SelectedAccountType;
  accountData: CredentialUserType;
};

export type LegacyCentralPanelDataType = {
  legacyGoBackRoute?: string;
};

export type AppContextStateType = {
  auth?: AuthType;
  loggedUser?: LoggedUserType;
  // TODO: remover apos migração do painel central junto as demais validações e testes
  legacyCentralPanelData?: LegacyCentralPanelDataType;
  roles: RoleType[];
  userAccount?: UserAccountType;
  logout: () => void;
  messagingDeviceToken?: string;
  /**
   * Funções expostas com prefixos "_" são consideradas privadas.
   */
  _setAuth: Dispatch<SetStateAction<AuthType | undefined>>;
  _setLoggedUser: Dispatch<SetStateAction<LoggedUserType | undefined>>;
  // TODO: remover apos migração do painel central junto as demais validações e testes
  _setLegacyCentralPanelData?: Dispatch<SetStateAction<LegacyCentralPanelDataType | undefined>>;
  _setRoles: Dispatch<SetStateAction<RoleType[]>>;
  _setUserAccount: Dispatch<SetStateAction<UserAccountType | undefined>>;
  _setMessagingDeviceToken: Dispatch<SetStateAction<string | undefined>>;
};

export const AppContext = React.createContext<AppContextStateType>(
  {} as AppContextStateType,
);
