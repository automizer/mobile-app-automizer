const { Select, Confirm, Input } = require('enquirer');
const { execSync } = require('child_process');
const fs = require('fs');

const ask = (message, choices) => new Select({ message, choices }).run();
const askConfirm = (name, message) => new Confirm({ name, message }).run();
const askInput = (name, message) => new Input({ name, message }).run();
const log = (text) => console.log(`\n\x1b[36m${text}\x1b[0m\n`);
const hasConfig = () => fs.existsSync(`${process.cwd()}/.ma-automizer.js`);
const hasParam = (param) => process.argv.includes(param);
const greetings = () => {
  console.log(`\x1b[36m
    mobile app   __
    ____ ___  __/ /_____  ____ ___  ( )___  ___  _____
   / __ \`/ / / / __/ __ \\/ __ \`__ \\/ /_  / / _ \\/ ___/
  / /_/ / /_/ / /_/ /_/ / / / / / / / / /_/  __/ /
  \\__,_/\\__,_/\\__/\\____/_/ /_/ /_/_/ /___/\\___/_/\n\n\x1b[0m`);
};
const run = (command) => {
  execSync(command, { stdio: hasParam('--verbose') ? 'inherit' : 'ignore' });
};
const env = hasParam('--stage') ? 'stage' : 'production';

module.exports = {
  ask,
  askConfirm,
  askInput,
  log,
  hasConfig,
  hasParam,
  greetings,
  run,
  env,
};
