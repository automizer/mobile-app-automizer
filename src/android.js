const { run, env } = require('../utils/utils');
const fs = require('fs');
const ora = require('ora');

const version = async (config, arguments) => {
  if (env !== 'production') return;

  const { version } = require(`${process.cwd()}/package.json`);

  const spinner = ora('Android Versioning...').start();
  const gradleFile = fs.readFileSync(config.android.path.gradle, 'utf8');
  const gradle = gradleFile
    .replace(/versionName (["'])(.*)["']/, `versionName $1${version}$1`)
    .replace(/versionCode (\d+)/, (match, p1) => {
      return `versionCode ${arguments.androidVersion ?? parseInt(p1, 10) + 1}`;
    });

  fs.writeFileSync(config.android.path.gradle, gradle);

  spinner.succeed('Android Versioning Finished!');
};

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

    await config.android.upload.cdn.uploadApk(path.apk[env], env, buildNumber);
  } else {
    run(`cd ${path.root} && ./gradlew publishReleaseApk && cd ..`);
  }

  spinner.succeed('Android Uploading Finished!');
};

module.exports = { version, build, upload };
