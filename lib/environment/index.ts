import { EnvironmentConfigType } from './defaultConfig';
import EnvironmentController from './EnvironmentController';

export { default as EnvironmentController } from './EnvironmentController';
export type { EnvironmentConfigType, EnvironmentKeyType } from './defaultConfig';

export function createEnvironment<CustomEnv>(
  config: EnvironmentConfigType<Full<CustomEnv>>,
): EnvironmentController<Full<CustomEnv>> {
  return new EnvironmentController<Full<CustomEnv>>(config);
}
