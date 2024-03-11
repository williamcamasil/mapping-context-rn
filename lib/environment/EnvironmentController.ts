import DeviceInfo from 'react-native-device-info';

import defaultConfig, { DefaultValuesType, EnvironmentConfigType, EnvironmentKeyType } from './defaultConfig';

function getCurrent(): EnvironmentKeyType {
  const bundleId = DeviceInfo.getBundleId();
  if (bundleId.endsWith('.dev')) return 'development';
  if (bundleId.endsWith('.hmg')) return 'homologation';
  return 'production';
}

class EnvironmentController<CustomEnv> {

  private config: EnvironmentConfigType<CustomEnv>;

  private values: CustomEnv & DefaultValuesType;

  private current: EnvironmentKeyType;

  constructor(config: EnvironmentConfigType<CustomEnv>) {
    this.config = config;
    this.current = getCurrent();

    const defaultValues = defaultConfig[this.current];
    const customValues = config[this.current];

    this.values = {
      ...defaultValues,
      ...customValues,
    };
  }

  public getCurrent() {
    return this.current;
  }

  public getValue<KeyType extends keyof (CustomEnv & DefaultValuesType)>(key: KeyType) {
    return this.values[key];
  }

  public getValues() {
    return this.values;
  }

  public getConfig() {
    return this.config;
  }

}

export default EnvironmentController;
