export type EnvironmentKeyType = 'development' | 'homologation' | 'production';

export type EnvironmentConfigType<CustomEnv> = Record<EnvironmentKeyType, CustomEnv>;

export type DefaultValuesType = {
  environment: EnvironmentKeyType;
};

const defaultConfig: EnvironmentConfigType<DefaultValuesType> = {
  // adicionar global envs values aqui
  development: {
    environment: 'development',
  },
  homologation: {
    environment: 'homologation',
  },
  production: {
    environment: 'production',
  },
};

export default defaultConfig;
