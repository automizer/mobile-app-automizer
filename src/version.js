const { run, env } = require('../utils/utils');

const update = async (arguments) => {
  if (env !== 'production') return;
  let targetVersion = hasParam('--minor') ? 'minor' : 'patch';
  targetVersion = hasParam('--major') ? 'major' : targetVersion;
  targetVersion = arguments.packageVersion ?? targetVersion;

  run(`npm version ${targetVersion} --no-git-tag-version`);
};

module.exports = { update };
