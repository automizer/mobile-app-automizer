#!/usr/bin/env node
const { hasConfig, hasParam } = require('./utils/utils');
const commandLineArgs = require('command-line-args');

const args = [
  { name: 'packageVersion' },
  { name: 'iosVersion' },
  { name: 'androidVersion' },
  { name: 'step' },
]

const options = {
  partial: true
}

const arguments = commandLineArgs(args, options);

const cli = () => {
  if (!hasConfig() || hasParam('--install')) {
    require('./src/installer')();
  } else if (hasParam('--clean')) {
    require('./src/cleaner')();
  } else {
    require('./src/automizer')(arguments);
  }
};

cli();
