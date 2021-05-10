const { run, env } = require('../utils/utils');
const fs = require('fs');
const ora = require('ora');

const build = async (config) => {
  const spinner = ora('Android Building...').start();
  const newEnv = env === 'production' ? 'Release' : 'Staging';
  const root = config.android.path.root;

  run(`cd ${root} && ./gradlew clean && ./gradlew assemble${newEnv} && cd ..`);
  spinner.succeed('Android Building Finished!');
};

const upload = async (config) => {
  const spinner = ora('Android Uploading...').start();
  const path = config.android.path;

  if (config.android.upload.method === 'cdn') {
    const gradleFile = fs.readFileSync(path.gradle).toString();
    const buildNumber = gradleFile.match(/versionCode (\d+)/)[1];

    await config.upload.android.uploadApk(path.apk[env], env, buildNumber);
  } else {
    run(`cd ${path.root} && ./gradlew publishReleaseApk && cd ..`);
  }

  spinner.succeed('Android Uploading Finished!');
};

module.exports = { build, upload };
