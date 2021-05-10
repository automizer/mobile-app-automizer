const { hasParam, run, env } = require('../utils/utils');
const ora = require('ora');
const fs = require('fs');

const update = async (config) => {
  if (env === 'production') {
    if (config.ios.version || config.android.version) {
      let targetVersion = hasParam('--minor') ? 'minor' : 'patch';
      targetVersion = hasParam('--major') ? 'major' : targetVersion;

      run(`npm version ${targetVersion} --no-git-tag-version`);
    }

    const { version } = require(`${process.cwd()}/package.json`);

    if (config.ios.version) {
      const iosSpinner = ora('iOS Versioning...').start();
      const root = config.ios.path.root;

      run(`cd ${root} && agvtool new-marketing-version ${version} && cd ..`);
      run(`cd ${root} && agvtool next-version -all && cd ..`);

      iosSpinner.succeed('iOS Versioning Finished!');
    }

    if (config.android.version) {
      const androidSpinner = ora('Android Versioning...').start();
      const gradleFile = fs.readFileSync(config.android.path.gradle, "utf8");
      const gradle = gradleFile
        .replace(/versionName (["'])(.*)["']/, `versionName $1${version}$1`)
        .replace(/versionCode (\d+)/, (match, p1) => {
          return `versionCode ${(parseInt(p1, 10) + 1)}`;
        });

      fs.writeFileSync(config.android.path.gradle, gradle);

      androidSpinner.succeed('Android Versioning Finished!');
    }
  }
};

module.exports = { update };
