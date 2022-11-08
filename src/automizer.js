const version = require('./version');
const ios = require('./ios');
const android = require('./android');
const config = require(`${process.cwd()}/.ma-automizer`);
const { greetings } = require('../utils/utils');

const automizer = async (arguments) => {
  greetings();
  const step = arguments.step;

  if (step === 'version') {
    await version.update(arguments);
    await ios.version(config, arguments);
    await android.version(config, arguments);
    return;
  }

  if (step === 'build') {
    await ios.build(config);
    await android.build(config);
    return;
  }

  if (step === 'upload') {
    await ios.upload(config);
    await android.upload(config);
    return;
  }

  (config.ios.version || config.android.version) && await version.update(arguments);

  config.ios.version && await ios.version(config);
  config.android.version && await android.version(config);

  config.ios.build.enabled && await ios.build(config);
  config.android.build.enabled && await android.build(config);

  config.ios.upload.enabled && await ios.upload(config);
  config.android.upload.enabled && await android.upload(config);
};

module.exports = automizer;
