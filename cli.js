#!/usr/bin/env node
const { hasConfig, hasParam } = require('./utils/utils');

const cli = () => {
  if (!hasConfig() || hasParam('--install')) {
    require('./src/installer')();
  } else if (hasParam('--clean')) {
    require('./src/cleaner')();
  } else {
    require('./src/automizer')();
  }
};

cli();
