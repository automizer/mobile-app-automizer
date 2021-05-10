#!/usr/bin/env node
const { greetings, hasConfig, hasParam } = require('./utils/utils');

const cli = () => {
  if (!hasConfig() || hasParam('--install')) {
    require('./src/installer')();
  } else {
    require('./src/automizer')();
  }
};

greetings();
cli();
