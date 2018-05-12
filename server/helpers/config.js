import { createConfigLoader } from 'node-buffs';

export const ConfigKeys = {
  DB_ENGINE: 'DB_ENGINE',
  DB_HOST: 'DB_HOST',
  DB_PORT: 'DB_PORT',
  DB_LOGGING: 'DB_LOGGING',
  DB_DATABASE: 'DB_DATABASE',
  DB_USERNAME: 'DB_USERNAME',
  DB_PASSWORD: 'DB_PASSWORD',
};

export const configLoader = createConfigLoader();
