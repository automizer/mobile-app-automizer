const { ask, askConfirm, askInput, log } = require('../utils/utils');
const tmpConfig = require('../templates/config');
const tmpExportOptions = require('../templates/exportOptions');
const fs = require('fs');
const { greetings } = require('../utils/utils');

const installer = async () => {
  const ios = {};
  const android = {};

  greetings();

  ios.build = await askConfirm('1', 'Do you want to build iOS App');

  if (ios.build) {
    ios.scheme = await askInput('2', 'What is your iOS Production Scheme');
    ios.schemeStage = await askInput('3', 'What is your iOS Stage Scheme');
    ios.firebase = await askConfirm('4', 'Are you using Firebase');
    ios.upload = await askConfirm('5', 'Do you want to upload iOS App');

    if (ios.upload) {
      ios.method = await ask('To where', ['app-store', 'cdn']);
      ios.username = await askInput('6', 'What is your Apple Username');
      ios.password = await askInput('7', 'What is your Apple app-spesific Password');
      ios.teamId = await askInput('8', 'What is your Apple teamID');
      ios.bundleId = await askInput('9', 'What is your Production Bundle Identifier');
      ios.bundleIdStage = await askInput('10', 'What is your Stage Bundle Identifier');

      const exportOptionsFile = tmpExportOptions
        .replace('{{METHOD}}', ios.method === 'cdn' ? 'enterprise' : 'app-store')
        .replace('{{TEAM_ID}}', ios.teamId)
        .replace('{{PRODUCTION_SCHEME}}', ios.scheme)
        .replace('{{STAGE_SCHEME}}', ios.schemeStage)
        .replace('{{PRODUCTION_BUNDLE_IDENTIFER}}', ios.bundleId)
        .replace('{{STAGE_BUNDLE_IDENTIFER}}', ios.bundleIdStage);

      fs.writeFileSync('ios/exportOptions.plist', exportOptionsFile);
    }
  }

  android.build = await askConfirm('11', 'Do you want to build Android App');

  if (android.build) {
    android.upload = await askConfirm('12', 'Do you want to upload your apps');
    android.method = await ask('To where', ['play-store', 'cdn']);
  }

  const version = await askConfirm('13', 'Do you want versioning');

  const configFile = tmpConfig
    .replace('{{IOS_BUILD}}', ios.build)
    .replace(/{{PRODUCTION_SCHEME}}/g, ios.scheme || '*')
    .replace(/{{STAGE_SCHEME}}/g, ios.schemeStage || '*')
    .replace('{{FIREBASE}}', ios.firebase || false)
    .replace('{{IOS_UPLOAD}}', ios.upload ||  false)
    .replace('{{IOS_METHOD}}', ios.method || '')
    .replace('{{IOS_USERNAME}}', ios.username || '')
    .replace('{{IOS_PASSWORD}}', ios.password || '')
    .replace('{{PRODUCTION_BUNDLE_IDENTIFER}}', ios.bundleId || '*')
    .replace('{{STAGE_BUNDLE_IDENTIFER}}', ios.bundleIdStage || '*')
    .replace('{{ANDROID_BUILD}}', android.build)
    .replace('{{ANDROID_UPLOAD}}', android.upload || false)
    .replace('{{ANDROID_METHOD}}', android.method || '*')
    .replace('{{IOS_VERSION}}', version && ios.build)
    .replace('{{ANDROID_VERSION}}', version && android.build);

  fs.writeFileSync('.ma-automizer.js', configFile);

  log('Installation Completed!');
};

module.exports = installer;
