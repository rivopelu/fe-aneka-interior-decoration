import packageJson from '../../package.json';

export const ENV = {
  BASE_URL: import.meta.env.VITE_APP_BASE_URL,
  NODE_ENV: import.meta.env.VITE_APP_NODE_ENV,
  VERSION: packageJson.version,
};
