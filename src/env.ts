import { createEnvironment } from '../lib';

const envValues = {
  dogApiBaseUrl: 'https://dog.ceo/api',
  sampleVersion: 10,
};

const ENV = createEnvironment({
  development: envValues,
  homologation: envValues,
  production: envValues,
});

export default ENV;
