const { execSync } = require('child_process');
const { run, env } = require('../utils/utils');
const tmpManifest = require('../templates/manifest');
const fs = require('fs');
const ora = require('ora');

const build = async (config) => {
  const spinner = ora('iOS Building...').start();
  const path = config.ios.path;
  const newEnv = env === 'production' ? 'Release' : 'Stage';
  const workspace = `-workspace ${path.workspace}`;
  const scheme = `-scheme ${config.ios.build.scheme[env]}`;
  const envType = `-configuration ${newEnv}`;
  const archivePath = `-archivePath ${path.archive}`;
  const exportOpts = `-exportOptionsPlist ${path.exportOptionsPlist}`;
  const exportPath = `-exportPath ${path.export}`;

  if (config.ios.build.firebase) {
    const fbPath = `${path.firebase}/GoogleService-Info`;
    const fbSource = `${fbPath}-${env}.plist`;
    const fbTarget = `${fbPath}.plist`;

    run(`cp ${fbSource} ${fbTarget}`);
  }

  run(`xcodebuild archive ${workspace} ${scheme} ${envType} ${archivePath}`);
  run(`xcodebuild -exportArchive ${exportOpts} ${exportPath} ${archivePath}`);

  spinner.succeed('iOS Building Finished!');
};

const upload = async (config) => {
  const spinner = ora('iOS Uploading...').start();
  const path = config.ios.path;
  const iosUpload = config.ios.upload;

  if (iosUpload.method === 'cdn') {
    const cdn = iosUpload.cdn;
    const command = '/usr/libexec/PlistBuddy -c "Print CFBundleVersion"';
    const version = execSync(`${command} ${path.infoPlist}`);
    const buildNumber = version.toString().replace('\n', '');
    const downloadLinkPrefix = 'itms-services://?action=download-manifest&url=';
    const ipaUrl = await cdn.uploadIpa(path.ipa[env], env, buildNumber);
    const manifestFile = tmpManifest
      .replace('{{IPA_URL}}', ipaUrl)
      .replace('{{BUILD_NUMBER}}', buildNumber)
      .replace('{{TITLE}}', cdn.title[env])
      .replace('{{BUNDLE_IDENTIFIER}}', iosUpload.bundleIdentifier[env]);

    fs.writeFileSync(path.manifestPlist, manifestFile);

    await cdn.uploadManifest(
      path.manifestPlist,
      env,
      buildNumber,
      downloadLinkPrefix,
    );
  } else {
    const type = '--type ios';
    const file = `--file ${path.ipa[env]}`;
    const username = `--username ${iosUpload.username}`;
    const password = `--password ${iosUpload.password}`;

    run(`xcrun altool --upload-app ${type} ${file} ${username} ${password}`);
  }

  spinner.succeed('iOS Uploading Finished!');
};

module.exports = { build, upload };
