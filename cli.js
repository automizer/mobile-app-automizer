#!/usr/bin/env node
const { greetings, hasConfig, hasParam } = require('./utils/utils');

const cli = () => {
  if (!hasConfig() || hasParam('--install')) {
    require('./installer')();
  } else {
    require('./automizer')();
  }
};

greetings();
cli();
