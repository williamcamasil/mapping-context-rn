import { createEnvironment } from './environment';

const ENV = createEnvironment({
  development: {
    otpBaseUrl: 'https://192.162.5.22:8000',
  },
  homologation: {
    otpBaseUrl: 'https://192.162.5.22:8000',
  },
  production: {
    otpBaseUrl: 'https://192.162.5.22:8000',
  },
});

export default ENV;
