const { hasParam } = require('../utils/utils');
const { execSync } = require('child_process');

const cleaner = async () => {
  let param = hasParam('--ios') ? ' --ios' : '';
  param = hasParam('--android') ? ' --android' : param;

  execSync(`npx mobile-app-cleaner${param}`, { stdio: 'inherit' });
};

module.exports = cleaner;
