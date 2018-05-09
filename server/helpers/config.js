const { createConfigLoader } = require('node-buffs');

const ConfigKeys = {
  DB_ENGINE: 'DB_ENGINE',
  DB_HOST: 'DB_HOST',
  DB_PORT: 'DB_PORT',
  DB_LOGGING: 'DB_LOGGING',
  DB_DATABASE: 'DB_DATABASE',
  DB_USERNAME: 'DB_USERNAME',
  DB_PASSWORD: 'DB_PASSWORD',
};

const configLoader = createConfigLoader();

module.exports = {
  ConfigKeys,
  configLoader,
};
